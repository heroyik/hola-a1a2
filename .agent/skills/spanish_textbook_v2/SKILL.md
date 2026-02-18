---
name: spanish_textbook_v2
description: Skill for generating high-quality (Gold Standard) Spanish textbook chapters based on English Bridge Strategy and v2.0 verification requirements.
---

# Spanish Textbook Writing Skill (v2.0)

This skill provides comprehensive instructions for writing Spanish textbook chapters that meet the "Gold Standard" of quality, consistency, and design.

## Core Methodology: English Bridge Strategy
- **English-Centric Mapping**: Map Spanish concepts to English equivalents first (e.g., *Ser/Estar* → *to be*).
- **Cognate Utilization**: 
  - **Perfect Cognates**: Mark with ✅ (e.g., *hospital*).
  - **Near Cognates**: Explain etymology and spelling differences (e.g., *nación*).
  - **False Friends**: Mark with ⚠️ and clarify differences (e.g., *embarazada*).

## Mandatory Chapter Structure (11 Sections)
Each chapter must contain these sections in order:
1. `## 1. Opener`: Learning goals (KO), "¿Sabías que...?" tip.
2. `## 2. Vocabulario Esencial`: Anime-style illustration + English Bridge table.
3. `## 3. Expresiones Útiles`: Contextual patterns and example sentences.
4. `## 4. Gramática Esencial`: Deep dive in Korean + English mapping + HTML verb tables.
5. `## 5. Cultura Viva`: Deep Spanish column + Korean translation + image.
6. `## 6. Práctica`: Exercise sets A, B, and C (5 questions each).
7. `## 7. Lectura 📖`: Subject text + Korean translation.
8. `## 8. Diálogo`: Real-world scenario (HTML Table: ES left / KO right).
9. `## 9. Repaso`: Bulleted summary checklist.
10. `## 10. Cierre`: Encouraging closing message.
11. `## 11. Soluciones`: Answer keys for Section 6.

## Verification & Guardrails (Gold Standard)
- **STRICT HTML Tables**: Never use Markdown pipes (`|`) for verb tables or dialogues. Use `<table>` tags.
- **Verb Ending Highlight**: Use `<strong>` to bold verb endings in tables.
- **Subject Completeness**: Always include all 6 subjects (yo, tú, él..., nosotros..., vosotros..., ellos...) in tables.
- **Image Paths**: Use relative paths starting with `../images/`.
- **900px Container**: Ensure HTML content is wrapped in a 900px container for premium rendering.

## Resource Files
- [Requirement Specification](resources/requirement_spec.md)
- [Strategy Plan](resources/strategy_plan.md)

## Usage Tips
- When creating a new chapter, reference the `examples/chapter_template.md` for the exact HTML syntax for tables.
- Ensure all 11 sections are present; skipping even one will fail the verification audit.
