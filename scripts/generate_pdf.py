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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

@page {
    size: A4;
    margin: 2.5cm 2cm 2.5cm 2cm;
    @top-center {
        content: "Hola-AL · Premium Spanish Learning";
        font-family: 'Montserrat', sans-serif;
        font-size: 7.5pt;
        color: #b0b0b0;
        text-transform: uppercase;
        letter-spacing: 1.5pt;
    }
    @bottom-center {
        content: counter(page);
        font-family: 'Montserrat', sans-serif;
        font-size: 9pt;
        color: #A93226;
        font-weight: 600;
    }
}

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

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Inter', 'Noto Sans KR', sans-serif;
    font-size: 10.5pt;
    line-height: 1.8;
    color: var(--text-main);
    background-color: var(--bg-warm);
    -webkit-font-smoothing: antialiased;
}

/* ─── CHAPTER TITLE ─── */
h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 34pt;
    font-weight: 700;
    color: var(--spanish-red);
    text-align: left;
    margin: 40pt 0 15pt 0;
    padding-bottom: 25pt;
    border-bottom: 5pt solid var(--spanish-ochre);
    text-transform: uppercase;
    letter-spacing: -1pt;
}

/* ─── SECTION HEADINGS ─── */
h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 19pt;
    font-weight: 700;
    color: var(--spanish-red);
    margin: 40pt 0 15pt 0;
    padding-bottom: 8pt;
    border-bottom: 2px solid var(--border-color);
    display: flex;
    align-items: center;
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

h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 14pt;
    font-weight: 600;
    color: var(--slate-grey);
    margin: 25pt 0 10pt 0;
    background-color: var(--spanish-ochre-light);
    padding: 6pt 12pt;
    border-radius: 5pt;
    border-left: 4pt solid var(--spanish-ochre);
}

h4 {
    font-size: 11pt;
    font-weight: 600;
    color: var(--spanish-olive);
    margin: 20pt 0 8pt 0;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
}

/* ─── BLOCKQUOTES ─── */
blockquote {
    background: var(--bg-white);
    border-left: 5pt solid var(--spanish-red);
    padding: 20pt 25pt;
    margin: 20pt 0;
    border-radius: 10pt;
    box-shadow: var(--shadow-soft);
    font-style: italic;
    color: var(--slate-grey);
    position: relative;
}

/* ─── TABLES (HIGH-END DESIGN) ─── */
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 20pt 0 25pt 0;
    font-size: 9.5pt;
    border: 1px solid var(--border-color);
    border-radius: 10pt;
    overflow: hidden;
    box-shadow: var(--shadow-premium);
    background-color: var(--bg-white);
    page-break-inside: avoid;
}

