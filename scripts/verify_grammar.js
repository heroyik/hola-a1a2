const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '../output');
const REPORT_PATH = path.join(__dirname, '../output/verification_report.md');

const MANDATORY_IRREGULARS = {
    'Presente': ['ser', 'estar', 'ir', 'tener', 'saber', 'poder'],
    'Gerundio': ['ir', 'leer', 'repetir', 'decir', 'venir', 'dormir', 'morir'], // Adjusted to Spec
    'Indefinido': ['estar', 'tener', 'poder', 'poner', 'querer', 'saber', 'venir', 'decir', 'dar', 'hacer', 'haber', 'ser', 'ir'],
    'Imperfecto': ['ser', 'ir', 'ver'],
    'Futuro': ['decir', 'hacer', 'poder', 'querer', 'saber', 'salir', 'tener', 'venir', 'poner', 'haber'],
    'Participio': ['hacer', 'poner', 'escribir', 'decir', 'volver', 'abrir', 'leer', 'romper'], // Adjusted to Spec
    'Imperativo': ['dar', 'ser', 'ver', 'ir', 'decir', 'hacer', 'poner', 'salir', 'tener', 'venir']
};

const SECTIONS = [
    '1. Opener', '2. Vocabulario Esencial', '3. Expresiones Útiles', '4. Gramática Esencial',
    '5. Cultura Viva', '6. Práctica', '7. Lectura', '8. Diálogo', '9. Repaso', '10. Cierre', '11. Soluciones'
];

