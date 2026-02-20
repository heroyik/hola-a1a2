# Image Generation & Design Strategy

## 🎨 Overview

This document outlines the visual language and image generation guidelines for the **Hola-AL** Spanish textbook project. Our goal is to create a premium, modern, and engaging learning experience with token-efficient prompt engineering.

## ✨ Visual Language: "Modern & Premium Spanish"

### Style Token:### [HOLA_STYLE_V2] core components

- **Art Style**: Modern Seinen Anime (Sharp lines, clean silhouettes, professional digital paint)
- **Character Traits**:
  - **Personality**: Always bright, cheerful, and welcoming (Expressive smiles, energetic poses).
  - **Selection**: Flexible choice of male/female characters based on the context's needs.
  - **Diversity**: Accurate Spanish/Mediterranean ethnicities (olive skin tones, varying hair textures: wavy, curly, dark brown/black). No Asian characters or text.
- **Visuals**: Warm golden hour lighting (cinematic), 8k resolution, volumetric depth.

### Core Aesthetics

- **Lighting**: Strong, warm natural sunlight (Golden Hour) with distinct shadows.
- **Line Art**: Clean, slightly textured "Seinen" anime aesthetic.
- **Backgrounds**: High-fidelity indoor/outdoor Spanish settings (tiling, wooden furniture, potted plants).
- **Color Palette**: Spain Red (#A93226), Gold (#D4AC0D), Soft Charcoal (#2C3E50), Off White (#FCF9F2).

## ⚙️ Prompt Engineering Guidelines (Imagen 3)

To minimize token usage and maximize quality, follow these rules:

1. **Noun-First Structure**: Start with the main subject, then environment, then lighting/style.
   - *Example*: `College student, Spanish cafe, golden hour lighting, [HOLA_STYLE_V2]`
2. **Eliminate Fluff**: Avoid "a photo of", "highly detailed", "4k", etc. Imagen 3 handles quality via style tokens.
3. **Character Consistency & Vibe**:
   - Define a character once and reuse their description: `[CARLOS] = 20yo male, khaki jacket, friendly, short dark hair`.
   - **MANDATORY**: 캐릭터는 항상 밝고, 긍정적인 이미지로 생성해줘. (Characters must always be generated with a bright, cheerful, and positive expression).
4. **Localization**: Explicitly state `No Asian characters/text` to avoid default model biases if necessary.
5. **Tool**: Only use Vertex AI Imagen 3 API.

## 🖼️ Section-Specific Rules

1. **Vocabulario Esencial (Section 2 - MANDATORY for every chapter)**
    - **100% Coverage**: Every single word in the vocabulary list MUST be represented in the image.
    - **Numbered Infographic**: Use diagram-style illustrations with explicit numbered labels (①, ②, etc.) mapped to the vocabulary table.
    - **Clarity over Complexity**: Prioritize clear, isolated subjects (e.g., a full-body character for body parts) to ensure labels are legible.
    - **MANDATORY FOR READABILITY**: 절대 증강현실(AR), 홀로그램 투영(Hologram projections), 반투명 HUD 등 가독성을 떨어뜨리는 시각 효과를 사용하지 마세요. 번호와 그림이 직관적으로 1:1 매칭되어야 합니다.


2. **Cultura Viva (Section 5 - MANDATORY for every chapter)**
    - **Content-Driven**: Image must explicitly illustrate the specific cultural topic described in the text (e.g., if the text discusses "Dos Besos", the image must show that action).
    - **Rich Backgrounds**: Include localized Spanish elements (architecture, signs, clothing) that reinforce the cultural lesson.
    - **No AR/Holograms**: 가독성과 자연스러움을 위해 증강현실(AR)이나 홀로그래픽 인터페이스를 사용하지 마세요. 아름답고 일상적인 일러스트 자체로 문화를 보여주세요.

## 📁 Storage & Paths

- **Path**: `/images/` (Relative paths in markdown: `../images/filename.png`).
- **Naming**: `ch[XX]_[section]_[desc].png` (e.g., `ch02_vocab_casa.png`).

## 🖼️ Prompts de Referencia (Reference Prompts)

- **A2 Travel / Culture Concept**:
  `A heartwarming anime-style travel illustration. The young female protagonist, wearing a stylish trench coat and carrying a camera, is standing on a hill overlooking the Alhambra palace in Granada, Spain, at bright golden hour lighting. The art style emphasizes beautiful, detailed background scenery with watercolor textures, similar to a Makoto Shinkai film, evoking a sense of wonder and travel. Important: Do NOT use AR interfaces or holograms. Ensure high readability and clear rendering.`
