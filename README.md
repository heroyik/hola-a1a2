# Hola-AL 📖🇪🇸

**Advanced English speakers를 위한 모듈형 A1/A2 스페인어 교재**

Instituto Cervantes 커리큘럼 기반, English Bridge Strategy로 영어를 활용한 스페인어 학습 교재를 생성하는 프로젝트입니다.

## 프로젝트 구조

```text
book/
├── chapters/          # 챕터별 Markdown 원고
│   ├── ch01_a1_mi_cuerpo.md
│   └── ch01_a2_mi_cuerpo.md
├── scripts/           # PDF 생성 스크립트
│   └── generate_pdf.py
├── cer_toc.json       # Instituto Cervantes A1/A2 커리큘럼 데이터
├── vol12toc.json      # 기존 교재 문법/어휘 매핑
└── strategy.md        # 프로젝트 전략 문서
```

## 교재 특징

- 🌉 **English Bridge Strategy**: 영어 Cognate를 활용한 어휘 학습
- 📚 **15 Chapter, ~300p**: A1 150p + A2 150p 모듈 구성
- 🇰🇷 **Korean Tip**: 한국인 학습자가 자주 틀리는 포인트
- 🌍 **Cultura Viva**: 스페인·중남미 문화 비교
- 📖 **Lectura**: 주제별 독해 텍스트

## PDF 생성

```bash
python3 -m venv venv
source venv/bin/activate
pip install weasyprint markdown
python scripts/generate_pdf.py
```

생성 결과는 `output/` 폴더에 저장됩니다.

## 라이선스

Private — All rights reserved.