thead {
    background: linear-gradient(135deg, var(--spanish-red) 0%, #8E281F 100%);
    color: white;
}

th {
    padding: 12pt 15pt;
    text-align: left;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.2pt;
    font-size: 8.5pt;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

td {
    padding: 10pt 15pt;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
    transition: background-color 0.2s ease;
}

tr:last-child td {
    border-bottom: none;
}

tr:nth-child(even) {
    background-color: #FDFDFD;
}

tr:hover td {
    background-color: var(--spanish-ochre-light);
}

/* ─── BORDERLESS TABLES (for Matching Exercises) ─── */
table.borderless {
    border: none;
    box-shadow: none;
    border-radius: 0;
    margin: 10pt 0;
    background-color: transparent !important;
}

table.borderless td {
    border: none !important;
    padding: 5pt 15pt 5pt 0;
    background-color: transparent !important;
}

table.borderless tr:nth-child(even) {
    background-color: transparent !important;
}

/* ─── LEGENDS & CAPTIONS ─── */
.table-legend {
    font-size: 8.5pt;
    color: var(--text-light);
    display: block;
    margin-top: 8pt;
    margin-bottom: 20pt;
    text-align: left;
    font-style: italic;
}

em {
    font-style: italic;
    color: var(--spanish-red);
    font-weight: 500;
}

/* ─── ADMONITIONS ─── */
.admonition-tip {
    background: #EBF5FB;
    border-left: 6pt solid #3498DB;
    padding: 15pt 20pt;
    margin: 20pt 0;
    border-radius: 10pt;
    box-shadow: var(--shadow-soft);
}

.admonition-important {
    background: var(--spanish-ochre-light);
    border-left: 6pt solid var(--spanish-ochre);
    padding: 15pt 20pt;
    margin: 20pt 0;
    border-radius: 10pt;
    box-shadow: var(--shadow-soft);
}

.admonition-warning {
    background: var(--spanish-red-light);
    border-left: 6pt solid var(--spanish-red);
    padding: 15pt 20pt;
    margin: 20pt 0;
    border-radius: 10pt;
    box-shadow: var(--shadow-soft);
}

/* ─── IMAGES ─── */
img {
    max-width: 100%;
    height: auto;
    border-radius: 15pt;
    margin: 25pt 0;
    display: block;
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
    border: 3pt solid var(--bg-white);
}

/* ─── HR ─── */
hr {
    border: none;
    border-top: 2pt solid var(--spanish-ochre);
    margin: 40pt 150pt;
    opacity: 0.2;
}

/* ─── LISTS ─── */
ul, ol {
    margin: 12pt 0 18pt 30pt;
}

li {
    margin-bottom: 8pt;
}

li strong {
    color: var(--slate-grey);
}

/* ─── LINKS ─── */
a {
    color: var(--spanish-red);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1.5pt solid var(--spanish-ochre-light);
    transition: all 0.2s ease;
}

a:hover {
    border-bottom-color: var(--spanish-red);
}

p {
    margin: 8pt 0 12pt 0;
}

/* ─── PRACTICE SECTION ─── */
h3:has(+ table),
h3:has(+ ol) {
    color: var(--spanish-red);
    border-left-color: var(--spanish-red);
}

/* ─── WEB READABILITY ─── */
.container {
    max-width: 900px;
    margin: 40pt auto;
    padding: 50pt 70pt;
    background-color: var(--bg-white);
    border-radius: 15pt;
    box-shadow: var(--shadow-premium);
}

.cervantes-ref {
    font-size: 10pt;
    color: var(--text-light);
    margin: 10pt 0 25pt 0;
    line-height: 1.6;
    font-weight: 400;
    font-style: italic;
    border-left: 2pt solid var(--border-color);
    padding-left: 10pt;
}

@media print {
    body {
        background-color: white;
    }
    .container {
        max-width: none;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border-radius: 0;
    }
    hr {
        margin: 40pt 100pt;
    }
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
    extensions = ["tables", "fenced_code", "codehilite", "toc", "nl2br", "attr_list"]
    html_body = markdown.markdown(md_content, extensions=extensions)
    html_body = convert_alerts(html_body)

    # Mark the first h2 to avoid page-break-before
    html_body = html_body.replace('<h2>', '<h2 class="first-section">', 1)

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"/>
    <title>Hola-AL · Chapter 1: Mi cuerpo 및 건강</title>
    <style>{CSS}</style>
</head>
<body>
<div class="container">
{html_body}
</div>
</body>
</html>"""


import sys
import argparse

def main():
    parser = argparse.ArgumentParser(description="Hola-AL PDF Generator")
    parser.add_argument("input", help="Path to the input Markdown file")
    parser.add_argument("output_pdf", help="Path to the output PDF file")
    parser.add_argument("--output-html", help="Path to the output HTML file (optional)")
    parser.add_argument("--title", help="Header title for the PDF", default="Hola-AL")
    args = parser.parse_args()

    input_md = os.path.abspath(args.input)
    output_pdf = os.path.abspath(args.output_pdf)
    output_html = os.path.abspath(args.output_html) if args.output_html else output_pdf.replace(".pdf", ".html")

    # Update CSS dynamically for the specific chapter title if needed
    current_css = CSS.replace('content: "Hola-AL  ·  Chapter 1: Mi cuerpo y salud";', f'content: "Hola-AL  ·  {args.title}";')

    os.makedirs(os.path.dirname(output_pdf), exist_ok=True)

    print(f"📖 Reading {input_md}…")
    with open(input_md, encoding="utf-8") as f:
        md_content = f.read()

    print("🎨 Building styled HTML…")
    html_content = build_html(md_content).replace("<style>{CSS}</style>", f"<style>{current_css}</style>")

    # Save HTML for preview
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"   ✅ HTML saved: {output_html}")

    print("📄 Generating PDF (WeasyPrint)…")
    HTML(string=html_content, base_url=os.path.dirname(input_md)).write_pdf(output_pdf)
    
    file_size = os.path.getsize(output_pdf)
    print(f"   ✅ PDF saved: {output_pdf}")
    print(f"   📏 Size: {file_size / 1024:.0f} KB")
    print("🎉 Done!")


if __name__ == "__main__":
    main()
