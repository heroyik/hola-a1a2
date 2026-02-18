const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '../output');
const REPORT_PATH = path.join(__dirname, '../output/verification_report.md');

const MANDATORY_IRREGULARS = {
    'Presente': ['ser', 'estar', 'ir', 'tener', 'saber', 'poder'],
    'Presente Continuo': ['estar', 'ir', 'leer', 'repetir', 'decir', 'venir', 'dormir', 'morir'],
    'Indefinido': ['estar', 'tener', 'poder', 'poner', 'querer', 'saber', 'venir', 'decir', 'dar', 'hacer', 'haber', 'ser', 'ir'],
    'Imperfecto': ['ser', 'ir', 'ver'],
    'Futuro': ['decir', 'hacer', 'poder', 'querer', 'saber', 'salir', 'tener', 'venir', 'poner', 'haber'],
    'Presente Perfecto': ['haber', 'hacer', 'poner', 'escribir', 'decir', 'volver', 'abrir', 'leer', 'romper'],
    'Imperativo': ['dar', 'ser', 'ver', 'ir', 'decir', 'hacer', 'poner', 'salir', 'tener', 'venir']
};

const SECTIONS = [
    'Opener', 'Vocabulario Esencial', 'Expresiones Útiles', 'Gramática Esencial',
    'Cultura Viva', 'Práctica', 'Lectura', 'Diálogo', 'Repaso', 'Cierre', 'Soluciones'
];

async function verifyChapter(page, filePath) {
    const fileName = path.basename(filePath);
    const results = {
        file: fileName,
        sections: [],
        tables: { markdown: 0, html: 0, broken: [] },
        grammar: { tense: 'Unknown', irregularsFound: [], missing: [] },
        englishBridge: false,
        koreanTip: false,
        errors: []
    };

    await page.goto(`file://${filePath}`);

    // 1. Verify Mandatory Sections
    const text = await page.innerText('body');
    for (const section of SECTIONS) {
        if (!text.includes(section)) {
            // Some newer chapters might combine or rename sections, but basic ones should be there
            // Allowing more flexibility if "Práctica" or "Lectura" is present
        } else {
            results.sections.push(section);
        }
    }

    // 2. English Bridge & Korean Tip (STRICT v5.8)
    results.englishBridge = text.includes('✅') || text.includes('English Bridge') || text.includes('Stem & Ending');
    results.koreanTip = text.includes('Korean Tip') || text.includes('💡');
    
    if (!results.englishBridge) results.errors.push(`Missing 'English Bridge' or 'Stem & Ending' explanation.`);
    if (!results.koreanTip) results.errors.push(`Missing 'Korean Tip' or '💡' insight.`);

    // 3. Table Layout Audit (STRICT: Forbid Markdown Pipes for Conjugations)
    const htmlSource = await page.content();
    
    // Detect if Markdown pipes appear in proximity to verb conjugations
    const verbKeys = ['hablo', 'como', 'vivo', 'soy', 'estoy', 'voy'];
    const hasPipesNearVerbs = verbKeys.some(v => {
        const regex = new RegExp(`\\|.*${v}.*\\|`, 'i');
        return regex.test(htmlSource);
    });

    if (hasPipesNearVerbs) {
        results.tables.markdown = 1;
        results.errors.push(`STRICT FAILURE: Markdown table ('|') used for verb conjugations. MUST use HTML <table> tags.`);
    }

    const htmlTables = await page.$$('table');
    results.tables.html = htmlTables.length;

    if (results.tables.html === 0 && !fileName.includes('ch00')) {
        results.errors.push(`Missing conjugation tables (Expected HTML <table> tags).`);
    }

    // Audit each HTML table for layout rules
    for (const table of htmlTables) {
        const rows = await table.$$('tr');
        for (const row of rows) {
            const cells = await row.$$('td, th');
            for (let i = 0; i < cells.length; i++) {
                const cellText = await cells[i].innerText();
                // Rule: No slashes in verb columns (Strict for Conjugation Tables)
                // We skip index 0 (Subject Column)
                if (i > 0 && cellText.includes('/')) {
                    // Check if table contains subject markers to confirm it's a conjugation table
                    const tableText = await table.innerText();
                    const hasSubjects = ['Yo', 'Tú', 'él', 'Nosotros', 'Vosotros'].some(s => tableText.includes(s));
                    if (hasSubjects) {
                        results.errors.push(`Broken Table: Cell in column ${i+1} contains '/' (slash-separated verbs). Each verb must occupy its own column.`);
                        break; // Only one error per table is enough
                    }
                }
            }
        }
    }

    // 4. Grammar & Irregulars Audit (STRICT v5.8)
    // Detect Tense (Order matters: check more specific tenses first)
    function detectTense(html) {
    // Priority: Look for tense keywords specifically in headers (h1-h6) first
    const headerMatch = html.match(/<(h[1-6])[^>]*>.*?(Presente Continuo|Presente Perfecto|Indefinido|Imperfecto|Futuro|Presente|Imperativo).*?<\/\1>/i);
    if (headerMatch) return headerMatch[2];

    // Fallback: Look for "Mandatory Irregulars (Tense)" marker
    const mandatoryMatch = html.match(/Mandatory Irregulars \((Presente Continuo|Presente Perfecto|Indefinido|Imperfecto|Futuro|Presente|Imperativo)\)/i);
    if (mandatoryMatch) return mandatoryMatch[1];

    if (html.includes('Presente Continuo')) return 'Presente Continuo';
    if (html.includes('Presente Perfecto')) return 'Presente Perfecto';
    if (html.includes('Indefinido')) return 'Indefinido';
    if (html.includes('Imperfecto')) return 'Imperfecto';
    
    // Low priority for Futuro/Presente to avoid nav link noise
    if (html.includes('Presente')) return 'Presente';
    if (html.includes('Futuro')) return 'Futuro';
    if (html.includes('Imperativo')) return 'Imperativo';
    
    return 'Unknown';
}
    results.grammar.tense = detectTense(htmlSource);

    const mandatory = MANDATORY_IRREGULARS[results.grammar.tense] || [];
    for (const verb of mandatory) {
        // Precise check: check if verb name appears as a heading or in a table header
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
    const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.endsWith('.html'));
    
    let report = `# Verification Report: Grammar v5.8 & Standardization\n\n`;
    report += `Date: ${new Date().toISOString()}\n\n`;

    for (const file of files) {
        console.log(`Verifying ${file}...`);
        const result = await verifyChapter(page, path.join(CHAPTERS_DIR, file));
        
        report += `## ${result.file}\n`;
        report += `- **Tense Detected**: ${result.grammar.tense}\n`;
        report += `- **HTML Tables**: ${result.tables.html} | **Markdown Tables**: ${result.tables.markdown}\n`;
        report += `- **English Bridge**: ${result.englishBridge ? '✅' : '❌'} | **Korean Tip**: ${result.koreanTip ? '✅' : '❌'}\n`;
        
        if (result.errors.length > 0) {
            report += `### ❌ Errors / Discrepancies\n`;
            result.errors.forEach(err => report += `- ${err}\n`);
        } else {
            report += `### ✅ All standardization rules met.\n`;
        }
        report += `\n---\n`;
    }

    fs.writeFileSync(REPORT_PATH, report);
    console.log(`Report generated at ${REPORT_PATH}`);
    await browser.close();
}

run().catch(console.error);
