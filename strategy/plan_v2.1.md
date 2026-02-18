# Hola-AL: AI 기반 스페인어 교재 작성 계획 (v2.0)

## 1. 프로젝트 개요

**목표**: 영어 상급(OPIc AL) 한국인을 위한 A1/A2 분리형 모듈식 스페인어 교재 (약 300페이지, A1 ~150p + A2 ~150p)

**핵심 방법론**: English Bridge Strategy — 영어를 매개로 스페인어를 학습하여 효율 극대화

**데이터 소스**:

| 파일 | 내용 | 규모 |
|------|------|------|
| [cer_toc.json](file:///Users/ikyoon/proj/book/cer_toc.json) | Instituto Cervantes A1/A2 커리큘럼 | 20개 섹션, ~100개 하위 토픽 |
| [vol12toc.json](file:///Users/ikyoon/proj/book/vol12toc.json) | **¡Hola, español! 1 & 2** 목차 | 1권: 초급1 (11과) / 2권: 초급2 (9과) |

---

## 1.1 교재 작성 전략 재수립 (Creation Strategy v5.2)

심층 분석을 통해 도출된 핵심 전략은 다음과 같습니다:

### 🎨 디자인 전략: "Modern & Premium Spanish"

- **시각적 언어**: Imagen 3를 활용한 일본 애니메이션 스타일(Modern Anime Style)을 유지하되, 전체적인 레이아웃은 스페인 현대 디자인의 특징인 'Sleek Modernism'을 반영함.
- **컬러 팔레트**: 강렬한 스페인 레드(#A93226)와 골드(#D4AC0D)를 기본으로 하되, 가독성을 위한 소프트 차콜(#2C3E50)과 오프 화이트(#FCF9F2) 배경을 조화롭게 배치하여 프리미엄한 느낌을 강화함.
- **테이블 디자인 (High-End Table Design)**:
  - **헤더**: 평면적인 색상이 아닌, 은은한 그라데이션과 세련된 타이포그래피(Montserrat) 적용.
  - **본문**: 가독성 향상을 위한 Zebra Striping(홀수/짝수 행 구분)과 강조가 필요한 셀에 대한 미세한 쉐도잉 적용.
  - **구조**: `border-radius`와 `box-shadow`를 활용하여 테이블이 페이지 상에 떠 있는 듯한(Elevated) 효과 부여.
- **디자인 정규화**: 900px 중앙 정렬 컨테이너와 충분한 여백(white space)을 통해 읽기 경험을 극대화함.

### ✍️ 콘텐츠 전략: "Deep Dive & Bridge"

- **English Bridge 강화**: 단순 번역이 아닌, '어원(Cognate)'과 '개념적 매핑(to be = ser/estar)'을 통해 영어 상급자의 기존 지식을 최대한 레버리지.
- **분량의 미학**: 챕터당 10-12페이지를 확보하기 위해 Gemini API를 활용, 단순 설명보다는 실전 상황(Scenario)과 풍부한 예문에 집중.
- **A2 확장성**: Cervantes 데이터가 부족한 경우에도 'A1 심화 + 복합 시나리오' 전략을 통해 실전 대응력을 높이는 중급 콘텐츠로 구성.

### ⚙️ 실행(Execution) 전략: "Zero Defect Loop"

- **표준화된 제작 루프**: (1) 원천 데이터(Cervantes/기존 교재) 분석 → (2) Gemini 기반 Enriched 초안 생성 → (3) 전 인칭 동사 테이블 및 연습문제 수량(ABC 5) 논리 검증 → (4) 삽화 생성 및 매핑 → (5) 최종 PDF/HTML 조판.
- **엄격한 규칙 준수**: 11개 섹션 구성, 오디오 배제, 정답지 포함 등 수립된 모든 규칙을 기계적으로 철저히 적용하여 일관성 유지.
- **Rollback 금지 (No Rollback Policy)**: 이전 버전(v5.3 이하)으로의 롤백 계획은 일체 배제하며, 모든 신규 작업 및 수정 사항은 최신 v5.4~v5.6 표준을 엄격히 따름.

---

## 2. 교재 구조 설계

### 2.1 전체 구성: 5개 Part, 15개 Chapter

약 300페이지 분량(A1 ~150p + A2 ~150p)에 맞추어 Instituto Cervantes 20개 섹션을 **15개 Chapter**로 배분합니다.
Chapter당 최대 2개 섹션, 최대 12개 서브토픽으로 밸런스를 유지합니다.

| Part | Ch. | 제목 | Cervantes 섹션 | 서브토픽 | A1 | A2 |
| :--- | :---: | :--- | :--- | :---: | :---: | :---: |
| **I. Yo** | 1 | Mi cuerpo y salud | §1 (신체) + §13 (건강/위생) | 10 | 12p | 10p |
| | 2 | ¿Cómo soy? | §2 (성격/감정/외모) | 4 | 8p | 8p |
| | 3 | Mi identidad | §3 (이름, 국적, 나이, 서류) | 10 | 12p | 10p |
| **II. Mi Vida** | 4 | Familia y amigos | §4 (가족, 사회관계, 축하) | 3 | 8p | 8p |
| | 5 | ¡A comer! | §5 (음식, 음료, 레스토랑) | 7 | 12p | 10p |
| | 6 | Mi casa | §10 (주거, 가전, 가사) | 9 | 10p | 10p |
| **III. Mi Mundo** | 7 | En la escuela | §6 (교육) | 8 | 10p | 10p |
| | 8 | El trabajo | §7 (직업) | 6 | 8p | 8p |
| | 9 | Ocio y arte | §8 (여가/스포츠) + §18 (예술) | 10 | 12p | 12p |
| | 10 | De compras | §12 (쇼핑, 의류, 결제) | 4 | 8p | 10p |
| **IV. Conectados** | 11 | Medios 및 기술 | §9 (미디어) + §16 (IT) | 9 | 10p | 10p |
| | 12 | Viajes y transporte | §14 (여행, 숙박, 교통) | 8 | 10p | 12p |
| **V. Nuestro Mundo** | 13 | 서비스 및 경제 | §11 (서비스) + §15 (경제) | 12 | 10p | 10p |
| | 14 | Sociedad y cultura | §17 (정치/사회) + §19 (종교) | 6 | 8p | 10p |
| | 15 | Naturaleza y geografía | §20 (지리, 기후, 동식물) | 8 | 10p | 10p |
| | | **합계** | | **114** | **~148p** | **~148p** |

### 2.1.1 밸런스 검증

| 지표 | 기존 (12 Ch.) | 개선 (15 Ch.) |
|------|-------------|-------------|
| 최대 서브토픽/Ch. | 26 (Ch.12) | **12** (Ch.13) |
| 최대 섹션/Ch. | 5 (Ch.12) | **2** |
| 서브토픽 범위 | 3~26 | **3~12** |
| 평균 서브토픽/Ch. | 9.5 | **7.6** |

### 2.1.2 커버리지 검증: Cervantes 20개 섹션 → 15 Chapter

| § | 주제 | 서브토픽 | A2 | Chapter |
|---|------|---------|----|---------|
| 1 | Individuo: dimensión física | 4 | — | **Ch.1** |
| 2 | Individuo: dimensión perceptiva y anímica | 4 | — | **Ch.2** |
| 3 | Identidad personal | 10 | 7 | **Ch.3** |
| 4 | Relaciones personales | 3 | — | **Ch.4** |
| 5 | Alimentación | 7 | — | **Ch.5** |
| 6 | Educación | 8 | — | **Ch.7** |
| 7 | Trabajo | 6 | 2 | **Ch.8** |
| 8 | Ocio | 4 | — | **Ch.9** |
| 9 | Información y medios de comunicación | 6 | — | **Ch.11** |
| 10 | Vivienda | 9 | 7 | **Ch.6** |
| 11 | 서비스 | 5 | — | **Ch.13** |
| 12 | 쇼핑, 상점 및 시설 | 4 | — | **Ch.10** |
| 13 | 건강 및 위생 | 6 | — | **Ch.1** |
| 14 | 여행, 숙박 및 교통 | 8 | 7 | **Ch.12** |
| 15 | 경제 및 산업 | 7 | 6 | **Ch.13** |
| 16 | 과학 및 기술 | 3 | — | **Ch.11** |
| 17 | 정부, 정치 및 사회 | 5 | 1 | **Ch.14** |
| 18 | 예술적 활동 | 6 | — | **Ch.9** |
| 19 | 종교 및 철학 | 1 | — | **Ch.14** |
| 20 | 지리 및 자연 | 8 | 4 | **Ch.15** |
| | **합계** | **114** | **34** | **전체 커버** ✅ |

## 2.2 각 Chapter의 내부 구조 (표준 템플릿, ~10p)

| 순서 | 섹션명 (h2) | 주요 내용 및 특징 | 분량 (권장) |
| :--- | :--- | :--- | :--- |
| 1 | **1. Opener** | 챕터 도입부, **학습 목표(한국어로만 작성, '(Learning Objectives)' 삭제)**, 흥미 유발 질문 및 '¿Sabías que...?'(문화 상식) 팁 포함 | 1p |
| 2 | **2. Vocabulario Esencial** | **Imagen 3 애니메이션 일러스트(단어 라벨 매핑)** + English Bridge 어휘 표 + 암기 팁 | 2-3p |
| 3 | **3. Expresiones Útiles** | 상황별 핵심 패턴 및 필수 구어체 표현 (실용 예문 위주) | 1-2p |
| 4 | **4. Gramática Esencial** | **한국어로만 구성된 깊이 있는 문법 설명(권장 분량 준수)** + **영어권 학습자를 위해 어근/어미 변화(Stem/Ending changes)의 규칙과 팁을 영어 매핑과 함께 자세히 설명** + 'Korean Tip' + **전 인칭 동사 변형 테이블 및 시각적 효과(색상, 굵게 등) 필수** | 2-3p |
| 5 | **5. Cultura Viva** | **영문 설명 배제, 스페인어로만 작성된 심도 있는 칼럼(권장 분량 준수)** + **스페인어본 하단에 한국어 번역 필수 추가** + **Imagen 3 전용 이미지 필수** | 1p |
| 6 | **6. Práctica** | 빈칸 채우기, 매칭, 번역 연습 (A, B, C 각각 5문항 필수) | 1-2p |
| 7 | **7. Lectura 📖** | 주제 관련 독해 텍스트 및 문제 + **한국어 번역 필수 포함** | 1-2p |
| 8 | **8. Diálogo** | 실생활 밀착형 대화문 (8~12턴) **(테이블 형식 - 좌:ES / 우:KO)** + **대화 상황에 대한 자세한 설명 필수 (스페인어 우선, 그 다음 한국어 추가)** | 1p |
| 9 | **9. Repaso** | 핵심 요약 체크리스트 및 학습 성취도 자기 평가 (풍부한 내용) | 0.5-1p |
| 10 | **10. Cierre** | 학습 마무리 요약 및 고무적인 메시지 (풍부한 내용) | 0.5-1p |
| 11 | **11. Soluciones** | 연습문제(Práctica)에 대한 정답 (본문 마지막 필수 포함) | 0.5p |

### 2.3 콘텐츠 생성 규칙

> [!IMPORTANT]
> 모든 챕터 생성 시 반드시 아래 규칙을 준수합니다.

#### 2.3.1 기본 원칙 및 분량 확보

- **2.3.1.1 Gemini API 활용**: secrets 폴더에 저장된 Gemini API Key를 이용해 컨텐츠를 풍부하게 생성함.
- **2.3.1.2 분량 확보**: 각 장의 학습 목표를 완벽히 달성할 수 있도록 내용을 심화하고, **챕터당 권장 분량(10-12페이지)**을 반드시 충족하도록 텍스트와 예문을 대폭 확장할 것.

#### 2.3.2 섹션 구성 및 메타 데이터

- **2.3.2.1 11개 섹션 필수 준수 (Enriched Content v4.30)**: 모든 챕터는 반드시 지정된 11개 섹션을 포함하며, 각 섹션(특히 유용한 표현, 읽기, 대화)은 단순 나열을 넘어 상황 설명과 풍부한 예문을 제공하여 실용성을 극대화함.
- **2.3.2.2 Página 메타 라인 삭제**: 챕터 헤더에 "Página: A1 교재 Part I. Yo — 12p" 같은 내부 페이지 메타 정보를 표시하지 않음. Cervantes 참조만 유지.
- **2.3.2.3 섹션별 페이지 수 표시 금지**: 섹션 제목에 "(1p)", "(2p)", "(0.5p)" 등 분량 표기를 하지 않음. 예: `## 1. Opener` (✅), `## 1. Opener (1p)` (❌)

#### 2.3.3 디자인 및 시각 요소

- **2.3.3.1 스페인 최신 디자인 컨셉**: 교재 전체적으로 최신 스페인 디자인 감성(색깔, 이미지, 아이콘 등)이 넘치도록 작성. 따뜻하고 열정적이면서도 모던하고 감각적인 분위기 유지.
- **2.3.3.2 이미지 생성 가이드라인**: strategy/image.md 가이드라인대로 생성해줘.
- **2.3.3.2.1 '2. Vocabulario Esencial' 이미지 스타일**: 2. Vocabulario Esencial 섹션 어휘가 100% 이미지에 반영되도록 구성해야 함 (어휘와 삽화의 완전한 일치 필수. 어휘 넘버가 삽화에 빠짐없이 모두 표시).
- **2.3.3.2.2 '5. Cultura Viva' 섹션 이미지 생성 가이드라인**: 해당 섹션 내용을 최대한 반영한 이미지 생성.
- **2.3.3.2.3 로컬 이미지 저장 및 상대 경로 사용**: 생성된 모든 이미지는 프로젝트 내 `images/` 폴더에 저장하고, 마크다운 파일에서는 `../images/[파일명]`과 같은 상대 경로를 사용함.

#### 2.3.4 문법 및 동사 변형 테이블 (Grammar v5.8)

- **2.3.4.1 어근/어미 변화(Stem/Ending changes) 심층 분석**: 영어권 학습자가 직관적으로 이해할 수 있도록 어근(Stem)과 어미(Ending)의 분리, 변화 규칙(e→ie, o→ue 등)을 시각적 효과(색상, **Bold**)를 사용하여 자세히 설명할 것.
- **2.3.4.2 전 인칭 커버 (MANDATORY)**: 모든 테이블은 주어(yo, tú, él/ella/usted, nosotros/as, vosotros/as, ellos/ellas/ustedes)를 모두 포함해야 함.
- **2.3.4.3 레이블 간소화**: 서수 레이블(1인칭 등)은 삭제하고 오직 주어만 표시할 것.
- **2.3.4.4 테이블 레이아웃 (STRICT HTML ONLY)**:
  - **마크다운 테이블 금지**: 텍스트 레이아웃 깨짐을 방지하기 위해 컨텐츠 생성 시 **동사 변형용 마크다운 테이블(`|`) 사용을 전면 금지**함.
  - **HTML 테이블 필수**: 모든 동사 변형 테이블은 반드시 **Raw HTML `<table>` 태그**를 사용하여 작성할 것.
  - **어미 강조**: HTML `<strong>` 또는 `<span>` 태그를 사용하여 어미(Ending)에만 Bold 또는 색상 효과를 적용할 것.
- **2.3.4.5 동사 표준**: 규칙 변화 모델은 반드시 hablar (-ar), comer (-er), vivir (-ir) 삼총사를 사용할 것. 가독성을 위해 한 테이블당 최대 4개의 동사만 배치할 것.
- **2.3.4.6 시제별 필수 테이블**: 아래 시제 등장 시 해당 챕터에 반드시 **전 인칭 변형 테이블**이 포함되어야 함:
  - 현재 시제: ser, estar, ir, tener, saber, poder
  - 현재진행 시제: estar + gerundio (Gerundio 불규칙: ir, leer, repetir, decir, venir, dormir, morir 필수 포함)
  - 단순과거(Indefinido): estar, tener, poder, poner, querer, saber, venir, decir, dar, hacer, haber, ser/ir
  - 불완전과거(Imperfecto): ser, ir, ver
  - 단순미래: decir, hacer, poder, querer, saber, salir, tener, venir, poner, haber
  - 현재완료: haber + 과거분사 (Participio 불규칙: hacer, poner, escribir, decir, volver, abrir, leer, romper 필수 포함)
  - 긍정/부정 명령형: dar, ser, ver, ir, decir, hacer, poner, salir, tener, venir

#### 2.3.5 기타 부가 규칙

- **2.3.5.1 연습문제 수량 및 정렬 표준화 (Práctica v4.35)**: 6. Práctica 섹션의 모든 하위 파트(A, B, C)는 반드시 각각 5문항씩 생성해야 함.
- **2.3.5.2 어휘 표 범례 (External Legend)**: 어휘 표 바로 하단에 ✅ 기호의 의미를 명시하되, 테이블의 테두리(border)나 박스 안에 포함되지 않도록 별개의 일반 텍스트 문단으로 작성할 것.
- **2.3.5.3 오디오 미사용**: 교재 내 어떤 섹션에서도 오디오(TTS) 생성 및 링크를 포함하지 않음.
- **2.3.5.4 정답지(Answer Key) 제공**: 모든 챕터의 마지막(11. Soluciones)에 6. Práctica 섹션의 모든 문제에 대한 정확한 정답을 포함해야 함.
- **2.3.5.5 HTML 가독성 및 디자인 요건**: 웹 브라우저 뷰어에서의 가독성을 위해 HTML 생성 시 본문을 가로폭 900px의 중앙 정렬 컨테이너로 감싸고, 충분한 좌우 여백을 부여함. PDF 출력 시에는 @media print 스타일 적용.

---

## 3. 문법 매핑: 기존 교재 2권 → Chapter 배정

vol12toc.json은 **별도의 2권** 교재 목차입니다. 두 권의 문법 항목을 모두 반영하여 Chapter에 배치합니다.

### 📘 교재 1권: 초급1 (11과)

| Lección | 핵심 문법 | 어휘/부가 | 배정 Chapter |
| :---: | :--- | :--- | :--- |
| L0 예비과 | 알파벳/발음/강세, 명사·형용사 성수 | — | **서문** (발음 가이드) |
| L1 ¡Hola! | 주격인칭대명사, ser, 직업 명사 | 인사말 | **Ch.3** (신분) |
| L2 ¿Cómo estás? | estar, ser vs estar, 형용사 | 가족명 | **Ch.2** (성격) → 가족명→**Ch.4** |
| L3 ¿De dónde eres? | 국적형용사, 관사, mucho/muy | 국명/국적형용사 | **Ch.3** (신분) |
| L4 Este es mi amigo | 지시사, 소유사 전치형, quién | 인사말 | **Ch.4** (가족) → 인사말→**Ch.3** |
| L5 Hay muchos libros | hay vs estar, 위치 부사, 숫자 | 집과 방의 집기들 | **Ch.6** (주거) |
| L6 Hablo español | 규칙동사 현재형, saber/poder | 규칙동사 | **Ch.7** (교육) |
| L7 ¿Adónde vas? | ir/venir/hacer, tener 관용표현 | 신체 부위 | **Ch.1** (신체) + **Ch.9** (여가) |
| L8 Te doy un regalo | 목적대명사, 전치격 인칭대명사 | 감탄문, 기원 표현 | **Ch.11** (미디어) + **Ch.4** (축하) |
| L9 En el restaurante | querer/preferir, traer/poner | 먹거리/식기류 | **Ch.5** (음식) |
| L10 Hace buen tiempo | 날씨, hacer+시간+que, 의무 표현 | 계절, 방위, 시간대 | **Ch.12** (여행) + **Ch.15** (자연) |
| L11 Hoy es 1 de junio | 날짜/요일, 시간, 교통수단 | 시간 표현, 교통수단 | **Ch.12** (여행) |

### 📗 교재 2권 (Part 2): 심화 문법 — Lección 1~9

| Lección | 핵심 문법 | 어휘/부가 | 배정 Chapter |
| :---: | :--- | :--- | :--- |
| L1 ¿Qué fruta te gusta? | gustar, 부정어, 색깔 | 스포츠/취미, 동의/반의 | **Ch.5** + **Ch.9** + **Ch.10** |
| L2 ¿Cómo le queda? | quedar/doler/interesar, 가격 | 의류, 쇼핑하기 | **Ch.10** (쇼핑) + **Ch.1** (건강) |
| L3 Me levanto a las siete | 재귀동사, 소유사 후치형 | 기타 재귀동사 | **Ch.4** (가족) + **Ch.2** (성격) |
| L4 Estoy estudiando | 현재진행형, 비교급/최상급 | 절대최상급, 만남 약속 | **Ch.7** (교육) + **Ch.9** (여가) |
| L5 Cantarán en la fiesta | 미래시제, 가정문(si) | 미래 시간, 동의/확신 | **Ch.9** (여가) + **Ch.14** (사회) |
| L6 Ayer llegué tarde | 현재완료, 단순과거 | 전화 통화, 빈도 표현 | **Ch.14** (사회) + **Ch.11** (미디어) |
| L7 ¿Cómo eras de niña? | 불완료과거 | 노래로 과거시제 | **Ch.14** (사회) |
| L8 Ya había salido el tren | 과거완료, 전치사+동사 구문 | 문자메시지로 과거시제 | **Ch.14** (사회) + **Ch.11** (미디어) |
| L9 Siga recto | 긍정/부정 명령형 | 명령형 감탄사/표현 | **Ch.12** (여행) |

### 종합 매핑 요약: 15 Chapter × 문법/어휘 소스

| Ch. | 주제 | 1권 문법 | 1권 어휘/부가 | 2권 문법 | 2권 어휘/부가 |
|-----|------|---------|-------------|---------|-------------|
| 1 | 신체/건강 | L7 tener | L7 신체 부위 | L2 doler | — |
| 2 | 성격/감정 | L2 ser/estar | — | L3 재귀동사 | L3 기타 재귀동사 |
| 3 | 신분 | L1 ser, L3 국적 | L1·L4 인사말, L3 국명 | — | — |
| 4 | 가족/관계 | L4 지시사/소유사 | L2 가족명, L8 감탄문/기원 | L3 소유사 후치형 | — |
| 5 | 음식 | L9 querer/preferir | L9 먹거리/식기류 | L1 gustar | — |
| 6 | 주거 | L5 hay/estar | L5 집기들 | — | — |
| 7 | 교육 | L6 규칙동사, saber/poder | L6 규칙동사 | L4 진행형/비교급 | L4 절대최상급/만남 약속 |
| 8 | 직업 | — | — | — | — |
| 9 | 여가/예술 | L7 ir/venir | — | L5 미래/가정문 | L1 스포츠/취미, L4 만남, L5 미래/동의 |
| 10 | 쇼핑 | — | — | L1 색깔, L2 가격 | L1 동의/반의, L2 의류/쇼핑 |
| 11 | 미디어/IT | L8 목적대명사 | L7 이해 안 될 때 표현 | — | L6 전화/빈도, L8 문자메시지 |
| 12 | 여행 | L10 날씨, L11 시간/교통 | L10 계절/방위/시간대, L11 교통수단 | L9 명령형 | L9 명령형 감탄사 |
| 13 | 서비스/경제 | — | — | — | — |
| 14 | 사회/문화 | — | L10 계절/방위 | L5 의견, L6~8 과거 3종 | L7 노래로 과거시제 |
| 15 | 자연/지리 | L10 날씨 | L10 계절/방위 | — | — |

> [!NOTE]
> Ch.8 (직업), Ch.13 (서비스/경제)은 기존 교재에서 직접 다루지 않는 신규 영역으로,
> Cervantes 커리큘럼 어휘를 중심으로 새롭게 구성합니다.

---

## 4. English Bridge 방법론 적용 규칙

### 4.1 어휘 테이블 작성 기준

| Spanish | English Bridge | Korean Tip |
| :--- | :--- | :--- |
| nariz | Nasal (→ nose-related) | 'ㄹ' 발음 주의 |
| hospital | Hospital ✅ (Perfect Cognate) | — |
| biblioteca | Bibliography → Library | '도서관'과 혼동 주의 |

**규칙**:

1. **Perfect Cognates** (hospital, hotel, animal): ✅ 표시 후 의미 확인만
1. **Near Cognates** (nación→nation, familia→family): 어원 설명 + 스펠링 차이 표기
1. **False Friends** (embarazada≠embarrassed): ⚠️ 경고 표시, 정확한 의미 명시
1. **No Cognate** (perro, gato): 기억 팁(mnemonic) 또는 한국어 설명 활용

### 4.2 문법 설명 방식

- 스페인어 문법 개념을 먼저 **영어 등가물로 매핑** 후, 차이점만 한국어로 보충
- 예: "*Ser* = 'to be' for permanent traits, *Estar* = 'to be' for temporary states. 한국어에는 이 구분이 없으므로 주의."

---

## 5. 콘텐츠 생성 파이프라인

### Phase 1: 데이터 정제 (현재 완료)

- [x] [cer_toc.json](file:///Users/ikyoon/proj/book/cer_toc.json) — Cervantes 커리큘럼 JSON 변환 완료
- [x] [vol12toc.json](file:///Users/ikyoon/proj/book/vol12toc.json) — 기존 교재 목차 JSON 변환 완료

### Phase 2: Chapter별 콘텐츠 생성

각 Chapter마다 Gemini API로 다음을 순차 생성:

1. **어휘 테이블** (A1/A2 분리) — English Bridge 포맷
1. **표현 & 예문** — 난이도별 예문 (ES + EN)
1. **문법 해설** — 영어 매핑 중심
1. **Korean Tip** — 한국인 특화 주의점
1. **연습문제** — 빈칸, 매칭, 번역
1. **대화문** — 실전 시나리오
1. **학습 유관 이미지** — 2. Vocabulario Esencial 섹션에 삽입될 유관 이미지 생성 (Imagen 3). 해당 섹션의 **어휘 내용을 100% 반영**하고, 디자인 컨셉은 **일본 애니메이션 스타일**을 적용하여 상세하고 감각적으로 생성. 단, 전체적인 컬러 팔레트는 스페인 디자인 테마(Red, Ochre)와 조화를 이루도록 함.

### Phase 3: 최종 검수 및 PDF 조판

- **검수**: 모든 섹션의 텍스트 무결성, 이미지 매핑 상태 및 레이아웃 최종 확인.

---

## 8. 생성된 챕터 검증 (Verification Strategy v2.0)

모든 챕터는 수립된 요구사항을 100% 충족해야 하며, 이를 위해 Playwright 기반의 자동화 검증 파이프라인을 운영합니다.

### 8.1 검증 기준 (Source of Truth)

- **요구사항 명세서**: [requirement_spec.md](file:///Users/ikyoon/proj/book/strategy/requirement_spec.md)
- 검증 엔진은 위 명세서에 정의된 구조(11개 섹션), 디자인(CSS/레이아웃), 문법(HTML 테이블/필수 불규칙 동사) 규칙을 기준으로 모든 파일을 구석구석 검사합니다.

### 8.2 자동화 검증 프로세스 (Playwright Pipeline)

1. **대상**: `chapters/*.md` 파일을 HTML로 렌더링한 결과물.
1. **도구**: `scripts/verify_grammar.js` (Playwright Engine)
1. **검증 항목**:
    - **구조 검증**: 11개 섹션의 존재 및 순서, 섹션명 명명 규칙 준수 여부, 삽화 이미지 생성 여부. 2. Vocabulario Esencial 섹션의 이미지가 어휘 내용을 100% 반영하는지 확인.((단어 라벨 매핑) 확인 필수) 5. Cultura Viva의 삽화 이미지 생성 여부 확인.
    - **디자인/레이아웃**: 900px 컨테이너 적용, 이미지 상대 경로 및 스타일 유효성.
    - **문법 및 동사 테이블**:
        - 모든 변형 테이블의 HTML `<table>` 태그 사용 여부 (마크다운 테이블 사용 시 즉시 실패).
        - 시제별 필수 불규칙 동사 포함 여부 및 6개 인칭 완결성.
        - HTML `<strong>` 또는 `<span>` 태그를 활용한 어미 강조 여부.

### 8.3 검증 레포트 및 품질 보증 (Gold Standard)

- **자동 레포트 생성**: 검증 완료 후 `output/verification_report.md`에 상세 결과 및 오류 지점을 기록합니다.
- **Gold Standard 달성**: 모든 검증 항목에서 PASS(✅)를 획득해야만 'Gold Standard'로 인정하며, 최종 PDF 빌드 단계로 진행합니다.

---
