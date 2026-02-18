# Hola-AL: Requirement Specification v2.1

본 문서는 `plan_v2.1.md (Strategy v5.2)`을 기반으로 도출된 **포괄적 요구사항 명세서**입니다.
Playwright 기반 자동 검증 스크립트(`scripts/verify_grammar.js`)의 **테스트 케이스 설계 원본(Source of Truth)**으로 사용됩니다.

> [!IMPORTANT]
> 모든 챕터 파일(`chapters/*.md` → HTML 렌더링)은 본 명세서의 모든 항목을 100% 충족해야 합니다.
> 하나라도 FAIL 시 Gold Standard 미달로 판정하며, 최신 v5.4~v5.6 표준을 엄격히 따릅니다.

---

## 1. 구조 및 섹션 검증 (Structural Integrity)

### REQ-1.1: 11개 필수 섹션 존재 및 순서

모든 챕터는 `h2` 헤딩 기준으로 아래 11개 섹션을 **정확한 순서**로 포함해야 합니다.

| 순서 | 섹션 ID | h2 텍스트 패턴 | 검증 정규식 |
|:---:|:---:|:---|:---|
| 1  | SEC-01 | `## 1. Opener`               | `/^##\s+1\.\s+Opener/`             |
| 2  | SEC-02 | `## 2. Vocabulario Esencial` | `/^##\s+2\.\s+Vocabulario Esencial/` |
| 3  | SEC-03 | `## 3. Expresiones Útiles`   | `/^##\s+3\.\s+Expresiones\s+Útiles/` |
| 4  | SEC-04 | `## 4. Gramática Esencial`   | `/^##\s+4\.\s+Gramática Esencial/`   |
| 5  | SEC-05 | `## 5. Cultura Viva`         | `/^##\s+5\.\s+Cultura Viva/`         |
| 6  | SEC-06 | `## 6. Práctica`             | `/^##\s+6\.\s+Práctica/`             |
| 7  | SEC-07 | `## 7. Lectura 📖`            | `/^##\s+7\.\s+Lectura\s+📖/`           |
| 8  | SEC-08 | `## 8. Diálogo`              | `/^##\s+8\.\s+Diálogo/`              |
| 9  | SEC-09 | `## 9. Repaso`               | `/^##\s+9\.\s+Repaso/`               |
| 10 | SEC-10 | `## 10. Cierre`              | `/^##\s+10\.\s+Cierre/`              |
| 11 | SEC-11 | `## 11. Soluciones`          | `/^##\s+11\.\s+Soluciones/`          |

**테스트 케이스**:

- **TC-1.1.1**: `h2` 요소가 정확히 11개 존재하는지 확인.
- **TC-1.1.2**: 11개 `h2`의 텍스트가 위 정규식과 순서대로 매칭되는지 확인.
- **TC-1.1.3**: 첫 번째 `h2`가 반드시 `1. Opener`이고, 마지막 `h2`가 `11. Soluciones`인지 확인.

### REQ-1.2: 섹션 제목 명명 규칙

**금지 패턴**:

| 규칙 ID | 설명 | 금지 패턴 예시 | 검증 정규식 |
|:---:|:---|:---|:---|
| REQ-1.2.1 | 섹션명에 분량 표기 금지 | `## 1. Opener (1p)` | `/\(\d+\.?\d*p\)/` |
| REQ-1.2.2 | 페이지 메타 라인 금지 | `Página: A1 교재 Part I...` | `/^Página:/` |
| REQ-1.2.3 | Learning Objectives 표기 금지 | `(Learning Objectives)` | `/\(Learning Objectives\)/i` |

**테스트 케이스**:

- **TC-1.2.1**: 모든 `h2` 텍스트에서 `(\d+p)` 패턴이 검출되지 않아야 함.
- **TC-1.2.2**: HTML 전체에서 `Página:`로 시작하는 텍스트 노드가 없어야 함.
- **TC-1.2.3**: `1. Opener` 섹션 내 `(Learning Objectives)` 문자열이 없어야 함.

---

## 2. 섹션별 상세 요구사항 (Per-Section Requirements)

