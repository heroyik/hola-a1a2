import os
import glob
import re
import subprocess

PROJECT_ROOT = "/Users/ikyoon/proj/book"
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "output")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "a1_textbook.html")
COVER_IMG = "../bookcovers/bookcover2a1.png"

os.makedirs(OUTPUT_DIR, exist_ok=True)

CSS = """
<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
    :root {
        --spanish-red: #A93226;
        --spanish-gold: #D4AC0D;
        --soft-charcoal: #2C3E50;
        --off-white: #FCF9F2;
    }
    body {
        font-family: 'Montserrat', sans-serif;
        background-color: var(--off-white);
        color: var(--soft-charcoal);
        margin: 0;
        padding: 0;
        line-height: 1.6;
    }
    .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 60px 40px;
        background-color: #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    h1, h2, h3 {
        color: var(--spanish-red);
        font-family: 'Montserrat', sans-serif;
    }
    h1 {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 3px solid var(--spanish-gold);
    }
    h2 {
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
        margin-top: 40px;
    }
    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin: 20px 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    th, td {
        padding: 12px 15px;
        text-align: left;
    }
    thead th {
        background: linear-gradient(135deg, var(--spanish-red), #8B0000);
        color: white;
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
    }
    tbody tr:nth-child(even) {
        background-color: #f8f9fa;
    }
    tbody tr:nth-child(odd) {
        background-color: #ffffff;
    }
    tbody tr:hover {
        background-color: #f1f1f1;
        box-shadow: inset 2px 0 0 var(--spanish-gold);
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .cover-image {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto 60px auto;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    a {
        color: var(--spanish-red);
        text-decoration: none;
        font-weight: 600;
    }
    a:hover {
        text-decoration: underline;
    }
    blockquote {
        margin: 20px 0;
        padding: 15px 20px;
        background-color: #fdfaf6;
        border-left: 5px solid var(--spanish-gold);
        font-style: italic;
    }
    .chapter-break {
        page-break-before: always;
        border-top: 5px solid var(--spanish-red);
    }
    @media print {
        body { background-color: white; }
        .container { box-shadow: none; max-width: 100%; padding: 0; }
        table { box-shadow: none; border: 1px solid #ddd; }
        thead th { background: #eee !important; color: black !important; }
        .cover-image { page-break-after: always; }
        .chapter-break { page-break-before: always; border-top: none; }
        h1 { page-break-before: always; }
    }
    .grammar-section ul {
        list-style-type: none;
        padding-left: 20px;
    }
    .grammar-section li {
        margin-bottom: 8px;
    }
</style>
"""

html_content = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hola-AL Nivel A1</title>
    {CSS}
</head>
<body>
<div class="container">
    <img src="{COVER_IMG}" alt="Cover A1" class="cover-image">
"""

# Read TOC and add hyperlinks
with open(os.path.join(PROJECT_ROOT, "chapters", "00_toc_a1.md"), "r") as f:
    toc_md = f.read()

# Replace chapter names with anchor links to chapter headings
def replace_chapter_links(match):
    chapter_full_text = match.group(1)
    chapter_num = match.group(2)
    return f"**[{chapter_full_text}](#chapter-{chapter_num})**"

toc_hyperlinked = re.sub(r"\*\*(Chapter (\d+): [^\*]+)\*\*", replace_chapter_links, toc_md)

def process_md(md_text):
    result = subprocess.run(['npx', '-y', 'marked'], input=md_text.encode('utf-8'), stdout=subprocess.PIPE)
    return result.stdout.decode('utf-8')

html_content += "<div class='toc-section'>"
html_content += process_md(toc_hyperlinked)
html_content += "</div>"

# Process grammar analysis
grammar_md_path = os.path.join(PROJECT_ROOT, "chapters", "01_grammar_analysis_a1.md")
with open(grammar_md_path, "r") as f:
    grammar_md = f.read()

ch_anchors = {}

def slugify(text):
    # Keep alphanumeric characters including non-Latin ones
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

def hyperlink_grammar(md_text):
    global ch_anchors
    # Split by Chapter header to associate bold items with the correct chapter
    sections = re.split(r'(### Chapter (\d+): [^\n]+)', md_text)
    if len(sections) < 4:
        return md_text
        
    new_md = sections[0]
    for i in range(1, len(sections), 3):
        header = sections[i]
        ch_num = int(sections[i+1])
        content = sections[i+2]
        
        # Link the header itself
        clean_header = header.replace('### ', '')
        linked_header = f"### [{clean_header}](#chapter-{ch_num})"
        
        if ch_num not in ch_anchors:
            ch_anchors[ch_num] = []

        def replace_bold(match):
            full_text = match.group(1)
            inner_text = match.group(2)
            slug = slugify(inner_text)
            ch_anchors[ch_num].append((inner_text, slug))
            return f"[{full_text}](#ch{ch_num}-{slug})"
        
        # Link all bold items within this chapter's content
        linked_content = re.sub(r'(\*\*([^*]+)\*\*)', replace_bold, content)
        new_md += linked_header + linked_content
    return new_md

# Read and process grammar analysis
grammar_md = ""
with open(os.path.join(PROJECT_ROOT, "chapters", "01_grammar_analysis_a1.md"), 'r') as f:
    grammar_md = f.read()

grammar_hyperlinked = hyperlink_grammar(grammar_md)
html_content += "<div class='grammar-section'>"
html_content += process_md(grammar_hyperlinked)
html_content += "</div>"

# Process Chapters 1-15
chapter_files = sorted(glob.glob(os.path.join(PROJECT_ROOT, "chapters", "ch*_a1_*.md")))

for ch_file in chapter_files:
    basename = os.path.basename(ch_file)
    # Extract chapter number specifically, assuming ch01 etc.
    ch_num_match = re.search(r"ch(\d+)_", basename)
    if ch_num_match:
        ch_num = int(ch_num_match.group(1)) # 01 -> 1
    else:
        continue
        
    with open(ch_file, "r") as f:
        ch_md = f.read()
    
    # Add granular anchors for bolded items
    if ch_num in ch_anchors:
        for text, slug in ch_anchors[ch_num]:
            # Pattern to match headings (h1-h6) followed by the exact text
            pattern = rf'^(#{{1,6}})\s+{re.escape(text)}'
            # Insert a div with the slug ID before the heading, with extra newlines for markdown rendering
            ch_md = re.sub(pattern, rf'\n<div id="ch{ch_num}-{slug}"></div>\n\n\1 {text}', ch_md, flags=re.MULTILINE)

    # Inject anchor at the start of the chapter
    # the chapter markdowns start with "# Chapter..." or similarly. We prefix it with an anchor div.
    html_content += f"<div id='chapter-{ch_num}' class='chapter-break'></div>\n"
    html_content += process_md(ch_md)

html_content += """
</div>
</body>
</html>
"""

with open(OUTPUT_FILE, "w") as f:
    f.write(html_content)

print(f"Generated {OUTPUT_FILE} successfully.")
