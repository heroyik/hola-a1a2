const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true
});

const SOURCE_DIR = path.join(__dirname, '../chapters');
const OUTPUT_DIR = path.join(__dirname, '../output');

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
    font-family: 'Inter', 'Noto Sans KR', sans-serif;
    font-size: 10.5pt;
    line-height: 1.8;
    color: var(--text-main);
    background-color: var(--bg-warm);
    margin: 0;
    padding: 0;
}

.container {
    max-width: 900px;
    margin: 40pt auto;
    padding: 50pt 70pt;
    background-color: var(--bg-white);
    border-radius: 15pt;
    box-shadow: var(--shadow-premium);
}

h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 34pt;
    font-weight: 700;
    color: var(--spanish-red);
    margin: 20pt 0 15pt 0;
    padding-bottom: 25pt;
    border-bottom: 5pt solid var(--spanish-ochre);
}

h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 19pt;
    font-weight: 700;
    color: var(--spanish-red);
    margin: 40pt 0 15pt 0;
    padding-bottom: 8pt;
    border-bottom: 2px solid var(--border-color);
}

h2::before {
    content: " ";
    display: inline-block;
    width: 12pt;
    height: 12pt;
    background-color: var(--spanish-ochre);
    margin-right: 12pt;
    border-radius: 2pt;
}

blockquote {
    background: var(--bg-white);
    border-left: 5pt solid var(--spanish-red);
    padding: 15pt 20pt;
    margin: 20pt 0;
    border-radius: 10pt;
    box-shadow: var(--shadow-soft);
}

.admonition-tip { background: #EBF5FB; border-left: 6pt solid #3498DB; padding: 15pt 20pt; margin: 20pt 0; border-radius: 10pt; }
.admonition-important { background: var(--spanish-ochre-light); border-left: 6pt solid var(--spanish-ochre); padding: 15pt 20pt; margin: 20pt 0; border-radius: 10pt; }
.admonition-warning { background: var(--spanish-red-light); border-left: 6pt solid var(--spanish-red); padding: 15pt 20pt; margin: 20pt 0; border-radius: 10pt; }

table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 20pt 0; border: 1px solid var(--border-color); border-radius: 10pt; overflow: hidden; background: white; box-shadow: var(--shadow-soft); }
thead { background: linear-gradient(135deg, var(--spanish-red) 0%, #8E281F 100%); color: white; }
th { padding: 12pt 15pt; text-align: left; font-family: 'Montserrat', sans-serif; font-size: 8.5pt; text-transform: uppercase; }
td { padding: 10pt 15pt; border-bottom: 1px solid var(--border-color); }
tr:nth-child(even) { background-color: var(--bg-warm); }
tr:last-child td { border-bottom: none; }
strong { font-weight: bold; color: var(--spanish-red); }
`;

function convertAlerts(html) {
    const alertMap = { TIP: 'tip', NOTE: 'tip', IMPORTANT: 'important', WARNING: 'warning', CAUTION: 'warning' };
    Object.keys(alertMap).forEach(key => {
        const regex = new RegExp(`<blockquote>\\s*<p>\\[!${key}\\]\\s*([\\s\\S]*?)<\\/p>\\s*<\\/blockquote>`, 'g');
        html = html.replace(regex, `<div class="admonition-${alertMap[key]}"><strong>💡 ${key.toLowerCase()}</strong><br/>$1</div>`);
    });
    return html;
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));

files.forEach(file => {
    const mdContent = fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8');
    let htmlBody = md.render(mdContent);
    htmlBody = convertAlerts(htmlBody);

    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${file}</title>
    <style>${PREMIUM_CSS}</style>
</head>
<body>
    <div class="container">${htmlBody}</div>
</body>
</html>`;

    fs.writeFileSync(path.join(OUTPUT_DIR, file.replace('.md', '.html')), fullHtml);
    console.log(`Rendered ${file}`);
});
