# Hola-AL: Test Plan v2.1

본 문서는 `plan_v2.1.md (v5.2)`, `requirement_spec_v2.1.md`, 그리고 `image.md`를 기반으로 작성된 **통합 테스트 계획서**입니다. 교재 제작의 전 과정에서 일관된 품질을 유지하고 'Gold Standard'를 달성하기 위한 검증 전략을 정의합니다.

---

## 1. 테스트 목적 (Objective)

- **Gold Standard 달성**: 30개 챕터 전체가 최신 v2.1 규격(Grammar v5.8, Design v5.2)을 100% 충족하는지 검증.
- **결함 제로 (Zero Defect)**: 코드 스위칭 오류(한-서 혼용), 마크다운 문법 오류, 이미지 매핑 불일치를 사전에 차단.
- **경험의 프리미엄화**: 시각적 디자인과 내용의 깊이가 사용자에게 프리미엄 브랜드 경험을 제공하는지 확인.

---

## 2. 테스트 범위 및 방법론 (Test Scope & Methodology)

### 2.1 단계별 검증 체계

| 단계 | 유형 | 도구 | 주요 검증 항목 |
|:---|:---:|:---|:---|
| **Phase 1: 구조 및 문법** | 자동화 | `verify_grammar.js` | 11개 필수 섹션, HTML 동사 테이블, 금지 패턴 |
| **Phase 2: 시각 및 디자인** | 수동/시각 | 브라우저 프리뷰 | Modern Anime Style, Golden Hour 조명, 테이블 디자인 |
| **Phase 3: 내용 및 품질** | 분석적 | LLM/수동 | 전 인칭 변형 정확성, English Bridge 적성, 코드 스위칭 수정 |

---

## 3. 자동화 테스트 계획 (Automated Verification)

### 3.1 Playwright 파이프라인 (`scripts/verify_grammar.js`)

`requirement_spec_v2.1.md`에 정의된 모든 `TC-x.x.x`를 자동으로 수행합니다.

- **구조**: 필수 11개 섹션의 존재 및 순서 확인.
- **문법 (Grammar v5.8)**: 7대 필수 시제 및 명령형의 전 인칭 변형 테이블(HTML) 확인.
- **디자인**: 900px 컨테이너, 스페인 테마 컬러(#A93226, #D4AC0D) 적용 여부.
- **금지 항목**: 마크다운 동사 테이블, 오디오 링크, 페이지 번호 메타데이터 등 검출.

---

## 4. 시각 및 디자인 테스트 계획 (Visual & Design)

### 4.1 이미지 품질 검증 (Manual Checklist)

`image.md` 가이드라인 준수 여부를 확인합니다.

- **Vocab 매핑**: 어휘 테이블의 모든 단어가 이미지 내 번호 라벨(1~17 등)과 1:1 매치되는지 확인.
- **스타일 일관성**: 'Modern Anime Style'과 'Golden Hour' 조명이 전 챕터에 걸쳐 유지되는지 확인.
- **감성적 가치**: Cultura Viva 이미지가 "Travel & Emotion" 컨셉(Wanderlust 유발)을 충족하는지 확인.
- **현지화**: 일본어/한자 등 불필요한 텍스트가 삽화 내에 포함되지 않았는지 확인.

### 4.2 레이아웃 검증

- **High-End Table**: 동사 및 유용한 표현 테이블에 그라데이션, Zebra Striping, Elevated 효과가 적용되었는지 확인.
- **여백**: 900px 컨테이너 내부의 패딩과 섹션 간 간격이 시각적으로 쾌적한지 확인.

---

## 5. 내용 및 언어 테스트 계획 (Content & Language)

### 5.1 English Bridge 및 한국어 특화

- **Cognate 검증**: ✅ 기호가 Perfect Cognates에 정확히 배정되었는지 확인.
- **설명 논리**: 영어 등가물(EN Equivalent) 설명 후 한국어 보충 설명이 이루어지는 구조 확인.
- **코드 스위칭 차단**: 스페인어 본문(Lectura, Diálogo) 내에 한국어 조사나 단어가 섞여 있지 않은지 철저히 검사.

### 5.2 문제 및 정답지

- **Práctica 수량**: 파트별(A, B, C) 정확히 5문항씩 총 15문항인지 확인.
- **Soluciones 일치**: 정답지 내용이 실제 문제와 논리적으로 일치하는지 확인.

---

## 6. 결함 관리 및 판정 (Pass/Fail Criteria)

- **CRITICAL (FAIL)**: 자동화 테스트(verify_grammar.js) 실패 시. 즉시 수정 필요.
- **MAJOR (WARNING)**: 이미지 스타일 미세 불일치, 오타, 문맥 매끄럽지 않음.
- **Gold Standard 인정**: 모든 검증 항목(자동+수동)에서 PASS를 획득한 챕터만 빌드 대상으로 확정.

---

## 7. 리포팅 및 문서화

- **Verification Report**: 검증 완료 후 `output/verification_report.md` 자동 생성 및 업데이트.
- **Revision Control**: 결함 수정 후 `README.md`의 프로젝트 리비전 업데이트를 통해 마일스톤 관리.
