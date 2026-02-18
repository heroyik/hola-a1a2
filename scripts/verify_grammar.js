const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '../output');
const REPORT_PATH = path.join(__dirname, '../output/verification_report.md');

// MANDATORY_IRREGULARS from REQ-5.3
const MANDATORY_IRREGULARS = {
    'Presente': ['ser', 'estar', 'ir', 'tener', 'saber', 'poder'],
    'Gerundio': ['ir', 'leer', 'repetir', 'decir', 'venir', 'dormir', 'morir'],
    'Indefinido': ['estar', 'tener', 'poder', 'poner', 'querer', 'saber', 'venir', 'decir', 'dar', 'hacer', 'haber', 'ser', 'ir'],
    'Imperfecto': ['ser', 'ir', 'ver'],
    'Futuro': ['decir', 'hacer', 'poder', 'querer', 'saber', 'salir', 'tener', 'venir', 'poner', 'haber'],
    'Participio': ['hacer', 'poner', 'escribir', 'decir', 'volver', 'abrir', 'leer', 'romper'],
    'Imperativo': ['dar', 'ser', 'ver', 'ir', 'decir', 'hacer', 'poner', 'salir', 'tener', 'venir']
};

// MANDATORY_SECTIONS from REQ-1.1
const MANDATORY_SECTIONS = [
    { id: 'SEC-01', pattern: /^1\.\s+Opener/ },
    { id: 'SEC-02', pattern: /^2\.\s+Vocabulario Esencial/ },
    { id: 'SEC-03', pattern: /^3\.\s+Expresiones\s+Útiles/ },
    { id: 'SEC-04', pattern: /^4\.\s+Gramática Esencial/ },
    { id: 'SEC-05', pattern: /^5\.\s+Cultura Viva/ },
    { id: 'SEC-06', pattern: /^6\.\s+Práctica/ },
    { id: 'SEC-07', pattern: /^7\.\s+Lectura\s+📖/ },
    { id: 'SEC-08', pattern: /^8\.\s+Diálogo/ },
    { id: 'SEC-09', pattern: /^9\.\s+Repaso/ },
    { id: 'SEC-10', pattern: /^10\.\s+Cierre/ },
    { id: 'SEC-11', pattern: /^11\.\s+Soluciones/ }
];