### REQ-2.1: 1. Opener

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.1.1 | 학습 목표가 **한국어로만** 작성되어야 함 | 학습 목표 영역 내 영문 문장 검출 시 FAIL |
| REQ-2.1.2 | `¿Sabías que...?` 문화 상식 팁 포함 필수 | 텍스트 내 `¿Sabías que` 존재 여부 확인 |

**테스트 케이스**:

- **TC-2.1.1**: Opener 섹션 내 학습 목표 블록에서 `(Learning Objectives)` 텍스트 없음 확인.
- **TC-2.1.2**: Opener 섹션 내 `¿Sabías que` 텍스트 존재 확인 (Gold Standard 필수).

### REQ-2.2: 2. Vocabulario Esencial

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.2.1 | **이미지 1개 이상** 필수 포함 (`<img>` 태그) | `img` 태그 존재 확인 |
| REQ-2.2.2 | 이미지 경로는 **상대 경로** (`../images/`) | `img[src]` 속성값 검증 |
| REQ-2.2.3 | 어휘 넘버가 삽화에 빠짐없이 표시 (어휘-삽화 완전 일치) | 어휘 테이블 행 수 ≤ 이미지 내 라벨 수 (수동 검증 병행) |
| REQ-2.2.4 | English Bridge 어휘 표 포함 (Spanish / English Bridge / Korean Tip 3열 구성) | 테이블 헤더 텍스트 검증 |
| REQ-2.2.5 | 어휘 표 하단에 **External Legend** (✅ 기호 설명) 배치 — 테이블 외부 `<p>` 태그 | `table` 다음 `p` 요소 내 `✅` 포함 확인 |

**테스트 케이스**:

- **TC-2.2.1**: SEC-02 영역 내 `img` 요소가 1개 이상 존재.
- **TC-2.2.2**: SEC-02 내 모든 `img[src]` 값이 `../images/`로 시작.
- **TC-2.2.3**: SEC-02 내 어휘 테이블 존재 확인 (최소 3열 이상).
- **TC-2.2.4**: 어휘 테이블 직후 `<p>` 태그에 `✅` 문자 포함 확인.

### REQ-2.3: 3. Expresiones Útiles

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.3.1 | 상황별 핵심 패턴 및 실용 예문 포함 (ES + EN 매핑 권장) | 섹션 내 텍스트 최소 분량 확인 (최소 200자 이상) |

**테스트 케이스**:

- **TC-2.3.1**: SEC-03 영역 내 텍스트 콘텐츠가 비어있지 않음 (풍부한 예문 제공).

### REQ-2.4: 4. Gramática Esencial

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.4.1 | 동사 변형 테이블은 **HTML `<table>` 필수** | `<table>` 태그 존재 확인 |
| REQ-2.4.2 | **마크다운 테이블(`\|`) 사용 절대 금지** | 마크다운 파이프 문법 검출 시 즉시 FAIL |
| REQ-2.4.3 | 6개 인칭 완결성 (yo, tú, él/ella/usted, nosotros/as, vosotros/as, ellos/ellas/ustedes) | 각 `<table>` 내 `<tr>` 행 수 ≥ 6 + 헤더 |
| REQ-2.4.4 | 서수 레이블(1인칭, 2인칭 등) 사용 금지 — 주어만 표시 | 테이블 셀 텍스트에서 `인칭` 또는 `person` 검출 시 FAIL |
| REQ-2.4.5 | 어미(Ending) 강조에 `<strong>` 또는 `<span>` 사용 필수 | `table strong` 또는 `table span` 선택자 존재 확인 |
| REQ-2.4.6 | 한 테이블당 **최대 4개 동사** 배치 | 테이블 헤더 셀(동사명) 수 ≤ 4 |
| REQ-2.4.7 | 규칙 동사 모델: hablar(-ar), comer(-er), vivir(-ir) 사용 | 규칙 동사 테이블 내 해당 동사명 존재 확인 |
| REQ-2.4.8 | 문법 설명은 **한국어로** 구성 | 섹션 내 한국어 텍스트 비율 확인 |
| REQ-2.4.9 | 영어권 학습자 위한 Stem/Ending 변화 규칙 영어 매핑 포함 | `Stem`, `Ending`, `Root` 등 영어 키워드 존재 확인 |

