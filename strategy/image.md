# Image Generation & Design Strategy

## 🎨 Overview

This document outlines the visual language and image generation guidelines for the **Hola-AL** Spanish textbook project. Our goal is to create a premium, modern, and engaging learning experience with token-efficient prompt engineering.

## ✨ Visual Language: "Modern & Premium Spanish"

### Style Token: `[HOLA_STYLE_V2]`

Instead of long descriptions, use this consolidated style definition in your prompts:
> **"Modern Seinen anime, Makoto Shinkai lighting, Violet Evergarden background detail, warm saturated tones, terracotta and wood accents, Mediterranean Golden Hour light."**

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
3. **Character Consistency**:
   - Define a character once and reuse their description: `[CARLOS] = 20yo male, khaki jacket, friendly, short dark hair`.
4. **Localization**: Explicitly state `No Asian characters/text` to avoid default model biases if necessary.
5. **Tool**: Only use Vertex AI Imagen 3 API.

## 🖼️ Section-Specific Rules

### 2. Vocabulario Esencial

- **Rule**: Every word in the table must be a physical object in the scene.
- **Mapping**: Use `[OBJECT] with label "[SPANISH_WORD]"` in the prompt if text overlays are supported, otherwise ensure clear visual representation.

### 5. Cultura Viva

- **Rule**: Focus on "Travel & Emotion" — wide shots of iconic Spanish locations during Golden Hour.
- **Iconic Spots**: Alhambra, Sagrada Familia, Sevilla Feria, Las Fallas fireworks.

## 📁 Storage & Paths

- **Path**: `/images/` (Relative paths in markdown: `../images/filename.png`).
- **Naming**: `ch[XX]_[section]_[desc].png` (e.g., `ch02_vocab_casa.png`).
