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
        letter-spacing: 1pt;
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
    --spanish-ochre: #D4AC0D;
    --spanish-olive: #1D8348;
    --slate-grey: #2C3E50;
    --bg-warm: #FCF9F2;
    --text-main: #34495E;
    --text-light: #7F8C8D;
    --border-color: #E5E7E9;
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
    background-color: white;
    -webkit-font-smoothing: antialiased;
}

/* ─── CHAPTER TITLE ─── */
h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 32pt;
    font-weight: 700;
    color: var(--spanish-red);
    text-align: left;
    margin: 30pt 0 10pt 0;
    padding-bottom: 20pt;
    border-bottom: 4pt solid var(--spanish-ochre);
    text-transform: uppercase;
    letter-spacing: -0.5pt;
}

/* ─── SECTION HEADINGS ─── */
h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 18pt;
    font-weight: 700;
    color: var(--spanish-red);
    margin: 30pt 0 12pt 0;
    padding-bottom: 5pt;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
}

h2::before {
    content: "●";
    color: var(--spanish-ochre);
    margin-right: 10pt;
    font-size: 14pt;
}

h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 13pt;
    font-weight: 600;
    color: var(--slate-grey);
    margin: 20pt 0 8pt 0;
    background-color: var(--bg-warm);
    padding: 5pt 10pt;
    border-radius: 4pt;
    border-left: 3pt solid var(--spanish-olive);
}

h4 {
    font-size: 11pt;
    font-weight: 600;
    color: var(--spanish-olive);
    margin: 15pt 0 5pt 0;
}

/* ─── BLOCKQUOTES ─── */
blockquote {
    background: var(--bg-warm);
    border-left: 4pt solid var(--spanish-ochre);
    padding: 15pt 20pt;
    margin: 15pt 0;
    border-radius: 8pt;
    font-style: italic;
    color: var(--slate-grey);
}

/* ─── TABLES ─── */
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 15pt 0 20pt 0;
    font-size: 9.5pt;
    border: 1px solid var(--border-color);
    border-radius: 8pt;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    page-break-inside: avoid;
    display: table; /* Ensure block-level behavior for break avoidance */
}

thead {
    background-color: var(--spanish-red);
    color: white;
}

th {
    padding: 10pt 12pt;
    text-align: left;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1pt;
    font-size: 8pt;
}

td {
    padding: 8pt 12pt;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
}

tr:last-child td {
    border-bottom: none;
}

tr:nth-child(even) {
    background-color: #FAFAFA;
}

/* ─── ADMONITIONS ─── */
.admonition-tip {
    background: #EBF5FB;
    border-left: 5pt solid #3498DB;
    padding: 12pt 16pt;
    margin: 15pt 0;
    border-radius: 8pt;
}

.admonition-important {
    background: #FEF9E7;
    border-left: 5pt solid var(--spanish-ochre);
    padding: 12pt 16pt;
    margin: 15pt 0;
    border-radius: 8pt;
}

.admonition-warning {
    background: #FDEDEC;
    border-left: 5pt solid var(--spanish-red);
    padding: 12pt 16pt;
    margin: 15pt 0;
    border-radius: 8pt;
}

/* ─── IMAGES ─── */
img {
    max-width: 100%;
    height: auto;
    border-radius: 12pt;
    margin: 20pt 0;
    display: block;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* ─── HR ─── */
hr {
    border: none;
    border-top: 2pt solid var(--border-color);
    margin: 30pt 100pt;
    opacity: 0.3;
}

/* ─── LISTS ─── */
ul, ol {
    margin: 10pt 0 15pt 25pt;
}

li {
    margin-bottom: 5pt;
}

/* ─── LINKS ─── */
a {
    color: var(--spanish-red);
    text-decoration: none;
    border-bottom: 1px dashed var(--spanish-red);
}
p {
    margin: 6pt 0 10pt 0;
}

/* ─── EMOJI SIZING ─── */
p, td, li {
    line-height: 1.8;
}

/* ─── PRACTICE SECTION ─── */
h3:has(+ table),
h3:has(+ ol) {
    color: var(--spanish-red);
    border-left-color: var(--spanish-ochre);
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
