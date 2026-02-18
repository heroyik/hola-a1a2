# Hola-AL Playwright Test Plan v2.1

## 1. Overview

The purpose of this test plan is to provide a structured approach for verifying that all generated Spanish textbook chapters (`chapters/*.md`) meet the "Gold Standard" requirements defined in `requirement_spec_v2.1.md` and `image.md`.

Tests are executed using **Playwright** against HTML-rendered versions of the markdown chapters.

---

## 2. Test Environment & Configuration

- **Framework**: Playwright (JavaScript)
- **Engine**: Chromium (Headless)
- **Target**: `http://localhost:3000/chapters/[chapter-name].html` (or equivalent file-based rendering)
- **Report Output**: `output/verification_report.md`

---

## 3. Automated Test Suites (verify_grammar.js)

### 3.1 Structural Integrity (REQ-1.x)

| Test Case | Selector/Logic | Expected Outcome |
|:---|:---|:---|
| **TC-1.1.1** | `h2` elements count | Exactly 11 headings |
| **TC-1.1.2** | `h2:nth-child(n)` text content | Matches regex sequence (Opener → ... → Soluciones) |
| **TC-1.2.1-3** | Global Text Search | No instances of `(\d+p)`, `Página:`, or `(Learning Objectives)` |

### 3.2 Section-Specific Content (REQ-2.x)

| Test Case | Target Section | Validation Rule |
|:---|:---|:---|
| **TC-2.1.1** | `SEC-01` | No English sentences in learning objectives. |
| **TC-2.2.1-2** | `SEC-02` | `img` count >= 1; `src` starts with `../images/`. |
| **TC-2.2.4-5** | `SEC-02` | Table must have 3 columns; Following `<p>` must contain `✅`. |
| **TC-2.4.1-6** | `SEC-04` | Presence of `<table>` tag; No `|---|` pipe syntax in source; 6+ rows for persons; Max 4 verbs/table. |
| **TC-2.6.1-3** | `SEC-06` | Presence of A, B, C sub-parts; Exactly 5 items each; 15 items total. |
| **TC-2.8.2** | `SEC-08` | Dialog table rows: 8 ~ 12 turns. |
| **TC-2.11.1** | `SEC-11` | Answer key contains >= 15 numbered items. |

### 3.3 Design & CSS (REQ-3.x)

| Test Case | Selector | CSS Property/Value to Verify |
|:---|:---|:---|
| **TC-3.1.1** | `.container` | `max-width: 900px` |
| **TC-3.3.1** | `table thead th` | `background` contains `linear-gradient`; `font-family` contains `Montserrat` |
| **TC-3.3.2** | `table tr` | `nth-child(even)` has different `background-color` (Zebra) |
| **TC-3.3.3-4** | `table` | `border-radius` > 0; `box-shadow` exists |
| **TC-3.2.1** | Global CSS | Variable `--spanish-red: #A93226` or usage in headers. |

---

## 4. Image & Aesthetic Verification (REQ-4.x)

### 4.1 Automated Image Checks

- [ ] **Path Check**: `img[src]` must be relative (`../images/`).
- [ ] **Alt Text Check**: `img[alt]` must not be empty.
- [ ] **Existence Check**: Script verifies if files referenced in `src` actually exist in the `images/` directory.

### 4.2 Manual / AI-Assisted Aesthetic Audit

Since Playwright cannot "see" style consistency perfectly, the following must be manually verified or checked via AI vision:

- [ ] **Modern Anime Style**: Does the image resemble the Makoto Shinkai / Violet Evergarden aesthetic?
- [ ] **Travel & Emotion**: Is the background a detailed scenery (Spanish architecture, cafes, etc.)?
- [ ] **Lighting**: Is the "Golden Hour" (warm, natural light) evident?
- [ ] **Consistency**: Do characters match the style of `bookcover2a1.png` and `bookcover2a2.png`?
- [ ] **Localization**: Are there any Japanese/Chinese characters in the background? (Must be ES/KO only).

---

## 5. Prohibition Guardrails (REQ-7.x)

These tests perform a full-text search on the markdown source and rendered HTML:

- [ ] **TC-7.1.1**: No `<audio>` tags or `.mp3/.wav` links.
- [ ] **TC-7.1.2**: No Markdown tables (`|---|`) in Grammar section.
- [ ] **TC-7.1.7**: No "1st person / 2nd person" labels in tables.

---

## 6. Execution Workflow

1. **Build**: Convert `chapters/*.md` to HTML using the latest CSS template.
2. **Run Tests**: `npx playwright test scripts/verify_grammar.js`
3. **Analyze**: Check `output/verification_report.md`.
4. **Action**: If "Gold Standard: FAIL", fix the chapter and re-run.
