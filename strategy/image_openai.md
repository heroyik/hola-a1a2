# Image Generation & Design Strategy (OpenAI DALL-E 3)

## 🎨 Overview

This document outlines the visual language and image generation guidelines for the **Hola-AL** Spanish textbook project, optimized for **OpenAI DALL-E 3**. Our goal is to create a premium, modern, and engaging learning experience using clear, descriptive prompts that DALL-E 3 can effectively interpret.

## ✨ Visual Language: "Modern & Premium Spanish"

### Style Token:### [HOLA_STYLE_V2] core components

- **Art Style**: Modern Seinen Anime (Sharp lines, clean silhouettes, professional digital paint)
- **Character Traits**:
  - **Personality**: Always bright, cheerful, and welcoming (Expressive smiles, energetic poses).
  - **Selection**: Flexible choice of male/female characters based on the context's needs.
  - **Diversity**: Accurate Spanish/Mediterranean ethnicities (olive skin tones, varying hair textures: wavy, curly, dark brown/black). *Note: Unlike some models, DALL-E 3 responds better to explicitly describing what you WANT rather than what you DON'T want. Emphasize "Caucasian/Mediterranean features" instead of just "No Asian characters".*
- **Visuals**: Warm golden hour lighting (cinematic), high resolution, volumetric depth.

### Core Aesthetics

- **Lighting**: Strong, warm natural sunlight (Golden Hour) with distinct shadows.
- **Line Art**: Clean, slightly textured "Seinen" anime aesthetic.
- **Backgrounds**: High-fidelity indoor/outdoor Spanish settings (tiling, wooden furniture, potted plants).
- **Color Palette**: Spain Red (#A93226), Gold (#D4AC0D), Soft Charcoal (#2C3E50), Off White (#FCF9F2).

## ⚙️ Prompt Engineering Guidelines (OpenAI DALL-E 3)

To maximize quality and ensure prompt fidelity with DALL-E 3, follow these rules:

1. **Descriptive, Natural Language**: DALL-E 3 excels at understanding natural conversational descriptions. You don't need a rigid "Noun-First Structure". Describe the scene composition, character emotional states, and environmental details fluidly.
2. **Text Generation**: DALL-E 3 is capable of rendering text. If you want numbers or labels, put them in quotes (e.g., `labeled with the number "1"` or `a sign that says "Hola"`).
3. **Character Consistency & Vibe**:
   - Explicitly detail character features in every prompt (e.g., "a 20-year-old Mediterranean woman with olive skin and short dark curly hair wearing a khaki jacket").
   - **MANDATORY**: 캐릭터는 항상 밝고, 긍정적인 이미지로 생성해줘. (Characters must always be generated with a bright, cheerful, and positive expression).
4. **Tool**: Use OpenAI DALL-E 3 API (or ChatGPT Plus). Set the aspect ratio to widescreen (16:9) when appropriate for landscapes/large scenes.

## 🖼️ Section-Specific Rules

1. **Vocabulario Esencial (Section 2 - MANDATORY for every chapter)**
    - **100% Coverage**: Every single word in the vocabulary list MUST be represented in the image.
    - **Numbered Infographic Layout**: DALL-E 3 can struggle with generating 10 perfectly distinct, isolated items with correct text numbers in a single cohesive scene. Describe a structured layout like a "grid-style infographic" or "a wide scene divided into distinct sections" and explicitly ask for `circled numbers "1", "2", "3"` next to the respective elements.
    - **MANDATORY FOR READABILITY**: 절대 증강현실(AR), 홀로그램 투영(Hologram projections), 반투명 HUD 등 가독성을 떨어뜨리는 시각 효과를 사용하지 마세요. 번호와 그림이 직관적으로 1:1 매칭되어야 합니다.

2. **Cultura Viva (Section 5 - MANDATORY for every chapter)**
    - **Content-Driven**: Image must explicitly illustrate the specific cultural topic described in the text (e.g., if the text discusses "Dos Besos", the image must show that action).
    - **Rich Backgrounds**: Include localized Spanish elements (architecture, signs, clothing) that reinforce the cultural lesson.
    - **No AR/Holograms**: 가독성과 자연스러움을 위해 증강현실(AR)이나 홀로그래픽 인터페이스를 사용하지 마세요. 아름답고 일상적인 일러스트 자체로 문화를 보여주세요.

## 📁 Storage & Paths

- **Path**: `/images/` (Relative paths in markdown: `../images/filename.png`).
- **Naming**: `ch[XX]_[section]_[desc].png` (e.g., `ch02_vocab_casa.png`).

## 🖼️ Prompts de Referencia (Reference Prompts for DALL-E 3)

- **A2 Travel / Culture Concept**:
  `A heartwarming modern Seinen anime-style illustration. A young Mediterranean woman with olive skin, wavy dark hair, wearing a stylish trench coat and carrying a camera, stands on a hill overlooking the Alhambra palace in Granada, Spain, during bright golden hour. The art style features beautifully detailed background scenery with watercolor textures, evoking a sense of wonder and travel. A cheerful and bright atmosphere, avoiding any holographic or AR interfaces. Spain Red and Gold colors are subtly incorporated.`
