# Hola-AL 📖🇪🇸

**Advanced English speakers를 위한 모듈형 A1/A2 스페인어 교재**

Instituto Cervantes 커리큘럼 기반, English Bridge Strategy로 영어를 활용한 스페인어 학습 교재를 생성하는 프로젝트입니다.

## 🚀 프로젝트 최신 표준 (v4.0)

-   **풍부한 콘텐츠 (Rich Content)**: 단순히 요약된 정보가 아닌, 실제 종이 교재와 같이 각 챕터당 10~12페이지의 심도 있는 내용을 포함합니다. (Dialogues, Grammar, Culture, Practice 등)
-   **AI 기반 자동화**: Gemini API를 사용하여 원어민 수준의 자연스러운 고품질 원고를 생성합니다.
-   **고퀄리티 이미지**: **Vertex AI Imagen 3**를 사용하여 각 어휘 섹션에 맞는 매핑 일러스트를 일본 애니메이션 스타일로 생성합니다.

## 프로젝트 구조

```text
book/
├── chapters/          # 챕터별 Markdown 원고 (A1/A2)
├── scripts/           # 전용 도구 (PDF 생성 등)
├── output/            # 최종 생성된 PDF/HTML 결과물
├── cer_toc.json       # Instituto Cervantes A1/A2 커리큘럼 데이터
├── vol12toc.json      # 기존 교재 문법/어휘 매핑 데이터
├── impl_plan.md       # [Updated] 상세 구현 계획서
└── strategy.md        # 프로젝트 전체 전략 문서
```

## 교재 특징

-   🌉 **English Bridge Strategy**: 영어 Cognate를 활용하여 어원 중심으로 어휘 학습 효율 극대화
-   🖼️ **Visual Mapping**: 모든 주요 어휘가 이미지 내에 스페인어 라벨로 매핑됨
-   🇰🇷 **Korean Tip**: 한국인 학습자의 언어적 간섭 현상을 해결하는 맞춤 팁
-   🌍 **Cultura Viva**: 스페인 현지의 최신 문화와 관습 반영

## 🛠 실행 가이드

```bash
# 가상 환경 설정 및 패키지 설치
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt # or weasyprint markdown

# PDF 생성 예시
python3 scripts/generate_pdf.py chapters/ch01_a1_mi_cuerpo.md output/ch01_a1_mi_cuerpo.pdf
```

## 현재 진행 상태

-   [x] 구현 계획서(impl_plan.md) v4.0 업데이트 완료
-   [x] Chapter 1 (Mi cuerpo): Rich Content v4.0 재생성 완료
-   [x] Chapter 2 (¿Cómo soy?): Rich Content v4.0 재생성 완료
-   [ ] Chapter 3 (Mi identidad): 작업 예정

---
Copyright © 2026. All rights reserved.
