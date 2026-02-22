import os
import glob
import markdown
import re

def build_a1_book():
    base_dir = "/Users/ikyoon/proj/book/chapters"
    output_file = "/Users/ikyoon/proj/book/output/book_a1.html"
    
    # html boilerplate
    html_content = """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spanish Textbook A1</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #2c3e50; }
        h1 { border-bottom: 2px solid #2c3e50; padding-bottom: 10px; }
        .cover { text-align: center; margin-bottom: 50px; }
        .cover img { max-width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .page-break { page-break-after: always; margin-top: 50px; border-top: 1px solid #eee; padding-top: 50px; }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 16px; font-style: italic; }
        code { background-color: #f8f9fa; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
        pre { background-color: #f8f9fa; padding: 16px; border-radius: 4px; overflow-x: auto; }
        img { max-width: 100%; height: auto; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="cover">
        <img src="../bookcovers/bookcover2a1.png" alt="Book Cover A1">
    </div>
    <div class="page-break"></div>
"""

    # TOC
    with open(f"{base_dir}/00_toc_a1.md", "r") as f:
        toc_md = f.read()

    def add_toc_links(match):
        ch_num = match.group(1)
        return f"[**Chapter {ch_num}:**](#chapter-{int(ch_num)})"
    toc_md = re.sub(r"\*\*Chapter (\d+):\*\*", add_toc_links, toc_md)
    html_content += markdown.markdown(toc_md, extensions=["tables"])
    html_content += "\n<div class='page-break'></div>\n"
    
    # Grammar Analysis
    with open(f"{base_dir}/01_grammar_analysis_a1.md", "r") as f:
        grammar_md = f.read()
    html_content += markdown.markdown(grammar_md, extensions=["tables"])
    html_content += "\n<div class='page-break'></div>\n"
    
    # Chapters
    chapter_files = sorted(glob.glob(f"{base_dir}/ch*_a1_*.md"))
    for f in chapter_files:
        basename = os.path.basename(f)
        ch_num = re.search(r"ch(\d+)_", basename).group(1)
        with open(f, "r") as cf:
            ch_md = cf.read()
            
        html_content += f"<a id='chapter-{int(ch_num)}'></a>\n"
        html_content += markdown.markdown(ch_md, extensions=["tables", "fenced_code"])
        html_content += "\n<div class='page-break'></div>\n"
        
    html_content += "\n</body>\n</html>"

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w") as f:
        f.write(html_content)
    print(f"Generated {output_file} successfully.")

build_a1_book()
