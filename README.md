# HOLA ESPAÑOL A1/A2 📖🇪🇸

> **Advanced English speakers를 위한 모듈형 A1/A2 스페인어 교재**

---

## 🎊 프로젝트 공식 오픈 (2026-02-22)

본 프로젝트는 **2026년 2월 22일**부로 GitHub에 공식적으로 첫 오픈되었습니다. 인공지능과 언어학의 결합을 통해 누구나 쉽게 스페인어를 마스터할 수 있는 환경을 지향합니다.

## 🔓 오픈 리소스 정책 (Open Resource Policy)

본 프로젝트의 모든 리소스(원고, 이미지, 코드, PDF 등)는 **아무런 제약 없이 누구나 자유롭게 사용, 수정 및 배포**하실 수 있습니다. 교육적 목적이나 개인적 학습 등 필요하신 곳에 마음껏 활용하세요.

## 💬 제안 및 버그 리포트

프로젝트에 대한 건의사항, 오타 발견, 버그 리포트 등은 언제든지 [GitHub Discussions](https://github.com/heroyik/hola-a1a2/discussions) 탭에 남겨주세요. 여러분의 피드백은 교재의 품질을 높이는 데 큰 힘이 됩니다.

---

## 🚀 프로젝트 최신 표준 (v5.3)

- **Deep Dive & Bridge (v5.2)**: 단순히 내용을 늘리는 것을 넘어, **English Bridge** 전략을 통한 어원/개념 매핑과 챕터당 10~12페이지의 풍부한 실전 시나리오를 제공합니다.
- **Zero Defect Loop**: 11개 필수 섹션 준수, 전 인칭 동사 테이블, ABC 5문항 연습문제 등 엄격한 정규화 프로세스를 거칩니다.
- **Modern Anime Style**: **Vertex AI Imagen 3**를 사용하여 실제 어휘와 100% 매핑되는 감각적인 일본 애니메이션 스타일 일러스트를 제공합니다.

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

- 🌉 **English Bridge Strategy**: 영어 Cognate 및 문법 유사성을 활용한 초고속 학습
- 🖼️ **Visual Mapping**: 모든 어휘가 일러스트 내 스페인어 라벨로 1:1 매핑
- 🇰🇷 **Korean Tip**: 한국인 학습자를 위한 전용 언어 간섭 해결 팁
- 🌍 **Cultura Viva**: 스페인 현지의 의료, 식단, 관습 등을 다루는 심층 칼럼
- **Interactive Design**: Premium landing page for easy access to HTML and PDF versions.
- **Comprehensive Verb Tables**: Complete regular conjugation tables (-ar, -er, -ir) for all key tenses.
- **Visual Learning**: Numbered labels, culture-aware modern anime style images.

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

- [x] **교재 작성 전략 수립 (v5.3)**: 디자인/콘텐츠/실행 전략 정규화 완료 및 전 챕터(1-15) 표준화 완료
- [x] **Chapter 1-15 (전체)**: v5.2 Deep Dive & Bridge 버전 생성 및 v2.1.2 Gold Standard 표준화 완료
- [x] **Chapter 1-15 이미지 추가**: Nanobanana 일러스트 적용 완료
- [x] **전체 Nanobanana 프롬프트 자동화 생성**: 현대 애니메이션 스타일과 객체 1:1 매핑 정보를 담은 프롬프트 생성 완료

---

Copyright © 2026. All rights reserved. (Licensed for unrestricted open use)
