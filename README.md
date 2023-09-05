# 임상시험 정보 검색

db.json에 있는 데이터로 json-server를 통해 임상시험 정보를 검색하는 프로젝트입니다.

# 목차

- [clinical-trial-search](#clinical-trial-search)
- [목차](#목차)
  - [🔗 배포 링크](#-배포-링크)
  - [⚙️ 실행 방법](#️-실행-방법)
  - [⌛ 진행 과정](#-진행-과정)
    - [회의 및 기록](#회의-및-기록)
  - [📂 폴더 구조](#-폴더-구조)
  - [🛠️ 기술 스택](#️-기술-스택)

## 🔗 배포 링크

https://brilliant-wisp-6c9680.netlify.app/

## ⚙️ 실행 방법

```
npm install
npm run server
npm run start
```

## 🧰 기술 전략

#### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략

- 최초 랜더링 시 데이터를 로컬스토리지에 저장하여 사용, 검색어 입력 시 useDebounce 훅으로 데이터접근 최소화.

#### API 호출별로 로컬 캐싱 구현

- API 호출 시 데이터와 Date.now() 데이터를 로컬스토리지에 저장.
- 정상 호출 시 setInterval를 통해 지정한 expire time(10분)에 맞게 타이머 시작.
- 타이머에 맞게 로컬스토리지 초기화 및 API 재요청 후 다시 데이터 저장.

#### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- `window.addEventListener,keydown`을 통해 드롭박스를 방향키로 이동 가능 및 엔터키로 검색 가능하도록 구현.

## 📂 폴더 구조

```
project-root/
│
├── public/ # 정적 파일들
│ ├── index.html
│ └── manifest.json
│
├── src/ # 소스 코드
│ ├── components/    # 재사용 컴포넌트들
│ ├── hooks/         # custom hooks
│ ├── api/           # api 함수들
│ ├── pages/         # 페이지별 컴포넌트
│ ├── router/        # 라우팅
| ├── util/          # 유틸함수들
│ ├── App.tsx        # App 컴포넌트
│ ├── index.tsx      # 진입점 파일
│ └── GlobalStyle.ts # 전역 스타일 설정파일
│
├── .env
├── .gitignore
├── .prettierrc.js
├── .eslintrc
├── package.json
├── tsconfig.json
└── README.md


```

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Typescript-blue?style=square"/> 
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> 
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/git-F05032?style=flat&logo=git&logoColor=white">
