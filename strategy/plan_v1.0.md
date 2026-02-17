# Hola-AL: AI 기반 스페인어 교재 작성 계획

## 1. 프로젝트 개요

**목표**: 영어 상급(OPIc AL) 한국인을 위한 A1/A2 분리형 모듈식 스페인어 교재 (약 300페이지, A1 ~150p + A2 ~150p)

**핵심 방법론**: English Bridge Strategy — 영어를 매개로 스페인어를 학습하여 효율 극대화

**데이터 소스**:

| 파일 | 내용 | 규모 |
|------|------|------|
| [cer_toc.json](file:///Users/ikyoon/proj/book/cer_toc.json) | Instituto Cervantes A1/A2 커리큘럼 | 20개 섹션, ~100개 하위 토픽 |
| [vol12toc.json](file:///Users/ikyoon/proj/book/vol12toc.json) | **¡Hola, español! 1 & 2** 목차 | 1권: 초급1 (11과) / 2권: 초급2 (9과) <br> ![Vol 1](/Users/ikyoon/.gemini/antigravity/brain/1b710f87-7082-4e3c-a664-5d801694e66b/vol1_cover.jpg) ![Vol 2](/Users/ikyoon/.gemini/antigravity/brain/1b710f87-7082-4e3c-a664-5d801694e66b/vol2_cover.jpg) |

---

## 1.1 교재 작성 전략 재수립 (Creation Strategy v5.2)

심층 분석을 통해 도출된 핵심 전략은 다음과 같습니다:

### 🎨 디자인 전략: "Modern Anime meets Spain"
- **시각적 언어**: Imagen 3를 활용한 일본 애니메이션 스타일(Modern Anime Style)을 일관되게 적용. 인물은 '대학생'을 기본으로 하여 타겟 학습자(상급 영어 사용자)의 감각에 맞춤.
- **컬러 팔레트**: 스페인 전통의 따뜻함(Red, Ochre)과 모던한 세련미(Clean Layout)의 조화.
- **디자인 정규화**: 불필요한 메타 정보(Página 등)를 배제하고, 여백과 타이포그래피(900px centered)를 통해 읽기 경험 최적화.

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
|---|------|---------|----|----|
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
| 4 | **4. Gramática Esencial** | **한국어로만 구성된 깊이 있는 문법 설명(권장 분량 준수)** + 'Korean Tip' + **전 인칭 동사 변형 테이블 필수** | 2-3p |
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

- **Gemini API 활용 및 분량 확보** — secrets 폴더에 저장된 Gemini API Key를 이용해 컨텐츠를 풍부하게 생성함. 각 장의 학습 목표를 완벽히 달성할 수 있도록 내용을 심화하고, **챕터당 권장 분량(10-12페이지)**을 반드시 충족하도록 텍스트와 예문을 대폭 확장할 것.
- **11개 섹션 필수 준수 (Enriched Content v4.30)** — 모든 챕터는 반드시 지정된 11개 섹션을 포함하며, 각 섹션(특히 유용한 표현, 읽기, 대화)은 단순 나열을 넘어 상황 설명과 풍부한 예문을 제공하여 실용성을 극대화함.
- **Página 메타 라인 삭제** — 챕터 헤더에 "Página: A1 교재 Part I. Yo — 12p" 같은 내부 페이지 메타 정보를 표시하지 않음. Cervantes 참조만 유지.
- **섹션별 페이지 수 표시 금지** — 섹션 제목에 "(1p)", "(2p)", "(0.5p)" 등 분량 표기를 하지 않음. 예: ## 1. Opener (✅), ## 1. Opener (1p) (❌)
- **스페인 최신 디자인 컨셉** — 교재 전체적으로 최신 스페인 디자인 감성(색깔, 이미지, 아이콘 등)이 넘치도록 작성. 따뜻하고 열정적이면서도 모던하고 감각적인 분위기 유지. **어휘 이미지는 일본 애니메이션 스타일(Modern Anime Style)**을 채택하여 학습자의 흥미를 유발하되, 전체적인 컬러톤은 스페인 테마에 맞춤.
- **연습문제 수량 및 정렬 표준화 (Práctica v4.35)**
    - **수량**: 6. Práctica 섹션의 모든 하위 파트(A, B, C)는 반드시 각각 5문항씩 생성해야 함.
    - **정렬 (MANDATORY)**: 'A. Match the word' 같은 매칭 문제에서 좌측 단어와 우측 선택지(a, b, c...)가 깔끔하게 정렬되도록 보이지 않는 2단 테이블(borderless table) 형식을 사용할 것.
    - **번역 연습**: 'C. 번역 연습'은 번호 1~5를 순차적으로 부여하며, 가독성을 위해 조밀하게 구성함.
    - **빈칸 서식**: B 파트 등의 빈칸은 도트(...................)를 사용하여 레이아웃 깨짐을 방지함.
- **동사 변형 테이블 표준화** — 4. Gramática Esencial 섹션에서 새로운 시제/활용 도입 시 다음 표준을 준수할 것:
    - **전 인칭 커버 (MANDATORY)**: 모든 테이블은 주어(yo, tú, él/ella/usted, nosotros/as, vosotros/as, ellos/ellas/ustedes)를 모두 포함해야 함.
    - **레이블 간소화**: 서수 레이블(1인칭 등)은 삭제하고 오직 주어만 표시할 것.
    - **규칙 동사 표준**: 규칙 변화 모델은 반드시 hablar (-ar), comer (-er), vivir (-ir) 삼총사를 사용할 것.
    - **테이블 구성**: 가독성을 위해 한 테이블당 최대 4개의 동사만 배치할 것 (초과 시 여러 테이블로 분할).
    - **대표 불규칙 동사 (시제별 필수 리스트)**: 시제 등장 시 아래 리스트를 반드시 커버할 것:
        - 현재 시제: ser, estar, ir, tener, saber, poder
        - 현재진행 시제: estar + ir/leer/repetir/decir/venir/dormir/morir
        - 단순과거 시제: estar, tener, poder, poner, querer, saber, venir, decir, dar, hacer, haber, ser/ir
        - 불완전과거 시제: ser, ir, ver
        - 단순미래 시제: decir, hacer, poder, querer, saber, salir, tener, venir, poner, haber
        - 현재완료 시제: haber + hacer/poner/escribir/decir/volver/abrir/leer/romper
        - 긍정명령형: dar, ser, ver, ir, decir, hacer, poner, salir, tener, venir
        - 부정명령형: no + dar/ser/ver/ir/decir/hacer/poner/salir/tener/venir
- **어휘 표 범례 표시 (External Legend)** — 어휘 표 바로 하단에 ✅ 기호의 의미를 명시하되, 테이블의 테두리(border)나 박스 안에 포함되지 않도록 전혀 별개의 일반 텍스트 문단으로 작성할 것. (가독성을 위해 작고 연한 스타일 적용)
- **오디오 미사용** — 교재 내 어떤 섹션에서도 오디오(TTS) 생성 및 링크를 포함하지 않음.
- **정답지(Answer Key) 제공** — 모든 챕터의 마지막(11. Soluciones)에 6. Práctica 섹션의 모든 문제에 대한 정확한 정답을 포함해야 함.
- **이미지 생성 가이드라인** — 교재의 모든 이미지는 디자인의 일관성을 위해 반드시 Vertex AI Imagen 3 API만 사용하여 생성할 것. 생성된 이미지는 혐오스럽지 않아야 하며(어린이가 봐도 문제없도록), 인물은 대학생 기준으로 생성할 것 (단, 어린이나 노인이 테마상 꼭 필요한 경우는 허용). 디자인 컨셉은 계속해서 **일본 애니메이션 스타일(Modern Anime Style)**을 유지하며, 해당 섹션에서 다루는 어휘가 100% 이미지에 반영되도록 구성해야 함 (어휘와 삽화의 완전한 일치 필수). **중요: 이미지 내에 일본어나 한자 등 교재와 관련 없는 언어가 포함되지 않도록 프롬프트에서 엄격히 통제할 것.**
- **로컬 이미지 저장 및 상대 경로 사용** — 생성된 모든 이미지는 프로젝트 내 images/ 폴더에 저장하고, 마크다운 파일에서는 ../images/[파일명]과 같은 상대 경로를 사용하여 참조할 것. 이는 웹 브라우저(file://)에서 HTML 파일을 열었을 때 이미지가 정상적으로 표시되도록 하기 위함임.
- **HTML 가독성 및 디자인 요건** — 웹 브라우저 뷰어에서의 가독성을 위해 HTML 생성 시 본문을 가로폭 900px의 중앙 정렬 컨테이너로 감싸고, 충분한 좌우 여백(padding)을 부여할 것. 단, PDF 출력 시에는 표준 교재 규격이 유지되도록 @media print 스타일을 적용하여 대응함.

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
2. **Near Cognates** (nación→nation, familia→family): 어원 설명 + 스펠링 차이 표기
3. **False Friends** (embarazada≠embarrassed): ⚠️ 경고 표시, 정확한 의미 명시
4. **No Cognate** (perro, gato): 기억 팁(mnemonic) 또는 한국어 설명 활용

### 4.2 문법 설명 방식

- ス페인어 문법 개념을 먼저 **영어 등가물로 매핑** 후, 차이점만 한국어로 보충
- 예: "*Ser* = 'to be' for permanent traits, *Estar* = 'to be' for temporary states. 한국어에는 이 구분이 없으므로 주의."

---

## 5. 콘텐츠 생성 파이프라인

### Phase 1: 데이터 정제 (현재 완료)

- [x] [cer_toc.json](file:///Users/ikyoon/proj/book/cer_toc.json) — Cervantes 커리큘럼 JSON 변환 완료
- [x] [vol12toc.json](file:///Users/ikyoon/proj/book/vol12toc.json) — 기존 교재 목차 JSON 변환 완료

### Phase 2: Chapter별 콘텐츠 생성

각 Chapter마다 Gemini API로 다음을 순차 생성:

1. **어휘 테이블** (A1/A2 분리) — English Bridge 포맷
2. **표현 & 예문** — 난이도별 예문 (ES + EN)
3. **문법 해설** — 영어 매핑 중심
4. **Korean Tip** — 한국인 특화 주의점
5. **연습문제** — 빈칸, 매칭, 번역
6. **대화문** — 실전 시나리오
7. **학습 유관 이미지** — 2. Vocabulario Esencial 섹션에 삽입될 유관 이미지 생성 (Imagen 3). 해당 섹션의 **어휘 내용을 100% 반영**하고, 디자인 컨셉은 **일본 애니메이션 스타일**을 적용하여 상세하고 감각적으로 생성. 단, 전체적인 컬러 팔레트는 스페인 디자인 테마(Red, Ochre)와 조화를 이루도록 함.

### Phase 3: 최종 검수 및 PDF 조판

- **검수**: 모든 섹션의 텍스트 무결성, 이미지 매핑 상태 및 레이아웃 최종 확인.

---

## 📕 hola_al_a1.pdf — A1 교재 목차 (~150p)

| 페이지 | 내용 |
|-------|------|
| i–vi | **서문**: 사용법, English Bridge 소개, 발음 가이드 (L0 알파벳/강세/부호) |

| Part | Ch. | 제목 | 어휘 (Cervantes A1) | 문법 (1권 중심) | 문화 | p |
|------|-----|------|-------------------|---------------|------|---|
| **I** | 1 | Mi cuerpo y salud | §1 신체(81w) + §13 건강 | L7 tener 관용 | 스페인 의료 시스템 | 12p |
| | 2 | ¿Cómo soy? | §2 성격/감정(33w) | L2 ser vs estar | 스페인 vs 중남미 인사 | 8p |
| | 3 | Mi identity | §3 이름/국적(72w) | L1 ser, L3 국적/관사 | DNI & 이름 문화 | 12p |
| **II** | 4 | Familia y amigos | §4 가족/관계(37w) | L4 지시사/소유사 | 가족 중심 문화 | 8p |
| | 5 | ¡A comer! | §5 음식/음료(108w) | L9 querer/preferir | 타파스 & 식사 시간 | 12p |
| | 6 | Mi casa | §10 주거/가전(41w) | L5 hay/estar, 위치 | 스페인 주거 형태 | 10p |
| **III** | 7 | En la escuela | §6 교육(87w) | L6 규칙동사, saber/poder | 스페인 교육 제도 | 10p |
| | 8 | El trabajo | §7 직업(45w) | — (어휘 중심) | 스페인 근무 문화 | 8p |
| | 9 | Ocio y arte | §8+§18 여가/예술(127w) | L7 ir/venir | 축제 & 예술 | 12p |
| | 10 | De compras | §12 쇼핑(77w) | — (표현 중심) | 시장 & 흥정 문화 | 8p |
| **IV** | 11 | Medios y tecnología | §9+§16 미디어/IT(68w) | L8 목적대명사 | 스페인어권 미디어 | 10p |
| | 12 | Viajes y transporte | §14 여행/교통(50w) | L10 날씨, L11 교통 | Renfe & 교통 팁 | 10p |
| **V** | 13 | Servicios y economía | §11+§15 서비스/경제(46w) | — (어휘 중심) | 유로 & 팁 문화 | 10p |
| | 14 | Sociedad y cultura | §17+§19 사회/종교(27w) | — (표현 중심) | 축일 & 전통 | 8p |
| | 15 | Naturaleza y geografía | §20 지리/기후(74w) | L10 날씨 | 기후 & 지리 다양성 | 10p |
| | | | | | **본문** | **~148p** |

| 부록 | 내용 | p |
|------|------|---|
| A | 동사 변화표 (규칙 3형 + 주요 불규칙 10개) | 4p |
| B | 숫자/날짜/시간/색깔 정리표 | 2p |
| C | A1 필수 표현 150선 | 3p |
| D | A2 필수 표현 150선 | 3p |
| E | 정답지 (Práctica + Lectura) | 3p |
| | **부록 합계** | **~15p** |

---

## 📗 hola_al_a2.pdf — A2 교재 목차 (~150p)

| 페이지 | 내용 |
|-------|------|
| i–iv | **서문**: A1→A2 브릿지 가이드, 학습 전략, DELE A2 시험 안내 |

| Part | Ch. | 제목 | 어휘 (Cervantes A2) | 문법 (2권 중심) | 문화 | p |
|------|-----|------|-------------------|---------------|------|---|
| **I** | 1 | Mi cuerpo y salud | A1 심화 + 실전 확장 | L2 doler/interesar | 약국 이용법 | 10p |
| | 2 | ¿Cómo soy? | A1 심화 + 실전 확장 | L3 재귀동사 | SNS & 자기 소개 | 8p |
| | 3 | Mi identity | §3 A2(7sub, 14w) | — (확장 중심) | 이민 & 다문화 | 10p |
| **II** | 4 | Familia y amigos | A1 심화 + 실전 확장 | L3 소유사 후치형 | 세대 간 관계 | 8p |
| | 5 | ¡A comer! | A1 심화 + 실전 확장 | L1 gustar, 부정어 | 중남미 음식 & 레시피 | 10p |
| | 6 | Mi casa | §10 A2(7sub, 22w) | — (확장 중심) | 스페인 부동산 | 10p |
| **III** | 7 | En la escuela | A1 심화 + 실전 확장 | L4 진행형/비교급 | 대학 & 에라스무스 | 10p |
| | 8 | El trabajo | §7 A2(2sub, 17w) | — (확장 중심) | 이력서 & 면접 | 8p |
| | 9 | Ocio y arte | A1 심화 + 실전 확장 | L5 미래/가정문 | 영화 & 음악 추천 | 12p |
| | 10 | De compras | A1 심화 + 실전 확장 | L1 색깔, L2 가격 | 온라인 쇼핑 & 교환 | 10p |
| **IV** | 11 | Medios y tecnología | A1 심화 + 실전 확장 | — (표현 확장) | 팟캐스트 & 유튜브 | 10p |
| | 12 | Viajes y transporte | §14 A2(7sub, 38w) | L9 명령형 | 카미노 데 산티아고 | 12p |
| **V** | 13 | Servicios y economía | §15 A2(6sub, 22w) | — (확장 중심) | 은행 & 행정 절차 | 10p |
| | 14 | Sociedad y cultura | §17 A2(1sub, 7w) | L5 의견, L6~8 과거 3종 | 스페인 역사 입문 | 10p |
| | 15 | Naturaleza y geografía | §20 A2(4sub, 25w) | — (확장 중심) | 환경 & 에코 투어 | 10p |
| | | | | | **본문** | **~148p** |

| 부록 | 내용 | p |
|------|------|---|
| A | 불규칙동사 변화표 (과거/미래/명령형) | 4p |
| B | 시제 비교 총정리 (현재완료/단순과거/불완료과거/과거완료) | 3p |
| C | A2 필수 표현 150선 | 3p |
| D | 정답지 (Práctica + Lectura) | 3p |
| | **부록 합계** | **~13p** |

> [!NOTE]
> **"A1 심화 + 실전 확장"** = Cervantes A2 데이터가 없는 Chapter에서는
> A1 어휘를 활용한 심화 표현, 실전 대화, 복합 시나리오로 A2 수준 콘텐츠를 구성합니다.

---

### Phase 4: 조판

- **도구**: Python ReportLab 또는 Google Docs API
- **디자인**: Noto Sans KR + Roboto, 모던 타이포그래피
- **레이아웃**: 좌측 A1 / 우측 A2 대칭 구조

---

## 6. 실행 로드맵

| 단계 | 작업 | 산출물 | 예상 소요 |
|------|------|--------|----------|
| **Step 1** | Chapter 1 프로토타입 생성 | ch01_prototype.md | 즉시 |
| **Step 2** | 프롬프트 최적화 & 검수 | 확정 프롬프트 템플릿 | 피드백 후 |
| **Step 3** | 전체 15 Chapter 일괄 생성 | ch01~ch15.md | Step 2 확정 후 |
| **Step 4** | 오디오 & 이미지 생성 | audio/, images/ | Step 3 병행 |
| **Step 5** | PDF 조판 | hola_al_a1.pdf, hola_al_a2.pdf | 최종 |

---

## 7. 디렉토리 구조 (계획)

```
/Users/ikyoon/proj/book/
├── strategy.md              # 전략 문서
├── cer_toc.json             # Cervantes 커리큘럼 데이터
├── vol12toc.json            # 기존 교재 목차
├── chapters/                # [NEW] 챕터별 원고
│   ├── ch01_mi_cuerpo.md
│   ├── ch02_como_soy.md
│   ├── ...
│   └── ch15_naturaleza.md
├── prompts/                 # [NEW] Gemini 프롬프트 템플릿
│   └── content_generation.md
├── audio/                   # [NEW] TTS 오디오 파일
├── images/                  # [NEW] 생성 이미지
├── output/                  # [NEW] 최종 PDF
└── scripts/                 # [NEW] 자동화 스크립트
    ├── generate_content.py
    ├── generate_audio.py
    └── assemble_pdf.py
```

---

## User Review Required

> [!IMPORTANT]
> 다음 사항에 대해 확인해주세요:
>
> 1. ✅ **15개 Chapter 구성**: 5개 Part, 최대 2개 섹션/Ch., 최대 12 서브토픽/Ch. — 승인
> 2. ✅ **각 Chapter의 내부 구조** (10개 섹션 템플릿, Cultura Viva + Lectura 포함) — 승인
> 3. ✅ **문법 배치**: vol12toc.json 문법/어휘 Chapter 배정 — 승인
> 4. ✅ **약 300페이지 분량 배분** (A1 ~150p + A2 ~150p): Chapter당 8~12p — 승인
> 5. ✅ **실행 순서**: Step 1 Chapter 1 프로토타입 생성 — 완료
> 6. ✅ **A2 필수 표현 150선** A1 교재 부록에 추가 (부록 ~15p) — 승인