async function verifyChapter(page, filePath) {
    const fileName = path.basename(filePath);
    const results = {
        file: fileName,
        sections: [],
        tables: { markdown: 0, html: 0, endingHighlights: 0 },
        design: { container: false, colors: false, images: true },
        grammar: { tense: 'Unknown', irregularsFound: [], missing: [] },
        errors: []
    };

    await page.goto(`file://${filePath}`);

    // 1. Verify Mandatory Sections & Order
    const headers = await page.$$eval('h2', elements => elements.map(e => e.innerText.trim()));
    headers.forEach((h, i) => {
        if (SECTIONS[i] && h.includes(SECTIONS[i])) {
            results.sections.push(h);
        } else if (SECTIONS[i]) {
            results.errors.push(`Section Order/Naming Error: Expected '${SECTIONS[i]}' at position ${i+1}, found '${h || 'None'}'.`);
        }
    });

    if (headers.length !== SECTIONS.length) {
        results.errors.push(`Section Count Error: Expected ${SECTIONS.length} sections, found ${headers.length}.`);
    }

    // 2. Design Audit
    const containerWidth = await page.$eval('.container', el => getComputedStyle(el).width).catch(() => 'none');
    results.design.container = containerWidth === '900px';
    if (!results.design.container) results.errors.push(`Design Error: Main container width is not 900px (Actual: ${containerWidth}).`);

    // 3. Image Relative Path & Existence Audit
    const images = await page.$$eval('img', imgs => imgs.map(img => img.getAttribute('src')));
    for (const src of images) {
        if (!src.startsWith('../images/')) {
            results.design.images = false;
            results.errors.push(`Image Error: Path '${src}' is not relative (Should start with ../images/).`);
        } else {
            const imgPath = path.join(path.dirname(filePath), src);
            if (!fs.existsSync(imgPath)) {
                results.design.images = false;
                results.errors.push(`Image Error: Referenced file '${src}' does not exist on disk.`);
            }
        }
    }

    // 3.1. Verify Image in Section 2 (Vocabulario Esencial)
    const section2Image = await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll('h2'));
        const vocabSection = h2s.find(h => h.innerText.includes('2. Vocabulario Esencial'));
        if (!vocabSection) return false;
        
        let next = vocabSection.nextElementSibling;
        while (next && next.tagName !== 'H2') {
            if (next.tagName === 'IMG' || next.querySelector('img')) return true;
            next = next.nextElementSibling;
        }
        return false;
    });

    if (!section2Image) {
        results.errors.push(`Structure Error: Section '2. Vocabulario Esencial' is missing an illustration image.`);
    }

    // 4. Table Layout Audit (STRICT: Forbid Markdown Pipes)
    const htmlSource = await page.content();
    const hasPipes = htmlSource.match(/\|.*\|/g);
    if (hasPipes && htmlSource.includes('Gramática')) { // Check pipes in grammar or vocab
         // Only fail if it looks like a data table
         if (hasPipes.some(p => p.includes('Yo') || p.includes('yo'))) {
            results.tables.markdown = 1;
            results.errors.push(`STRICT FAILURE: Markdown table ('|') used for conjugations. MUST use HTML <table> tags.`);
         }
    }

    const htmlTables = await page.$$('table');
    results.tables.html = htmlTables.length;

    for (const table of htmlTables) {
        const hasHighlights = await table.$('strong, span');
        if (hasHighlights) results.tables.endingHighlights++;
        
        const tableText = await table.innerText();
        const isConjugation = ['yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos'].some(s => tableText.toLowerCase().includes(s));
        
        if (isConjugation && !hasHighlights) {
            results.errors.push(`Table Error: Conjugation table missing <strong> or <span> highlights for endings.`);
        }
    }

    // 5. Grammar & Irregulars Audit
    function detectTense(html) {
        const headerMatch = html.match(/<(h[1-6])[^>]*>.*?(Presente|Gerundio|Indefinido|Imperfecto|Futuro|Participio|Imperativo).*?<\/\1>/i);
        if (headerMatch) return headerMatch[2];
        return 'Unknown';
    }
    results.grammar.tense = detectTense(htmlSource);

    const text = await page.innerText('body');
    const mandatory = MANDATORY_IRREGULARS[results.grammar.tense] || [];
    for (const verb of mandatory) {
        if (text.toLowerCase().includes(verb.toLowerCase())) {
            results.grammar.irregularsFound.push(verb);
        } else {
            results.grammar.missing.push(verb);
        }
    }

    if (results.grammar.missing.length > 0 && results.grammar.tense !== 'Unknown') {
        results.errors.push(`MISSING MANDATORY IRREGULAR (${results.grammar.tense}): ${results.grammar.missing.join(', ')}`);
    }

    return results;
}

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Ensure output directory exists for finding HTMLs
    if (!fs.existsSync(CHAPTERS_DIR)) {
        console.error(`Chapters directory not found: ${CHAPTERS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.endsWith('.html'));
    
    let report = `# Verification Report: Spanish Textbook v2.0 (Strict)\n\n`;
    report += `Date: ${new Date().toLocaleString('ko-KR')}\n\n`;

    for (const file of files) {
        console.log(`Verifying ${file}...`);
        const result = await verifyChapter(page, path.join(CHAPTERS_DIR, file));
        
        report += `## ${result.file}\n`;
        report += `- **Tense**: ${result.grammar.tense}\n`;
        report += `- **Design**: Container 900px (${result.design.container ? '✅' : '❌'}) | Images Relative (${result.design.images ? '✅' : '❌'})\n`;
        report += `- **Structure**: Sections Matching (${result.sections.length}/${SECTIONS.length})\n`;
        report += `- **Tables**: HTML (${result.tables.html}) | Ending Highlights (${result.tables.endingHighlights}) | Markdown Conjugations (${result.tables.markdown > 0 ? '❌' : '✅'})\n`;
        
        if (result.errors.length > 0) {
            report += `### ❌ Errors\n`;
            result.errors.forEach(err => report += `- ${err}\n`);
        } else {
            report += `### ✅ Gold Standard Met.\n`;
        }
        report += `\n---\n`;
    }

    fs.writeFileSync(REPORT_PATH, report);
    console.log(`Report generated at ${REPORT_PATH}`);
    await browser.close();
}

run().catch(console.error);
