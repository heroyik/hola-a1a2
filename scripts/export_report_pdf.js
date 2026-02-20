const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const md = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true
});

const PREMIUM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

:root {
    --spanish-red: #A93226;
    --spanish-red-light: #FDEDEC;
    --spanish-ochre: #D4AC0D;
    --spanish-ochre-light: #FEF9E7;
    --spanish-olive: #1D8348;
    --slate-grey: #2C3E50;
    --bg-warm: #FCF9F2;
    --bg-white: #FFFFFF;
    --text-main: #34495E;
    --text-light: #7F8C8D;
    --border-color: #E5E7E9;
    --shadow-soft: 0 4px 6px rgba(0,0,0,0.02);
    --shadow-premium: 0 10px 30px rgba(0,0,0,0.05);
}

body {
    font-family: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.6;
    color: var(--text-main);
    background-color: var(--bg-white);
    margin: 0;
    padding: 0;
}

.container {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    background-color: var(--bg-white);
    box-shadow: none;
}

h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 24pt;
    font-weight: 700;
    color: var(--spanish-red);
    margin-bottom: 20pt;
    padding-bottom: 10pt;
    border-bottom: 4pt solid var(--spanish-ochre);
}

h2 {
    page-break-before: always;
    font-family: 'Montserrat', sans-serif;
    font-size: 18pt;
    font-weight: 700;
    color: var(--spanish-red);
    margin: 30pt 0 10pt 0;
    padding-bottom: 5pt;
    border-bottom: 2px solid var(--border-color);
}

h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 12pt;
    font-weight: 600;
    color: var(--slate-grey);
    margin: 15pt 0 5pt 0;
}

table { 
    width: 100%; 
    border-collapse: collapse; 
    margin: 10pt 0; 
    border: 1px solid var(--border-color); 
    background: white;
    page-break-inside: auto;
}
tr { page-break-inside: avoid; page-break-after: auto; }
thead { background-color: var(--spanish-red); color: white; display: table-header-group; }
th { padding: 6pt 10pt; text-align: left; font-family: 'Montserrat', sans-serif; font-size: 8pt; text-transform: uppercase; border: 1px solid #8E281F; }
td { padding: 5pt 10pt; border: 1px solid var(--border-color); font-size: 9pt; }
tr:nth-child(even) { background-color: var(--bg-warm); }
strong { font-weight: bold; color: var(--spanish-red); }

@media print {
    h2 { page-break-before: always; }
    .container { box-shadow: none; border-radius: 0; }
}
`;

async function convert(mdPath, pdfPath) {
    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const htmlBody = md.render(mdContent);
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>${PREMIUM_CSS}</style>
</head>
<body>
    <div class="container">${htmlBody}</div>
</body>
</html>`;

    const htmlPath = mdPath.replace('.md', '.temp.html');
    fs.writeFileSync(htmlPath, fullHtml);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('file:///' + path.resolve(htmlPath).replace(/\\/g, '/'), { waitUntil: 'networkidle' });
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
    });

    await browser.close();
    fs.unlinkSync(htmlPath);
    console.log(`Successfully generated: ${pdfPath}`);
}

const input = path.join(__dirname, '../output/verification_report.md');
const output = path.join(__dirname, '../output/verification_report.pdf');

convert(input, output).catch(console.error);
