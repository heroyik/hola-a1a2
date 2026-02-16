#!/usr/bin/env python3
"""
Hola-AL Chapter 1 A1 — PDF Textbook Generator
WeasyPrint + Markdown → Professional PDF
"""

import markdown
from weasyprint import HTML
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHAPTER_MD = os.path.join(PROJECT_ROOT, "chapters", "ch01_a1_mi_cuerpo.md")
OUTPUT_PDF = os.path.join(PROJECT_ROOT, "output", "ch01_a1_mi_cuerpo.pdf")
OUTPUT_HTML = os.path.join(PROJECT_ROOT, "output", "ch01_a1_mi_cuerpo.html")

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

@page {
    size: A4;
    margin: 2.2cm 2cm 2.5cm 2cm;
    @top-center {
        content: "Hola-AL  ·  Chapter 1: Mi cuerpo y salud";
        font-family: 'Inter', sans-serif;
        font-size: 8pt;
        color: #999;
        border-bottom: 0.5pt solid #ddd;
        padding-bottom: 4pt;
    }
    @bottom-center {
        content: counter(page);
        font-family: 'Inter', sans-serif;
        font-size: 9pt;
        color: #666;
    }
}

@page :first {
    @top-center { content: none; }
}

:root {
    --primary: #1a5276;
    --primary-light: #2980b9;
    --accent: #e74c3c;
    --accent-warm: #f39c12;
    --bg-light: #f8f9fa;
    --bg-blue: #eaf2f8;
    --bg-green: #eafaf1;
    --bg-yellow: #fef9e7;
    --bg-red: #fdedec;
    --text: #2c3e50;
    --text-light: #7f8c8d;
    --border: #dbe2e8;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Noto Sans KR', 'Inter', sans-serif;
    font-size: 10pt;
    line-height: 1.7;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
}

/* ─── CHAPTER TITLE ─── */
h1 {
    font-family: 'Inter', 'Noto Sans KR', sans-serif;
    font-size: 28pt;
    font-weight: 700;
    color: var(--primary);
    text-align: center;
    margin: 0 0 8pt 0;
    padding: 20pt 0 12pt 0;
    border-bottom: 3pt solid var(--primary);
    page-break-before: avoid;
}

/* ─── SECTION HEADINGS ─── */
h2 {
    font-family: 'Inter', 'Noto Sans KR', sans-serif;
    font-size: 16pt;
    font-weight: 700;
    color: white;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    padding: 8pt 14pt;
    margin: 18pt 0 10pt 0;
    border-radius: 6pt;
    page-break-before: always;
    page-break-after: avoid;
}

/* First section: no page break before */
h1 + hr + h2,
h1 + h2,
h2.first-section {
    page-break-before: avoid;
}

h3 {
    font-family: 'Inter', 'Noto Sans KR', sans-serif;
    font-size: 12pt;
    font-weight: 600;
    color: var(--primary);
    margin: 14pt 0 6pt 0;
    padding-bottom: 3pt;
    border-bottom: 1.5pt solid var(--primary-light);
    page-break-after: avoid;
}

h4 {
    font-size: 10.5pt;
    font-weight: 600;
    color: var(--primary-light);
    margin: 10pt 0 4pt 0;
}

/* ─── BLOCKQUOTES (openers, notes) ─── */
blockquote {
    background: var(--bg-blue);
    border-left: 4pt solid var(--primary-light);
    padding: 10pt 14pt;
    margin: 8pt 0;
    border-radius: 0 6pt 6pt 0;
    font-size: 9.5pt;
}

blockquote blockquote {
    background: var(--bg-green);
    border-left-color: #27ae60;
}

/* ─── TABLES ─── */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 8pt 0 12pt 0;
    font-size: 9pt;
    page-break-inside: avoid;
}

thead {
    background: var(--primary);
    color: white;
}

th {
    padding: 6pt 8pt;
    text-align: left;
    font-weight: 600;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
}

td {
    padding: 5pt 8pt;
    border-bottom: 0.5pt solid var(--border);
    vertical-align: top;
}

tr:nth-child(even) {
    background: var(--bg-light);
}

tr:hover {
    background: var(--bg-blue);
}

/* Vocabulary tables — highlight cognates */
td strong {
    color: var(--primary);
}

td em {
    color: var(--text-light);
    font-size: 8.5pt;
}

/* ─── CODE BLOCKS (patterns, examples) ─── */
pre {
    background: #1e1e2e;
    color: #cdd6f4;
    padding: 12pt 14pt;
    border-radius: 6pt;
    margin: 8pt 0;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 9pt;
    line-height: 1.6;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    page-break-inside: avoid;
}