**테스트 케이스**:

- **TC-2.4.1**: SEC-04 내 `<table>` 요소가 1개 이상 존재.
- **TC-2.4.2**: SEC-04 마크다운 소스에서 `|---` 패턴(동사 변형용 마크다운 테이블) 검출 시 FAIL.
- **TC-2.4.3**: 각 동사 변형 `<table>` 내 데이터 행(`<tr>`) 수가 6개 이상 (헤더 행 제외).
- **TC-2.4.4**: 동사 변형 테이블 내 셀 텍스트에 `1인칭`, `2인칭`, `3인칭`, `1st person`, `2nd person`, `3rd person` 패턴 없음.
- **TC-2.4.5**: 동사 변형 `<table>` 내 `<strong>` 또는 `<span>` 요소가 1개 이상 존재.
- **TC-2.4.6**: 각 동사 변형 테이블의 헤더 행 셀 수 ≤ 5 (주어 열 + 최대 4개 동사).

### REQ-2.5: 5. Cultura Viva

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.5.1 | **스페인어로만** 작성된 칼럼 본문 | 영문 설명 텍스트 검출 시 FAIL |
| REQ-2.5.2 | 스페인어 본문 하단에 **한국어 번역 필수** | 한국어 유니코드 블록(가-힣) 텍스트 존재 확인 |
| REQ-2.5.3 | **Imagen 3 전용 이미지** 1개 이상 필수 포함 | `img` 태그 존재 확인 |
| REQ-2.5.4 | 이미지가 **섹션 내용을 최대한 반영** | 이미지 `alt` 텍스트 존재 확인 (수동 검증 병행) |

**테스트 케이스**:

- **TC-2.5.1**: SEC-05 영역 내 스페인어 텍스트 존재 확인 (á, é, í, ó, ú, ñ, ¿, ¡ 등 스페인어 특수문자 포함).
- **TC-2.5.2**: SEC-05 영역 내 한국어 텍스트(가-힣 유니코드 범위) 존재 확인.
- **TC-2.5.3**: SEC-05 영역 내 `img` 요소 1개 이상 존재.
- **TC-2.5.4**: SEC-05 내 `img` 요소에 `alt` 속성이 비어있지 않음.

### REQ-2.6: 6. Práctica

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.6.1 | 하위 파트 A, B, C 모두 존재 | `h3` 또는 텍스트 내 `A.`, `B.`, `C.` 패턴 확인 |
| REQ-2.6.2 | 각 파트(A, B, C) **정확히 5문항** | 각 파트 내 번호 매긴 항목 수 = 5 |
| REQ-2.6.3 | 총 문항 수 = **15** (A5 + B5 + C5) | 전체 번호 항목 합계 = 15 |

**테스트 케이스**:

- **TC-2.6.1**: SEC-06 내 `A`, `B`, `C` 세 파트 헤딩 또는 레이블 존재.
- **TC-2.6.2**: 각 파트(A, B, C) 내 번호가 매겨진 문항(ordered list 또는 `1.`~`5.`)이 정확히 5개.
- **TC-2.6.3**: SEC-06 전체 문항 합계가 15개.

### REQ-2.7: 7. Lectura 📖

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.7.1 | 주제 관련 **독해 텍스트** 포함 | 스페인어 본문 텍스트 존재 확인 |
| REQ-2.7.2 | **한국어 번역** 필수 포함 | 한국어 텍스트(가-힣) 존재 확인 |

**테스트 케이스**:

- **TC-2.7.1**: SEC-07 영역 내 스페인어 텍스트(특수문자 포함) 존재.
- **TC-2.7.2**: SEC-07 영역 내 한국어 텍스트 존재 확인.

### REQ-2.8: 8. Diálogo

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.8.1 | **HTML `<table>` 형식** 대화문 (좌: ES / 우: KO) | `table` 태그 존재 확인 |
| REQ-2.8.2 | 대화 턴 수: **8~12턴** | 테이블 내 `<tr>` 행 수 (헤더 제외) 범위 검증 |
| REQ-2.8.3 | 대화 **상황 설명** 필수 (스페인어 우선 + 한국어 추가) | 테이블 앞 텍스트 블록 존재 확인 |

