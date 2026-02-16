AI 기반 스페인어 교재 자동 생성 전략 (Project: Hola-AL)

1. 전략적 목표 (Strategic Objective)

Input: Instituto Cervantes 커리큘럼 (@cer_toc.json), 한국인을 위한 A1,A2레벨 스페인어교재 목차(@vol12toc.json).
- 생성할 교재의 목차는 cer_toc.json에 맞춰서 생성해줘
- vol12toc.json의 목차와 학습목표/내용을 최대한 함께 반영해줘
- 특히 vol12toc_json의 vocabulary_and_extra가 빠지지 않고 모두 반영되어야해. 빠진부분은 마지막 부록에 모두 넣어줘

Target: 영어 상급(Opic AL) 구사 능력을 갖춘 한국인 대학생.

Output: A1/A2 분리형 모듈식 교재 (PDF), 각 교재의 분량은 약 100페이지.
- 너무 딱딱하지 않게 친절한 설명을 넣어줘
- 실제 학습서처럼 이미지를 생성해서 함께 넣어줘
- PDF를 다 만들고 나면, 내가 검토해서 어떤 부분을 mp3로 만들것인지 결정해서 알려줄게. 네가 알아서 mp3 만들지마. 

Core Logic: 영어를 매개로 한 스페인어 학습 (English Bridge Strategy) 활용으로 학습 효율 200% 증대

2. 핵심 방법론: The English Bridge

학습자가 이미 영어를 유창하게 구사하므로, 한국어로 번역하는 과정에서 발생하는 비효율을 제거합니다.

Cognates 활용: 어휘 설명 시 영어-스페인어 동계어(Cognates)를 최우선 노출 (예: Nación -> Nation -> 국가)

문법 매핑: 스페인어 문법을 영어 문법 용어로 설명 (예: Tener -> To have, Ser/Estar -> To be의 상태/본질 구분)

한국어의 역할: 영어로 설명이 모호한 미묘한 뉘앙스나 한국인만 겪는 발음 오류 교정에만 한정.

문체: 동사/형용사/부사 단어/표현을 설명할 때는 최대한 테이블로 작성.

3. 자동화 파이프라인 아키텍처 (Automation Architecture)

이 프로젝트는 Google의 AI 생태계를 통해 Raw Data 추출 -> 구조화 -> 콘텐츠 확장 -> 조판의 4단계로 자동화됩니다.

Phase 1: 데이터 추출 및 정제 (Data Extraction)

PDF는 비정형 데이터이므로, 이를 기계가 읽을 수 있는 JSON 포맷으로 변환 완료(@cer_toc.json)

Phase 2: 콘텐츠 생성 및 확장 (Content Generation)

단순 단어 목록을 '교재'로 바꾸기 위해 Gemini에게 페르소나를 부여하여 설명을 생성합니다.

Tools: Gemini API (Python Script via Google Colab)

Prompt Engineering Strategy:

Role: "You are a linguistics professor teaching Spanish to English-speaking Koreans. you should consider following requirements. 학습자가 이미 영어를 유창하게 구사하므로, 한국어로 번역하는 과정에서 발생하는 비효율을 제거합니다.

Cognates 활용: 어휘 설명 시 영어-스페인어 동계어(Cognates)를 최우선 노출 (예: Nación -> Nation -> 국가)

문법 매핑: 스페인어 문법을 영어 문법 용어로 설명 (예: Tener -> To have, Ser/Estar -> To be의 상태/본질 구분)

한국어의 역할: 영어로 설명이 모호한 미묘한 뉘앙스나 한국인만 겪는 발음 오류 교정에만 한정.

문체: 만연체보다는 간결한 정보 전달. 동사/형용사/부사 단어/표현을 설명할 때는 최대한 테이블로 작성."

Task: 각 단어/표현에 대해 다음을 생성.

Spanish: (Original Text)

English Bridge: 영어 대응어 및 어원(Etymology) 설명.

Example Sentence: A1/A2 수준에 맞는 예문 (스페인어 + 영어 번역).

Korean Tip: 한국인이 자주 틀리는 포인트 (선택적 생성).

Separation: A1과 A2 데이터를 별도 프롬프트로 처리하여 난이도 조절.

Phase 3: 멀티미디어 자산 생성 (Multimedia Assets)

텍스트만 있는 교재는 죽은 교재입니다.

Audio: Google Cloud TTS (Text-to-Speech) API 활용.

Studio Voice 옵션을 사용하여 원어민 수준의 스페인어 발음 파일 생성.

파일명: ch1_a1_vocab_pelo.mp3 형식으로 자동 저장.

Image: Imagen 3 (Google) 활용.

각 챕터의 대표 이미지를 프롬프트로 생성 (예: "A minimal vector illustration of human body parts labeled in Spanish, educational style").

Phase 4: 조판 및 결과물 병합 (Assembly)

생성된 텍스트와 이미지를 최종 포맷으로 결합합니다.

Tools: Python (ReportLab 라이브러리) 또는 Google Docs API.

Format:

Left Page (A1): 핵심 기초 어휘, 생존 스페인어.

Right Page (A2): 확장 어휘, 문장 구사력 향상.

Design: 모던하고 깔끔한 타이포그래피 (Google Fonts: Noto Sans, Roboto).

4. 실행 로드맵 (Execution Roadmap)

Step 1 (Data): 현재 업로드된 PDF를 Gemini 1.5 Pro를 통해 완벽한 JSON DB로 변환. (즉시 실행 가능)

Step 2 (Prompt): 'English Bridge' 방법론이 적용된 최적의 프롬프트 테스트 및 확정.

Step 3 (Prototype): Python 스크립트로 챕터 1(Individuo)에 대한 데모 PDF 생성.

Step 4 (Scale): 전체 챕터 일괄 처리 및 검수.

5. 샘플 커리큘럼 구성 (Chapter 1 예시)

$$Page A1: Basic Anatomy$$

Vocabulary: Pelo (Hair), Ojo (Eye)

English Bridge: "Pelo" relates to "Pile" (carpet surface) or "Depilate" (remove hair).

Action: 간단한 신체 부위 지칭하기.

$$Page A2: Detailed Description$$

Vocabulary: Rubio (Blonde), Liso (Straight), Rizado (Curly)

English Bridge: "Rizado" sounds like "Frizz".

Action: 사람의 외모 묘사하기 (He has curly hair -> Tiene el pelo rizado).