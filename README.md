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

## 실행 화면
<img width="560" alt="main_image" src="https://github.com/ChoByungHyun/time-series-chart/assets/102468625/3baceafa-c36d-42cb-8be4-7da6a0c03e4c">

## ⚙️ 실행 방법

#### 현재 레포 clone 후 로컬실행

```
git clone https://github.com/ChoByungHyun/clinical-trial-search.git
npm install
npm run server
npm run start
```

#### 서버 레포 clone 후 배포링크 접속

```
git clone https://github.com/walking-sunset/assignment-api
npm install
npm start

배포링크 접속
```

## 🔗 배포 링크

https://brilliant-wisp-6c9680.netlify.app/

## 🧰 기술 전략

#### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략

- 검색어 입력 시 useDebounce 훅으로 400ms이내에 입력이 들어오면 API호출하지 않도록 구현
- 띄어쓰기나 영어, 숫자, 특수문자로 검색 시 API호출 안되도록 방지

#### API 호출별로 로컬 캐싱 구현

- API 호출 시 검색어 별로 데이터와 Date.now()값을 객체형태로 세션스토리지에 저장.
- 이전에 입력한 검색어와 같은 검색어를 입력 시 `Date.now() - timestamp > CACHE_EXPIRY_MS;` 식을 통해 캐시데이터가 stale한지 확인 후 API호출 여부를 정하고 stale하다면 API호출을 하고 값을 업데이트 해주고 최신상태라면 갖고 있다면 기존 데이터를 반환하도록 구현.
- 설정한 stale로 전환되는 시간은 10분(`1000*60*10`)

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
<!--portfolio-->
