import os
from weasyprint import HTML, CSS

def export_pdf(html_path, pdf_path):
    print(f"📖 Reading {html_path}...")
    
    # Define A4 size and default margins in a minimal CSS object
    # The user asked for "A4 size" and "default margins".
    # We'll use 2cm for margins as a sensible default.
    extra_css = CSS(string="@page { size: A4; margin: 2cm; }")
    
    html = HTML(filename=html_path)
    print(f"📄 Generating PDF: {pdf_path}...")
    html.write_pdf(pdf_path, stylesheets=[extra_css])
    
    file_size = os.path.getsize(pdf_path)
    print(f"   ✅ PDF saved: {pdf_path}")
    print(f"   📏 Size: {file_size / 1024:.0f} KB")

if __name__ == "__main__":
    PROJECT_ROOT = "/Users/ikyoon/proj/book"
    OUTPUT_DIR = os.path.join(PROJECT_ROOT, "output")
    
    files = [
        ("a1_textbook.html", "a1_textbook.pdf"),
        ("a2_textbook.html", "a2_textbook.pdf")
    ]
    
    for html_name, pdf_name in files:
        html_path = os.path.join(OUTPUT_DIR, html_name)
        pdf_path = os.path.join(OUTPUT_DIR, pdf_name)
        
        if os.path.exists(html_path):
            export_pdf(html_path, pdf_path)
        else:
            print(f"❌ Error: {html_path} not found.")

print("🎉 All textbooks exported to PDF!")