async function verifyChapter(page, filePath) {
    const fileName = path.basename(filePath);
    const results = {
        file: fileName,
        passed: [],
        failed: [],
        warnings: [],
        goldStandard: true
    };

    function addPass(id, msg) { results.passed.push({ id, msg }); }
    function addFail(id, msg) { results.failed.push({ id, msg }); results.goldStandard = false; }
    function addWarn(id, msg) { results.warnings.push({ id, msg }); }

    await page.goto(`file://${filePath}`);

    // --- 1. Structural Integrity ---

    // TC-1.1.1 & TC-1.1.2: Heading count and pattern
    const headings = await page.$$eval('h2', elements => elements.map(e => e.innerText.trim()));
    if (headings.length === 11) {
        addPass('TC-1.1.1', 'Exactly 11 headings found.');
    } else {
        addFail('TC-1.1.1', `Expected 11 headings, found ${headings.length}.`);
    }

    headings.forEach((h, i) => {
        const expected = MANDATORY_SECTIONS[i];
        if (expected && expected.pattern.test(h)) {
            addPass(`TC-1.1.2-${expected.id}`, `Heading '${h}' matches pattern.`);
        } else if (expected) {
            addFail(`TC-1.1.2-${expected.id}`, `Expected '${expected.pattern}' at position ${i + 1}, found '${h || 'None'}'.`);
        }
    });

    // TC-1.2.1-3: Global search for forbidden patterns
    const bodyText = await page.innerText('body');
    if (/\(\d+\.?\d*p\)/.test(bodyText)) addFail('REQ-1.2.1', 'Section length (e.g., (1p)) found in text.');
    else addPass('REQ-1.2.1', 'No section length markers found.');

    if (/^Página:/m.test(bodyText)) addFail('REQ-1.2.2', 'Página meta-line found.');
    else addPass('REQ-1.2.2', 'No Página meta-lines found.');

    if (/\(Learning Objectives\)/i.test(bodyText)) addFail('REQ-1.2.3', '(Learning Objectives) marker found.');
    else addPass('REQ-1.2.3', 'No (Learning Objectives) markers found.');


    // --- 2. Section-Specific Content ---

    // TC-2.1.1: SEC-01 Korean only learning objectives (approximate check)
    const openerText = await page.evaluate(() => {
        const opener = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('1. Opener'));
        if (!opener) return '';
        let text = '';
        let next = opener.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            text += next.innerText;
            next = next.nextElementSibling;
        }
        return text;
    });
    // Check for full English sentences (simple heuristic: 4+ words with spaces)
    if (/[a-zA-Z]{2,}\s+[a-zA-Z]{2,}\s+[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/.test(openerText)) {
        addFail('TC-2.1.1', 'Possible English sentences found in Opener learning objectives.');
    } else {
        addPass('TC-2.1.1', 'Learning objectives appear to be English-free (approx).');
    }

    // TC-2.2.1-5: SEC-02 Vocab
    const vocabData = await page.evaluate(() => {
        const section = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('2. Vocabulario Esencial'));
        if (!section) return null;
        let images = [];
        let tables = [];
        let next = section.nextElementSibling;
        let afterTableP = null;
        while (next && next.tagName !== 'H2') {
            if (next.tagName === 'IMG') images.push(next.src);
            if (next.tagName === 'TABLE') {
                tables.push(next);
                afterTableP = next.nextElementSibling?.tagName === 'P' ? next.nextElementSibling.innerText : null;
            }
            if (next.querySelector('img')) images.push(next.querySelector('img').src);
            next = next.nextElementSibling;
        }
        return {
            imageCount: images.length,
            imageSrcs: images,
            tableCount: tables.length,
            tableCols: tables[0] ? tables[0].rows[0]?.cells.length : 0,
            legend: afterTableP
        };
    });

    if (vocabData) {
        if (vocabData.imageCount >= 1) addPass('TC-2.2.1', 'Vocab image exists.');
        else addFail('TC-2.2.1', 'Vocab image missing.');

        if (vocabData.tableCols >= 3) addPass('TC-2.2.4', 'Vocab table has 3+ columns.');
        else addFail('TC-2.2.4', 'Vocab table missing columns (ES/EN/KO).');

        if (vocabData.legend && vocabData.legend.includes('✅')) addPass('TC-2.2.5', 'External Legend (✅) found.');
        else addWarn('TC-2.2.5', 'External Legend (✅) missing or incorrect.');
    }

    // TC-2.4.x: SEC-04 Grammar
    const grammarTables = await page.evaluate(() => {
        const section = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('4. Gramática Esencial'));
        if (!section) return [];
        let tables = [];
        let next = section.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            if (next.tagName === 'TABLE') {
                tables.push({
                    rows: next.rows.length,
                    cols: next.rows[0]?.cells.length,
                    html: next.outerHTML,
                    text: next.innerText
                });
            }
            next = next.nextElementSibling;
        }
        return tables;
    });

    if (grammarTables.length > 0) {
        addPass('TC-2.4.1', 'Grammar table (HTML) exists.');
        grammarTables.forEach((t, i) => {
            if (t.rows >= 7) addPass(`TC-2.4.3-${i}`, 'Table has 6+ persons.');
            else addFail(`TC-2.4.3-${i}`, `Table has only ${t.rows - 1} person rows.`);

            if (t.cols <= 5) addPass(`TC-2.4.6-${i}`, 'Table has <= 4 verb columns.');
            else addFail(`TC-2.4.6-${i}`, `Table has too many columns (${t.cols - 1} verbs).`);

            if (/(1인칭|2인칭|3인칭|person)/i.test(t.text)) addFail(`TC-2.4.4-${i}`, 'Table contains forbidden person labels.');
            else addPass(`TC-2.4.4-${i}`, 'No person labels found in table.');
        });
    }

    // TC-2.6.x: SEC-06 Practice
    const practiceCount = await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll('h2'));
        const section = h2s.find(h => h.innerText.includes('6. Práctica'));
        if (!section) return 0;

        let count = 0;
        let next = section.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            // Count items in ordered/unordered lists or paragraphs starting with numbers
            const items = next.querySelectorAll('li');
            if (items.length > 0) {
                count += items.length;
            } else if (next.tagName === 'P' || next.tagName === 'DIV') {
                const lines = next.innerText.split('\n');
                count += lines.filter(l => /^\d+\.?\s+|^\w\.\s+/.test(l.trim())).length;
            }
            next = next.nextElementSibling;
        }
        return count;
    });
    if (practiceCount === 15) addPass('TC-2.6.3', 'Total 15 items in Practice.');
    else if (practiceCount > 0) addFail('TC-2.6.3', `Practice items count mismatch. Expected 15, found ${practiceCount}.`);
    else addFail('TC-2.6.3', 'Practice items not found or count is zero.');

    // TC-2.8.2: SEC-08 Dialog
    const dialogTurns = await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll('h2'));
        const section = h2s.find(h => h.innerText.includes('8. Diálogo'));
        if (!section) return 0;

        let table = null;
        let next = section.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            if (next.tagName === 'TABLE') { table = next; break; }
            if (next.querySelector('table')) { table = next.querySelector('table'); break; }
            next = next.nextElementSibling;
        }
        return table ? table.rows.length : 0;
    });
    if (dialogTurns >= 8 && dialogTurns <= 12) addPass('TC-2.8.2', `Dialog has ${dialogTurns} turns.`);
    else if (dialogTurns > 0) addWarn('TC-2.8.2', `Dialog turn count (${dialogTurns}) is outside recommended 8-12 range.`);
    else addFail('TC-2.8.2', 'Dialog table not found in SEC-08.');

    // TC-2.11.1: SEC-11 Soluciones
    const solutionsCount = await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll('h2'));
        const section = h2s.find(h => h.innerText.includes('11. Soluciones'));
        if (!section) return 0;
        let text = '';
        let next = section.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            text += next.innerText + '\n';
            next = next.nextElementSibling;
        }
        return (text.match(/^\d+\.?\s+/gm) || []).length;
    });
    if (solutionsCount >= 15) addPass('TC-2.11.1', 'Solutions cover 15+ items.');
    else addFail('TC-2.11.1', `Solutions count mismatch. Found ${solutionsCount}, expected >= 15.`);


    // --- 3. Design Specification ---

    const styles = await page.evaluate(() => {
        const container = document.querySelector('.container');
        const th = document.querySelector('table thead th');
        const zebra = document.querySelector('table tr:nth-child(even)');
        const table = document.querySelector('table');

        return {
            containerWidth: container ? getComputedStyle(container).maxWidth : 'none',
            headerFont: th ? getComputedStyle(th).fontFamily : '',
            headerBg: th ? getComputedStyle(th).background : '',
            zebraBg: zebra ? getComputedStyle(zebra).backgroundColor : '',
            tableShadow: table ? getComputedStyle(table).boxShadow : '',
            tableRadius: table ? getComputedStyle(table).borderRadius : ''
        };
    });

    if (styles.containerWidth === '900px') addPass('TC-3.1.1', 'Container width is 900px.');
    else addFail('TC-3.1.1', `Container width is ${styles.containerWidth} (expected 900px).`);

    if (styles.headerFont.includes('Montserrat')) addPass('TC-3.3.1-Font', 'Table header uses Montserrat.');
    else addWarn('TC-3.3.1-Font', 'Montserrat font not detected in table header.');

    if (styles.headerBg.includes('gradient') || styles.headerBg.includes('rgb(169, 50, 38)')) addPass('TC-3.3.1-Bg', 'Table header uses gradient or brand color.');
    else addWarn('TC-3.3.1-Bg', `Gradient/Brand color not detected in table header (Found: ${styles.headerBg}).`);

    if (styles.zebraBg && styles.zebraBg !== 'rgba(0, 0, 0, 0)' && styles.zebraBg !== 'rgb(255, 255, 255)') addPass('TC-3.3.2', `Zebra striping detected (${styles.zebraBg}).`);
    else addWarn('TC-3.3.2', 'Zebra striping not detected.');


    // --- 4. Image Verification ---

    const allImages = await page.$$eval('img', imgs => imgs.map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') })));
    for (const img of allImages) {
        if (!img.src.startsWith('../images/')) {
            addFail('REQ-4.1.1', `Image src '${img.src}' is not relative.`);
        } else {
            const fullPath = path.join(path.dirname(filePath), img.src);
            if (!fs.existsSync(fullPath)) addFail('REQ-2.7.4', `Image file '${img.src}' missing on disk.`);
            else addPass('REQ-2.7.4', `Image '${img.src}' verified.`);
        }
        if (!img.alt || img.alt.trim() === '') addFail('REQ-4.1.2', `Image '${img.src}' missing alt text.`);
        else addPass('REQ-4.1.2', `Image '${img.src}' has alt text.`);
    }


    // --- 5. Prohibition & Grammar Audit ---

    // TC-7.1.1: Audio
    if (await page.$('audio, a[href$=".mp3"], a[href$=".wav"]')) addFail('TC-7.1.1', 'Audio elements or links found.');
    else addPass('TC-7.1.1', 'No audio elements found.');

    // TC-5.3.x: Tense & Irregulars
    function detectTense(html) {
        const match = html.match(/Gramática Esencial.*?>(Presente|Gerundio|Indefinido|Imperfecto|Futuro|Participio|Imperativo)/i);
        return match ? match[1] : 'Unknown';
    }
    const htmlFull = await page.content();
    const tense = detectTense(htmlFull);
    if (tense !== 'Unknown') {
        const mandatory = MANDATORY_IRREGULARS[tense] || [];
        const found = [];
        const missing = [];
        for (const verb of mandatory) {
            if (bodyText.toLowerCase().includes(verb.toLowerCase())) found.push(verb);
            else missing.push(verb);
        }
        if (missing.length === 0) addPass('TC-5.3.1', `All mandatory irregulars for ${tense} found.`);
        else addFail('TC-5.3.2', `Missing ${tense} irregulars: ${missing.join(', ')}`);
    }

    return results;
}

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    if (!fs.existsSync(CHAPTERS_DIR)) {
        console.error(`Directory not found: ${CHAPTERS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.endsWith('.html'));

    let report = `# Verification Report: Hola-AL v2.1 (Strict Gold Standard)\n\n`;
    report += `Date: ${new Date().toLocaleString('ko-KR')}\n\n`;

    for (const file of files) {
        console.log(`Verifying ${file}...`);
        const res = await verifyChapter(page, path.join(CHAPTERS_DIR, file));

        report += `## ${res.file}\n`;
        report += `**Gold Standard Status**: ${res.goldStandard ? '✅ PASS' : '❌ FAIL'}\n\n`;

        report += `### 1. Structural Integrity\n| ID | Result | Message |\n|---|---|---|\n`;
        res.passed.filter(t => t.id.startsWith('TC-1') || t.id.startsWith('REQ-1')).forEach(t => report += `| ${t.id} | ✅ | ${t.msg} |\n`);
        res.failed.filter(t => t.id.startsWith('TC-1') || t.id.startsWith('REQ-1')).forEach(t => report += `| ${t.id} | ❌ | ${t.msg} |\n`);

        report += `\n### 2. Section Content & Grammar\n| ID | Result | Message |\n|---|---|---|\n`;
        res.passed.filter(t => t.id.startsWith('TC-2') || t.id.startsWith('TC-5')).forEach(t => report += `| ${t.id} | ✅ | ${t.msg} |\n`);
        res.failed.filter(t => t.id.startsWith('TC-2') || t.id.startsWith('TC-5')).forEach(t => report += `| ${t.id} | ❌ | ${t.msg} |\n`);

        report += `\n### 3. Design & Images\n| ID | Result | Message |\n|---|---|---|\n`;
        res.passed.filter(t => t.id.startsWith('TC-3') || t.id.startsWith('REQ-4')).forEach(t => report += `| ${t.id} | ✅ | ${t.msg} |\n`);
        res.failed.filter(t => t.id.startsWith('TC-3') || t.id.startsWith('REQ-4')).forEach(t => report += `| ${t.id} | ❌ | ${t.msg} |\n`);

        if (res.warnings.length > 0) {
            report += `\n### ⚠️ Warnings\n`;
            res.warnings.forEach(w => report += `- [${w.id}] ${w.msg}\n`);
        }

        report += `\n---\n`;
    }

    fs.writeFileSync(REPORT_PATH, report);
    console.log(`Report generated: ${REPORT_PATH}`);
    await browser.close();
}

run().catch(console.error);
