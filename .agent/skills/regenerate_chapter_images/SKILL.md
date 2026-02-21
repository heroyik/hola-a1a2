---
name: regenerate_chapter_images
description: Skill for systematically regenerating textbook chapter images (Vocab and Cultura) using the latest v2.0 image guidelines (Modern Anime Style, numbered labels, no AR effects).
---

# Chapter Image Regeneration Skill

This skill provides step-by-step instructions for regenerating images for Hola-AL textbook chapters to ensure they meet the latest design guidelines.

## 1. Updated Image Guidelines (v2.0)

- **Style**: High-quality, modern anime-style educational illustration. Warm, vibrant, premium aesthetic.
  - *Reference 1*: Makoto Shinkai works (Your Name, Weathering with You) - exceptional use of light and emotionally resonant, beautiful background art based on real places.
  - *Reference 2*: Violet Evergarden - extremely detailed and beautiful depiction of European-style backgrounds with an emotional atmosphere.
- **Subjects**: Bright, cheerful, and positive expressions.
- **Effects**: **Do NOT use any holographic, transparent, or digital screen effects.**
- **Lighting**: Golden hour or warm natural lighting.
- **Tag**: Always include the `[HOLA_STYLE_V2]` tag in the prompt.
- **Text**: Explicitly instruct "No text" in the prompt.

## 2. Vocabulary Images

For Section 2 (Vocabulario Esencial) images:

- **Labels**: Must have medium-sized, highly readable, solid, explicit numbered circular labels from 1 to N (matching the number of vocab items, usually 10 or 12).
- **Mapping**: The prompt must explicitly map each number to a specific visual element (e.g., "1: a cup of coffee, 2: bread").
- **Clarity**: Focus strictly on solid, visible, 1:1 mapping of numbers. No floating AR or sci-fi numbers.

## 3. Workflow / Step-by-Step Process

1. **Read Chapter Content**: Read the target chapter (e.g., `ch05_a1_a_comer.md`) to identify the vocabulary table items and the culture section topic.
2. **Draft Prompts**: Write comprehensive English prompts for the `generate_image` tool using the guidelines above. Be highly specific about the setting and the numbered items.
3. **Execute Generation**: Use the `generate_image` tool.
   - *Filename Convention*: `chXX_level_section_v10` (e.g., `ch05_a1_vocab_food_v10`).
   - *Error Handling*: The image API (`gemini-3-pro-image`) represents a shared resource. If you receive `503 Service Unavailable`, retry after a short delay. If you receive `429 Too Many Requests`, you have hit a hard quota. Notify the user of the cooldown period (usually 1.5 hours) and pause generation.
4. **Strict Verify Content Against Markdown**: Before proceeding, you MUST strictly compare the generated image against the actual text content of the chapter's markdown file.
   - **For Vocabulary**: Ensure the illustration accurately reflects all the vocabulary table items exactly as described. Check for any missing items or incorrect label mapping. If there are mismatches, refine the prompt and regenerate the image.
   - **For Cultura Viva**: You MUST read the text of Section 5 in the markdown file. Ensure the generated image accurately portrays the specific cultural topic, setting, and details described in the text (e.g., if the text describes a Health Center, the image must not show a greeting). Do not assume the topic based on filenames or previous contexts. If the image does not match the text, rewrite the prompt and regenerate it.
5. **Copy Images**: Use the terminal to copy the `.png` files from the artifact directory (`~/.gemini/antigravity/brain/...`) to the project's `images/` directory.
6. **Convert Formatting**: Run `for f in images/ch0X*.png; do sips -s format png "$f" --out "${f%.*}.png"; done` to ensure proper PNG encoding on Mac.
7. **Update Markdown**: Edit the chapter `.md` files to update the image links to the new `v10` filenames.
8. **Verify & Render**: Run the build scripts to generate the updated HTML and PDF files:

   ```bash
   source venv/bin/activate
   node scripts/render_chapters.cjs
   python scripts/generate_pdf.py chapters/ch0X_a1_filename.md output/ch0X_a1_filename.pdf --title "Chapter X: Title (A1)"
   ```

9. **Track Progress**: Check off the completed chapter in the master `task.md` tracking file.

## 4. Example Prompts

**Vocab Example**:
> A high-quality, modern anime-style educational illustration (inspired by Makoto Shinkai and Violet Evergarden's background art). A rich, abundant table set on a sunny Spanish terrace at golden hour... Medium-sized, highly readable, solid, explicit numbered labels from 1 to 10 pointing strictly to: 1 (a cup of coffee), 2 (bread with tomato)... Do NOT use any holographic, transparent, or digital screen effects. Focus strictly on solid, visible, 1:1 mapping of numbers. [HOLA_STYLE_V2] No text.

**Culture Example**:
> A high-quality, modern anime-style illustration of Spanish culture. 'El Arte de Tapear'. A bustling, lively traditional Spanish tapas bar. Cheerful locals standing around... Bright, positive expressions... Do NOT use any holographic, transparent, or digital screen effects. [HOLA_STYLE_V2] No text.
