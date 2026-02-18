# Hola-AL: Spanish Textbook Requirement Specification

본 문서는 `implementation_plan.md`를 바탕으로 도출된 핵심 요구사항 명세서입니다. 특히 Playwright 기반 자동 검증(`verify_grammar.js`) 및 최종 품질 관리를 위한 가이드라인으로 최적화되었습니다.

---

## 1. 구조 및 메타데이터 (Structural Integrity)

### 1.1 11개 필수 섹션 (Mandatory Sections)
모든 챕터는 다음 순서대로 11개의 섹션을 포함해야 합니다 (h2 기준).
1. `## 1. Opener`: 도입부 및 학습 목표 (한국어 작성, '(Learning Objectives)' 표기 금지)
2. `## 2. Vocabulario Esencial`: 이미지 및 어휘 표
3. `## 3. Expresiones Útiles`: 핵심 패턴 및 예문
4. `## 4. Gramática Esencial`: 문법 해설 및 동사 변형 테이블
5. `## 5. Cultura Viva`: 스페인어 칼럼 및 한국어 번역
6. `## 6. Práctica`: 연습문제 (A, B, C 각 5문항 필수)
7. `## 7. Lectura 📖`: 독해 및 한국어 번역
8. `## 8. Diálogo`: 대화문 (HTML table 형식: 좌-ES / 우-KO)
9. `## 9. Repaso`: 핵심 요약
10. `## 10. Cierre`: 마무리 메시지
11. `## 11. Soluciones`: 정답지 (Práctica 전 문항)

### 1.2 섹션 이름 규칙
- **금지**: 섹션 제목에 분량 표기 (예: `(1p)`, `(0.5p)`) 포함 금지.
- **금지**: `Página:`로 시작하는 내부 메타 정보 라인 삭제.

---

## 2. 디자인 및 시각 요소 (Design Specification)

### 2.1 레이아웃 및 CSS
- **컨테이너**: 가로폭 `900px` 중앙 정렬.
- **색상**: 
    - Spanish Red (`#A93226`)
    - Spanish Ochre (`#D4AC0D`)
    - Slate Grey (`#2C3E50`)
- **반응형**: 맥북(Desktop) 및 아이폰(Mobile) 환경에서 레이아웃 깨짐이 없어야 함.

### 2.2 이미지 요건
- **스타일**: Modern Anime Style (Vertex AI Imagen 3).
- **경로**: `../images/[파일명]` 상대 경로 사용.
- **언어 제어**: 이미지 내 일본어, 한자 등 불필요한 언어 노출 금지.

---

## 3. 문법 및 동사 변형 (Grammar v5.8 Verification)

### 3.1 동사 변형 테이블 (STRICT HTML)
- **포맷**: 반드시 HTML `<table>` 태그 사용. **마크다운 테이블(`|`) 절대 금지**.
- **인칭**: 6개 인칭(yo, tú, él/ella/usted, nosotros/as, vosotros/as, ellos/ellas/ustedes) 필수 포함.
- **라벨**: 서수(1st person 등) 제외, 주어만 표시.
- **강조**: 어미(Ending) 변화에 `<strong>` 또는 `<span>`을 이용한 **Bold** 처리 필수.
- **분량**: 한 테이블당 최대 4개 동사 배치.

### 3.2 시제별 필수 불규칙 동사 (Automation Checklist)
자동 검증 스크립트는 다음 시제 등장 시 해당 동사들의 테이블 존재 여부를 체크합니다.

| 시제 (Tense) | 필수 포함 동사 리스트 |
| :--- | :--- |
| **Presente** | `ser`, `estar`, `ir`, `tener`, `saber`, `poder` |
| **Gerundio** | `ir`, `leer`, `repetir`, `decir`, `venir`, `dormir`, `morir` |
| **Indefinido** | `estar`, `tener`, `poder`, `poner`, `querer`, `saber`, `venir`, `decir`, `dar`, `hacer`, `haber`, `ser/ir` |
| **Imperfecto** | `ser`, `ir`, `ver` |
| **Futuro** | `decir`, `hacer`, `poder`, `querer`, `saber`, `salir`, `tener`, `venir`, `poner`, `haber` |
| **Participio** | `hacer`, `poner`, `erscribir`, `decir`, `volver`, `abrir`, `leer`, `romper` |
| **Imperativo** | `dar`, `ser`, `ver`, `ir`, `decir`, `hacer`, `poner`, `salir`, `tener`, `venir` |

---

## 4. English Bridge 전략 (Cognate Mapping)

### 4.1 어휘 테이블 구성
- **Perfect Cognates**: ✅ 체크 표시.
- **Near Cognates**: 어원 설명 및 스펠링 차이 명시.
- **False Friends**: ⚠️ 경고 표시 및 정확한 의미 대조.

### 4.2 문법 설명
- 1차 매핑: 영어 등가물(English Equivalent).
- 2차 설명: 한국어 보완 설명 (차이점 중심).

---

## 5. Playwright 검증 엔진용 선택자 (Technical Selectors)

- **Main Container**: `.container`
- **Table Detection**: `table` (Markdown pipes `|` 검출 시 에러 발생)
- **Ending Highlights**: `table strong`, `table span`
- **Section Headers**: `h2` (텍스트 매칭으로 11개 섹션 순서 검증)
- **External Legend**: `table` 바로 뒤에 위치한 `p` 태그 내 `✅` 포함 여부 확인.
- **Relative Path**: `img[src^='../images/']`