**테스트 케이스**:

- **TC-2.8.1**: SEC-08 내 `<table>` 요소 존재 확인.
- **TC-2.8.2**: SEC-08 내 대화 테이블의 데이터 행 수가 8 이상 12 이하.
- **TC-2.8.3**: SEC-08 내 `<table>` 이전에 텍스트 콘텐츠(상황 설명) 존재 확인.

### REQ-2.9: 9. Repaso

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.9.1 | 핵심 요약 체크리스트 포함 | 체크리스트 또는 리스트 요소 존재 확인 |
| REQ-2.9.2 | 비어있지 않은 풍부한 내용 | 최소 텍스트 분량 확인 (100자 이상) |

### REQ-2.10: 10. Cierre

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.10.1 | 학습 마무리 요약 및 고무적인 메시지 포함 | 비어있지 않은 텍스트 확인 (50자 이상) |

### REQ-2.11: 11. Soluciones

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-2.11.1 | 6. Práctica **전 문항**(A·B·C 각 5문항)에 대한 정답 포함 | 정답 항목 수 ≥ 15 |
| REQ-2.11.2 | A, B, C 파트별 정답 구분 명시 | 파트 구분 레이블 존재 확인 |

---

## 3. 디자인 및 레이아웃 검증 (Design Specification)

### REQ-3.1: 레이아웃 및 CSS

| 규칙 ID | 요구사항 | CSS 선택자 / 검증 방법 |
|:---:|:---|:---|
| REQ-3.1.1 | 본문 **가로폭 900px** 중앙 정렬 컨테이너 | `.container` 또는 최상위 래퍼의 `max-width: 900px` 확인 |
| REQ-3.1.2 | 충분한 좌우 **여백(padding/margin)** 부여 | 컨테이너에 `margin: 0 auto` 또는 `padding` 확인 |
| REQ-3.1.3 | `@media print` 스타일 정의 존재 | 스타일시트 내 `@media print` 블록 확인 |

### REQ-3.2: 컬러 팔레트

| 규칙 ID | 색상명 | HEX 코드 | 용도 |
|:---:|:---|:---|:---|
| REQ-3.2.1 | Spanish Red | `#A93226` | 주요 강조색, 헤더 |
| REQ-3.2.2 | Spanish Gold | `#D4AC0D` | 보조 강조색 |
| REQ-3.2.3 | Soft Charcoal | `#2C3E50` | 본문 텍스트 |
| REQ-3.2.4 | Off-White | `#FCF9F2` | 배경색 |

### REQ-3.3: 테이블 디자인 (High-End Table Design)

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-3.3.1 | **헤더**: 은은한 그라데이션과 Montserrat 타입 적용 | `thead th`에 그라데이션 및 `font-family` 확인 |
| REQ-3.3.2 | **본문**: Zebra Striping(홀수/짝수 행 구분) | `tr:nth-child` CSS 확인 |
| REQ-3.3.3 | **구조**: `border-radius`와 `box-shadow` 적용 | Elevated 효과 스타일 존재 |

---

## 4. 이미지 검증 (Image Specification)

### REQ-4.1: 공통 이미지 규칙 (Reference: strategy/image.md)

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-4.1.1 | **상대 경로**: `../images/` 사용 | `img[src]` 검증 |
| REQ-4.1.2 | **스타일**: **Modern Anime Style** (Golden Hour) | 수동 검증 / Alt 확인 |
| REQ-4.1.3 | **감성**: "Travel & Emotion" 컨셉 반영 | 수동 검증 |
| REQ-4.1.4 | **저장**: 생성된 파일이 `images/` 폴더에 존재 | 파일 시스템 확인 |

---

## 5. 문법 및 동사 변형 검증 (Grammar v5.8 Verification)

