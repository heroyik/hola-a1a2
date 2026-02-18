# Hola-AL 📖🇪🇸

**Advanced English speakers를 위한 모듈형 A1/A2 스페인어 교재**

Instituto Cervantes 커리큘럼 기반, English Bridge Strategy로 영어를 활용한 스페인어 학습 교재를 생성하는 프로젝트입니다.

## 🚀 프로젝트 최신 표준 (v5.2)

-   **Deep Dive & Bridge (v5.2)**: 단순히 내용을 늘리는 것을 넘어, **English Bridge** 전략을 통한 어원/개념 매핑과 챕터당 10~12페이지의 풍부한 실전 시나리오를 제공합니다.
-   **Zero Defect Loop**: 11개 필수 섹션 준수, 전 인칭 동사 테이블, ABC 5문항 연습문제 등 엄격한 정규화 프로세스를 거칩니다.
-   **Modern Anime Style**: **Vertex AI Imagen 3**를 사용하여 실제 어휘와 100% 매핑되는 감각적인 일본 애니메이션 스타일 일러스트를 제공합니다.

## 프로젝트 구조

```text
book/
├── chapters/          # 챕터별 Markdown 원고 (A1/A2)
├── scripts/           # 전용 도구 (PDF/HTML 생성, 이미지 처리 등)
├── output/            # 최종 생성된 PDF/HTML 결과물
├── images/            # 생성된 고해상도 AI 일러스트
├── cer_toc.json       # Instituto Cervantes A1/A2 커리큘럼 데이터
├── vol12toc.json      # 기존 교재 문법/어휘 매핑 데이터
└── ...
```

## 교재 특징

-   🌉 **English Bridge Strategy**: 영어 Cognate 및 문법 유사성을 활용한 초고속 학습
-   🖼️ **Visual Mapping**: 모든 어휘가 일러스트 내 스페인어 라벨로 1:1 매핑
-   🇰🇷 **Korean Tip**: 한국인 학습자를 위한 전용 언어 간섭 해결 팁
-   🌍 **Cultura Viva**: 스페인 현지의 의료, 식단, 관습 등을 다루는 심층 칼럼

## 🛠 Project Infrastructure

### Technical Stack
- **Premium Rendering**: `scripts/render_chapters.js` with `markdown-it` and professional CSS for consistent "Gold Standard" output.
- **Automated Verification**: `scripts/verify_grammar.js` (Playwright-based) for strict structural and grammatical audits.
- **Production Skill**: Codified writing rules in `.agent/skills/spanish_textbook_v2`.

### 실행 가이드 (Quick Start)
1. **Remediate**: Update chapters in `chapters/` using the production skill template.
2. **Render (HTML)**:
   ```bash
   node scripts/render_chapters.js
   ```
3. **Verify**:
   ```bash
   node scripts/verify_grammar.js
   ```
4. **Export (PDF)**:
   ```bash
   source venv/bin/activate
   python3 scripts/generate_pdf.py chapters/ch01_a1_mi_cuerpo.md output/ch01_a1_mi_cuerpo.pdf
   ```

## 현재 진행 상태

-   [x] **교재 작성 전략 수립 (v5.2)**: 디자인/콘텐츠/실행 전략 정규화 완료
-   [x] **Chapter 1 (Mi cuerpo y salud)**: v5.2 Deep Dive & Bridge 버전 생성 완료
-   [x] **Chapter 2 (¿Cómo soy?)**: v5.2 Deep Dive & Bridge 버전 생성 완료
-   [x] **Chapter 3 (Mi identidad)**: v5.2 Deep Dive & Bridge 버전 생성 완료 ([PDF](output/ch03_a1_mi_identidad.pdf) | [HTML](output/ch03_a1_mi_identidad.html))
-   [ ] 나머지 챕터 (Ch.4 ~ Ch.15): 순차 생성 예정

---
Copyright © 2026. All rights reserved.