code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    background: var(--bg-light);
    padding: 1pt 4pt;
    border-radius: 3pt;
    font-size: 8.5pt;
    color: var(--accent);
}

pre code {
    background: none;
    padding: 0;
    color: inherit;
}

/* ─── LISTS ─── */
ul, ol {
    margin: 4pt 0 8pt 18pt;
}

li {
    margin-bottom: 3pt;
    line-height: 1.6;
}

/* Checklist items */
li:has(input[type="checkbox"]) {
    list-style: none;
    margin-left: -18pt;
}

/* ─── ALERTS (TIP, IMPORTANT, WARNING) ─── */
.admonition-tip {
    background: var(--bg-green);
    border-left: 4pt solid #27ae60;
    padding: 8pt 12pt;
    margin: 8pt 0;
    border-radius: 0 6pt 6pt 0;
}

.admonition-important {
    background: var(--bg-yellow);
    border-left: 4pt solid var(--accent-warm);
    padding: 8pt 12pt;
    margin: 8pt 0;
    border-radius: 0 6pt 6pt 0;
}

.admonition-warning {
    background: var(--bg-red);
    border-left: 4pt solid var(--accent);
    padding: 8pt 12pt;
    margin: 8pt 0;
    border-radius: 0 6pt 6pt 0;
}

/* ─── HORIZONTAL RULES (section separators) ─── */
hr {
    border: none;
    border-top: 0;
    margin: 0;
    height: 0;
    visibility: hidden;
}

/* ─── PARAGRAPHS ─── */
p {
    margin: 4pt 0 8pt 0;
}

/* ─── EMOJI SIZING ─── */
p, td, li {
    line-height: 1.7;
}

/* ─── COVER PAGE STYLE (first blockquote) ─── */
body > blockquote:first-of-type {
    background: var(--bg-light);
    border-left: 4pt solid var(--primary);
    font-size: 9pt;
    color: var(--text-light);
}

/* ─── PRACTICE SECTION ─── */
h3:has(+ table),
h3:has(+ ol) {
    color: var(--accent);
    border-bottom-color: var(--accent);
}

/* ─── PRINT OPTIMIZATIONS ─── */
h1, h2, h3, h4 {
    page-break-after: avoid;
}

table, pre, blockquote {
    page-break-inside: avoid;
}

img {
    max-width: 100%;
}
"""


def convert_alerts(html_content: str) -> str:
    """Convert GitHub-style alerts to styled divs."""
    import re

    alert_map = {
        "TIP": "tip",
        "NOTE": "tip",
        "IMPORTANT": "important",
        "WARNING": "warning",
        "CAUTION": "warning",
    }

    for gh_type, css_class in alert_map.items():
        pattern = (
            r'<blockquote>\s*<p>\[!' + gh_type + r'\]\s*'
            r'(.*?)</p>\s*</blockquote>'
        )
        replacement = (
            f'<div class="admonition-{css_class}">'
            r'<strong>💡 ' + gh_type.title() + r'</strong><br/>\1</div>'
        )
        html_content = re.sub(pattern, replacement, html_content, flags=re.DOTALL)

    return html_content


def build_html(md_content: str) -> str:
    """Convert Markdown to styled HTML."""
    extensions = ["tables", "fenced_code", "codehilite", "toc", "nl2br"]
    html_body = markdown.markdown(md_content, extensions=extensions)
    html_body = convert_alerts(html_body)

    # Mark the first h2 to avoid page-break-before
    html_body = html_body.replace('<h2>', '<h2 class="first-section">', 1)

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"/>
    <title>Hola-AL · Chapter 1: Mi cuerpo y salud (A1)</title>
    <style>{CSS}</style>
</head>
<body>
{html_body}
</body>
</html>"""


def main():
    os.makedirs(os.path.dirname(OUTPUT_PDF), exist_ok=True)

    print("📖 Reading markdown…")
    with open(CHAPTER_MD, encoding="utf-8") as f:
        md_content = f.read()

    print("🎨 Building styled HTML…")
    html_content = build_html(md_content)

    # Save HTML for preview
    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"   ✅ HTML saved: {OUTPUT_HTML}")

    print("📄 Generating PDF (WeasyPrint)…")
    HTML(string=html_content).write_pdf(OUTPUT_PDF)
    
    file_size = os.path.getsize(OUTPUT_PDF)
    print(f"   ✅ PDF saved: {OUTPUT_PDF}")
    print(f"   📏 Size: {file_size / 1024:.0f} KB")
    print("🎉 Done!")


if __name__ == "__main__":
    main()