### REQ-5.1: 동사 변형 테이블 포맷 및 시제 커버리지

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-5.1.1 | **필수 시제 7종 커버** | 현재, 현재진행, 현재완료, 단순과거, 불완료과거, 과거완료, 단순미래 등장 확인 |
| REQ-5.1.2 | **명령형 2종 커버** | 긍정 명령형, 부정 명령형 등장 확인 |
| REQ-5.1.3 | **HTML `<table>` 태그 필수** | DOM 내 `<table>` 요소 존재 확인 |
| REQ-5.1.4 | **어미 강조**: `<strong>` 또는 `<span>` 필수 | 어미 Bold/색상 강조 여부 확인 |

### REQ-5.2: 규칙 동사 표준 모델 (REQ-2.3.4.5.1)

| 규칙 ID | 동사 유형 | 표준 동사 |
|:---:|:---|:---|
| REQ-5.2.1 | -ar 규칙 변화 | `hablar` |
| REQ-5.2.2 | -er 규칙 변화 | `comer` |
| REQ-5.2.3 | -ir 규칙 변화 | `vivir` |

### REQ-5.3: 시제별 필수 불규칙 동사 (Automation Checklist v5.8)

자동 검증 스크립트는 다음 시제가 챕터에 등장할 경우, 해당 동사들의 **전 인칭 변형 테이블** 존재 여부를 확인합니다.

| 시제 (Tense) | 필수 포함 동사 리스트 |
|:---|:---|
| **Presente** (현재 시제) | `ser`, `estar`, `ir`, `tener`, `saber`, `poder` |
| **Gerundio** (현재진행) | `estar + gerundio` (Gerundio 불규칙: `ir`, `leer`, `repetir`, `decir`, `venir`, `dormir`, `morir`) |
| **Indefinido** (단순과거) | `estar`, `tener`, `poder`, `poner`, `querer`, `saber`, `venir`, `decir`, `dar`, `hacer`, `haber`, `ser/ir` |
| **Imperfecto** (불완료과거) | `ser`, `ir`, `ver` |
| **Futuro** (단순미래) | `decir`, `hacer`, `poder`, `querer`, `saber`, `salir`, `tener`, `venir`, `poner`, `haber` |
| **Perfecto** (현재완료/과거완료) | `haber + participio` (Participio 불규칙: `hacer`, `poner`, `escribir`, `decir`, `volver`, `abrir`, `leer`, `romper`) |
| **Imperativo** (명령형) | `dar`, `ser`, `ver`, `ir`, `decir`, `hacer`, `poner`, `salir`, `tener`, `venir` |

---

## 6. English Bridge 전략 검증

### REQ-6.1: 어휘 테이블 및 문법 매핑

| 규칙 ID | 요구사항 | 검증 방법 |
|:---:|:---|:---|
| REQ-6.1.1 | 3열 구성: **Spanish** / **English Bridge** / **Korean Tip** | 테이블 헤더 확인 |
| REQ-6.1.2 | Perfect Cognates에 **✅** 표시 필수 | `✅` 문자 존재 확인 |
| REQ-6.1.3 | **영어 등가물**(English Equivalent) 우선 제시 후 한국어 설명 | Gramática 섹션 내 영문 키워드 확인 |

---

## 7. 금지 규칙 검증 (Prohibition Rules)

| 규칙 ID | 금지 항목 | 심각도 |
|:---:|:---|:---:|
| REQ-7.1.1 | 오디오(TTS) 생성 및 링크 금지 | **FAIL** |
| REQ-7.1.2 | 동사 변형 마크다운 테이블 (`|---`) 금지 | **FAIL** |
| REQ-7.1.3 | 섹션명 분량 표기 (`1p` 등) 금지 | **FAIL** |
| REQ-7.1.4 | Página 메타 라인 금지 | **FAIL** |
| REQ-7.1.5 | Learning Objectives 영문 표기 금지 | **FAIL** |
| REQ-7.1.6 | 이미지 절대 경로 사용 금지 | **FAIL** |
| REQ-7.1.7 | 서수 인칭 레이블 (`1인칭` 등) 금지 | **FAIL** |

---

## 9. Gold Standard 판정 기준

- **모든** 테스트 케이스에서 **PASS(✅)** 획득 시 → **Gold Standard 달성**
- **1건이라도 FAIL(❌)** 시 → **Gold Standard 미달**, 수동 수정 필수.
