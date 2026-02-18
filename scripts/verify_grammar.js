const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '../output');
const REPORT_PATH = path.join(__dirname, '../output/verification_report.md');

// MANDATORY_IRREGULARS from REQ-5.3 (Grammar v5.8)
const MANDATORY_IRREGULARS = {
    'Presente': ['ser', 'estar', 'ir', 'tener', 'saber', 'poder'],
    'Gerundio': ['ir', 'leer', 'repetir', 'decir', 'venir', 'dormir', 'morir'], // estar + gerundio
    'Indefinido': ['estar', 'tener', 'poder', 'poner', 'querer', 'saber', 'venir', 'decir', 'dar', 'hacer', 'haber', 'ser/ir'],
    'Imperfecto': ['ser', 'ir', 'ver'], // 불완료과거
    'Futuro': ['decir', 'hacer', 'poder', 'querer', 'saber', 'salir', 'tener', 'venir', 'poner', 'haber'],
    'Participio': ['hacer', 'poner', 'escribir', 'decir', 'volver', 'abrir', 'leer', 'romper'], // Presente/Pluscuamperfecto
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

    // --- 1. Structural Integrity (REQ-1) ---

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
            addFail(`TC-1.1.2-${expected.id}`, `Expected'${expected.id}' pattern at position ${i + 1}, found '${h || 'None'}'.`);
        }
    });

    // TC-1.2.1-3: Global search for forbidden patterns
    const bodyText = await page.innerText('body');
    if (/\(\d+\.?\d*p\)/.test(bodyText)) addFail('REQ-7.1.3', 'Section length (e.g., (1p)) found in text.');
    else addPass('REQ-7.1.3', 'No section length markers found.');

    if (/^Página:/m.test(bodyText)) addFail('REQ-7.1.4', 'Página meta-line found.');
    else addPass('REQ-7.1.4', 'No Página meta-lines found.');

    if (/\(Learning Objectives\)/i.test(bodyText)) addFail('REQ-7.1.5', '(Learning Objectives) marker found.');
    else addPass('REQ-7.1.5', 'No (Learning Objectives) markers found.');


    // --- 2. Section-Specific Content (REQ-2) ---

    // TC-2.1.2: ¿Sabías que...? must exist in Opener
    if (bodyText.includes('¿Sabías que')) addPass('TC-2.1.2', '¿Sabías que...? cultural tip found.');
    else addFail('TC-2.1.2', '¿Sabías que...? cultural tip missing in Opener.');

    // TC-2.2.1-5: SEC-02 Vocab
    const vocabData = await page.evaluate(() => {
        const section = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('2. Vocabulario Esencial'));
        if (!section) return null;
        let images = [];
        let tables = [];
        let next = section.nextElementSibling;
        let afterTableP = null;
        while (next && next.tagName !== 'H2') {
            // Collect images within this child (P, DIV, or IMG itself)
            if (next.tagName === 'IMG') {
                images.push(next.src);
            } else {
                const innerImgs = next.querySelectorAll('img');
                innerImgs.forEach(img => images.push(img.src));
            }

            if (next.tagName === 'TABLE') tables.push(next);
            if (next.querySelector('table')) tables.push(next.querySelector('table')); // Handle table-container

            if (tables.length > 0 && !afterTableP) {
                let p = next.nextElementSibling;
                while (p && p.tagName !== 'P' && p.tagName !== 'H2') p = p.nextElementSibling;
                if (p && p.tagName === 'P') afterTableP = p.innerText;
            }
            next = next.nextElementSibling;
        }
        return {
            imageCount: images.length,
            tableCols: tables[0] ? tables[0].rows[0]?.cells.length : 0,
            legend: afterTableP
        };
    });

    if (vocabData) {
        if (vocabData.imageCount >= 1) addPass('TC-2.2.1', 'Vocab image exists.');
        else addFail('TC-2.2.1', 'Vocab image missing in SEC-02.');

        if (vocabData.tableCols >= 3) addPass('TC-2.2.4', 'Vocab table has 3+ columns.');
        else addFail('TC-2.2.4', `Vocab table columns check failed (found ${vocabData.tableCols}).`);

        if (vocabData.legend && vocabData.legend.includes('✅')) addPass('TC-2.2.5', 'External Legend (✅) found after vocab table.');
        else addFail('TC-2.2.5', 'External Legend (✅) missing or not in a separate paragraph after vocab table.');
    }

    // TC-2.4.x / TC-5.1.x: SEC-04 Grammar (Raw HTML Tables)
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
                    text: next.innerText,
                    hasEmphasis: !!next.querySelector('strong, span')
                });
            } else if (next.querySelector('table')) {
                const t = next.querySelector('table');
                tables.push({
                    rows: t.rows.length,
                    cols: t.rows[0]?.cells.length,
                    text: t.innerText,
                    hasEmphasis: !!t.querySelector('strong, span')
                });
            }
            next = next.nextElementSibling;
        }
        return tables;
    });

    if (grammarTables.length > 0) {
        addPass('TC-5.1.3', 'Grammar table (HTML) exists.');
        grammarTables.forEach((t, i) => {
            const isPersonTable = /\b(yo|tú|él|ella|ud|nosotros|vosotros|ellos|ellas|uds)\b/i.test(t.text);
            const isReverseVerb = /duele/i.test(t.text) && /duelen/i.test(t.text);
            const isVerbList = (t.text.match(/\b\w+(ar|er|ir)(se)?\b/gi) || []).length >= 3;

            if (isReverseVerb || isVerbList || !isPersonTable || t.rows >= 7) addPass(`TC-5.1.3-Rows-${i}`, `Table has ${isReverseVerb ? 'duele/duelen' : isVerbList ? 'verb list' : isPersonTable ? '6+' : 'N/A'} persons.`);
            else addFail(`TC-5.1.3-Rows-${i}`, `Table ${i + 1} has only ${t.rows} total rows (Person conjugation table expected 6+ rows).`);

            if (t.cols <= 5) addPass(`TC-5.1.6-${i}`, 'Table has <= 4 verb columns.');
            else addFail(`TC-5.1.6-${i}`, `Table ${i + 1} has too many columns (${t.cols - 1} verbs).`);

            if (/(1인칭|2인칭|3인칭|person)/i.test(t.text)) addFail(`TC-5.1.4-${i}`, 'Table contains forbidden person labels.');
            else addPass(`TC-5.1.4-${i}`, 'No forbidden person labels found in table.');

            if (t.hasEmphasis) addPass(`TC-5.1.5-${i}`, 'Table uses strong/span for endings.');
            else addFail(`TC-5.1.5-${i}`, `Table ${i + 1} missing emphasis (strong/span) for endings.`);
        });
    }

    // TC-2.5.1-2: Cultura Viva ES + KO
    const culturaContent = await page.evaluate(() => {
        const section = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('5. Cultura Viva'));
        if (!section) return '';
        let text = '';
        let next = section.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            text += next.innerText + '\n';
            next = next.nextElementSibling;
        }
        return text;
    });
    if (culturaContent) {
        const hasSpanish = /[áéíóúñ¿¡]/.test(culturaContent);
        const hasKorean = /[가-힣]/.test(culturaContent);
        if (hasSpanish) addPass('TC-2.5.1', 'Cultura Viva contains Spanish content.');
        else addFail('TC-2.5.1', 'Cultura Viva missing Spanish specific characters.');

        if (hasKorean) addPass('TC-2.5.2', 'Cultura Viva contains Korean translation.');
        else addFail('TC-2.5.2', 'Cultura Viva missing Korean translation.');
    }

    // TC-2.6.x: SEC-06 Practice (15 items)
    const practiceStats = await page.evaluate(() => {
        const section = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('6. Práctica'));
        if (!section) return { textCount: 0, liCount: 0 };
        let text = '';
        let liCount = 0;
        let tableRowCount = 0;
        let next = section.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            text += next.innerText + '\n';
            liCount += next.querySelectorAll('li').length;
            if (next.tagName === 'TABLE') tableRowCount += next.querySelectorAll('tbody tr').length;
            else if (next.querySelector('table')) tableRowCount += next.querySelectorAll('table tbody tr').length;
            next = next.nextElementSibling;
        }
        const textCount = (text.match(/^\s*\d+[\.\)]\s+/gm) || []).length;
        return { textCount, liCount, tableRowCount };
    });

    const totalPracticeItems = practiceStats.textCount + practiceStats.liCount + practiceStats.tableRowCount;

    if (totalPracticeItems >= 15) addPass('TC-2.6.3', `Found ${totalPracticeItems} items in Practice.`);
    else addFail('TC-2.6.3', `Practice items count mismatch. Found ${totalPracticeItems} (Text: ${practiceStats.textCount}, LI: ${practiceStats.liCount}, Table: ${practiceStats.tableRowCount}), expected 15+ (5 per part).`);

    // --- 3. Design Specification (REQ-3) ---

    const styles = await page.evaluate(() => {
        const container = document.querySelector('.container');
        const th = document.querySelector('table thead th');
        const thead = document.querySelector('table thead');
        const zebra = document.querySelector('table tr:nth-child(even)');
        const table = document.querySelector('table');

        return {
            containerWidth: container ? getComputedStyle(container).maxWidth : 'none',
            containerMargin: container ? getComputedStyle(container).marginLeft : '',
            headerFont: th ? getComputedStyle(th).fontFamily : '',
            theadBg: thead ? getComputedStyle(thead).background : '',
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

    if (styles.theadBg.includes('gradient') || styles.headerBg.includes('gradient') || styles.headerBg.includes('rgb(169, 50, 38)')) {
        addPass('TC-3.3.1-Bg', 'Table header uses gradient or brand color.');
    } else {
        addWarn('TC-3.3.1-Bg', `Elevated table header style (gradient/brand) not detected. (Found: ${styles.theadBg || styles.headerBg})`);
    }

    if (styles.zebraBg && styles.zebraBg !== 'rgba(0, 0, 0, 0)' && styles.zebraBg !== 'rgb(255, 255, 255)') addPass('TC-3.3.2', 'Zebra striping detected.');
    else addWarn('TC-3.3.2', 'Zebra striping not detected on tables.');


    // --- 4. Image Verification (REQ-4) ---

    const allImages = await page.$$eval('img', imgs => imgs.map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') })));
    for (const img of allImages) {
        if (!img.src.startsWith('../images/')) {
            addFail('REQ-7.1.6', `Image src '${img.src}' is not relative (../images/).`);
        } else {
            const relPath = img.src.replace('../', '');
            const fullPath = path.join(process.cwd(), relPath);
            if (!fs.existsSync(fullPath)) addWarn('REQ-4.1.4', `Image file '${img.src}' missing on disk.`);
            else addPass('REQ-4.1.4', `Image '${img.src}' exists on disk.`);
        }
        if (!img.alt || img.alt.trim() === '') addFail('REQ-4.1.2', `Image '${img.src}' missing alt text.`);
    }

    // --- 5. Grammar Audit (Grammar v5.8) ---

    // Detect all tenses present in the chapter
    const activeTenses = [];
    if (/presente/i.test(bodyText)) activeTenses.push('Presente');
    if (/gerundio|progresivo/i.test(bodyText) || /estar\s+.*\s+-\w+ndo/i.test(bodyText)) activeTenses.push('Gerundio');

    // Indefinido: Check for 'indefinido' OR 'pretérito' WITHOUT 'perfecto'
    if (/indefinido/i.test(bodyText) || (/pretérito/i.test(bodyText) && !/perfecto/i.test(bodyText))) activeTenses.push('Indefinido');

    if (/imperfecto/i.test(bodyText)) activeTenses.push('Imperfecto');
    if (/futuro/i.test(bodyText)) activeTenses.push('Futuro');

    // Participio / Pretérito Perfecto
    if (/participio|perfecto/i.test(bodyText)) activeTenses.push('Participio');

    if (/imperativo|comando/i.test(bodyText)) activeTenses.push('Imperativo');

    activeTenses.forEach(tense => {
        const mandatory = MANDATORY_IRREGULARS[tense] || [];
        const missing = mandatory.filter(v => !bodyText.toLowerCase().includes(v.toLowerCase()));
        if (missing.length === 0) {
            addPass(`TC-5.3-${tense}`, `All mandatory irregulars for ${tense} found.`);
        } else {
            addFail(`TC-5.3-${tense}`, `Missing ${tense} irregulars: ${missing.join(', ')}`);
        }
    });

    // REQ-5.2 Check for speak, eat, live (hablar, comer, vivir) if rule explanation exists
    if (/regulares/i.test(bodyText)) {
        ['hablar', 'comer', 'vivir'].forEach(v => {
            if (bodyText.toLowerCase().includes(v)) addPass(`TC-5.2-${v}`, `${v} found for regular explanation.`);
            else addWarn(`TC-5.2-${v}`, `Standard regular verb ${v} not found.`);
        });
    }

    return results;
}

function practiceCount_v2(text) {
    // Look for items like "1. ", "5. ", "A. ", "B. ", "C. "
    const matches = text.match(/^\d+\.?\s+/gm) || [];
    // Filter to SEC-06 if possible, but simple global count for Práctica usually works if Soluciones is excluded
    // Subtract Soluciones count which also uses numbers
    const solStart = text.indexOf('11. Soluciones');
    let practiceText = solStart !== -1 ? text.substring(0, solStart) : text;
    const practiceSectionStart = practiceText.indexOf('6. Práctica');
    if (practiceSectionStart !== -1) {
        practiceText = practiceText.substring(practiceSectionStart);
    }
    const filteredMatches = practiceText.match(/^\d+\.?\s+/gm) || [];
    return filteredMatches.length;
}

async function run() {
    process.env.PAGER = 'cat';
    const browser = await chromium.launch();
    const page = await browser.newPage();

    if (!fs.existsSync(CHAPTERS_DIR)) {
        console.error(`Directory not found: ${CHAPTERS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.endsWith('.html'));

    let report = `# Verification Report: Hola-AL v2.1 (Strict Gold Standard)\n\n`;
    report += `Date: ${new Date().toLocaleString('ko-KR')}\n`;
    report += `Strategy Version: v5.2 (Grammar v5.8)\n\n`;

    for (const file of files) {
        console.log(`Verifying ${file}...`);
        const res = await verifyChapter(page, path.join(CHAPTERS_DIR, file));

        report += `## ${res.file}\n`;
        report += `**Gold Standard Status**: ${res.goldStandard ? '✅ PASS' : '❌ FAIL'}\n\n`;

        report += `### 1. Structural Integrity\n| ID | Result | Message |\n|---|---|---|\n`;
        const struct = [...res.passed, ...res.failed].filter(t => t.id.startsWith('TC-1') || t.id.startsWith('REQ-1') || t.id.startsWith('REQ-7'));
        struct.forEach(t => report += `| ${t.id} | ${res.passed.includes(t) ? '✅' : '❌'} | ${t.msg} |\n`);

        report += `\n### 2. Grammar & Content (v5.8)\n| ID | Result | Message |\n|---|---|---|\n`;
        const gram = [...res.passed, ...res.failed].filter(t => t.id.startsWith('TC-2') || t.id.startsWith('TC-5'));
        gram.forEach(t => report += `| ${t.id} | ${res.passed.includes(t) ? '✅' : '❌'} | ${t.msg} |\n`);

        report += `\n### 3. Design & Images\n| ID | Result | Message |\n|---|---|---|\n`;
        const design = [...res.passed, ...res.failed].filter(t => t.id.startsWith('TC-3') || t.id.startsWith('REQ-3') || t.id.startsWith('REQ-4'));
        design.forEach(t => report += `| ${t.id} | ${res.passed.includes(t) ? '✅' : '❌'} | ${t.msg} |\n`);

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
