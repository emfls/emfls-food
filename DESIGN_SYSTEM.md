# Design system

## Design concept

Modern Editorial Recipe Book. 따뜻한 종이 위에 정리된 현대적인 요리책처럼 보이되, 읽기와 탐색이 먼저인 구조를 사용한다.

## Typography

큰 제목과 섹션 제목은 Georgia 계열 serif를 사용하고, 본문과 내비게이션은 시스템 sans와 Noto Sans KR을 우선한다. 상세 본문은 긴 글의 호흡을 위해 serif 조합을 사용한다.

## Layout

최대 폭은 1120px, 모바일 좌우 여백은 20px 수준으로 둔다. 홈은 hero → 카테고리 → featured guides → cooking knowledge → tools teaser 순서로 구성한다. 상세 페이지는 제목/설명/메타 → 본문 → 재료·조리·보관 정보 순서다.

## Colors

- Paper: `#fbf8f1`
- Warm cream: `#f2eadb`
- Ink: `#292620`
- Muted: `#746d62`
- Terracotta accent: `#a34f32`
- Rule: `#ded4c3`

## Navigation

상단에는 텍스트 로고, 카테고리, 소개만 두어 가볍게 유지한다. 하단에는 소개, 개인정보처리방침, 문의를 둔다.

## Card system

가이드는 얇은 rule과 paper 배경을 가진 editorial card로 표현한다. 그림자와 장식보다 제목, category label, 설명, 다음 행동 링크를 우선한다.

## Recipe layout

분량·준비·조리 시간을 facts row로 먼저 보여준다. 이어서 재료, 조리 순서, 조리 이유, 대체 재료, 보관을 분리한다.

## Image/photo policy

이미지는 콘텐츠를 이해시키는 경우에만 사용한다. Recipe는 완성 음식의 hero image를 우선하고, Knowledge는 식재료나 보관 대상을 설명하는 hero image를 선택적으로 사용한다. Recipe step image는 조리 상태를 설명하는 데 실제 도움이 되는 단계에만 추가하며 모든 단계에 강제하지 않는다.

향후 파일 구조는 `src/assets/food/recipes/<slug>/`, `src/assets/food/knowledge/<slug>/`, `src/assets/food/shared/`로 역할을 나눈다. 파일명은 콘텐츠 slug와 연결되는 kebab-case를 사용한다(`kimchi-fried-rice.webp`, `potato-storage.webp`). `IMG_1234.jpg`, `image1.png`, `final-final2.png` 같은 이름은 사용하지 않는다.

기본 포맷은 WebP를 우선하고 AVIF는 실제 운영 필요가 확인될 때 검토한다. Recipe hero는 16:9, card는 4:3 crop 영역을 사용해 콘텐츠별 비율 차이로 layout이 흔들리지 않게 한다. Hero는 eager, card와 step image는 lazy loading을 사용하며 aspect-ratio로 layout shift를 줄인다.

현재 Content Collection의 optional `image: { src, alt }`를 hero와 card에 재사용하고, Recipe method에는 optional step image를 둘 수 있다. 이미지가 없는 콘텐츠는 image block 자체를 렌더링하지 않는다. 회색 placeholder, fake image, broken image icon을 표시하지 않는다.

alt는 파일명이나 “이미지”라는 단어를 반복하지 않고 사진에서 실제로 중요한 음식·재료·상태를 짧게 설명한다. 의미 있는 hero image는 설명적인 alt를 가지며, 장식 이미지는 콘텐츠 구조에 맞춰 빈 alt를 검토한다. 외부 이미지 URL보다 프로젝트가 권리 상태를 관리할 수 있는 로컬 asset을 우선한다.

허용 출처는 직접 촬영, 권리가 명확한 이미지, 직접 생성한 이미지, 프로젝트에서 생성한 AI 이미지다. 검색 결과·블로그·쇼핑몰 이미지를 무단 사용하지 않고, 출처가 불확실하거나 워터마크가 있는 이미지는 사용하지 않는다. AI 이미지는 실제 레시피에 없는 재료나 garnish를 추가해 조리 결과를 오해하게 만들지 않는다.

## Responsive behavior

모바일에서 grid는 한 열로 바뀌고, 제목은 유동 크기로 축소된다. 핵심 정보와 링크는 hover 없이도 읽고 사용할 수 있어야 한다.

## Forbidden patterns

과도한 그림자, gradient, glassmorphism, 자동 재생, 장식적인 애니메이션, SaaS 대시보드식 UI, 과밀한 카드 그리드, 무의미한 임시 문구를 사용하지 않는다.
