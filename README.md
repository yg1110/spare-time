## 🗓 SpareTime?

SpareTime 프로젝트는 달력에 여러 정보들을 복합적으로 넣은 스케쥴러입니다.<br/>
주요 기획 의도는 원하는 기능들이 하나의 스케쥴러에 모두 들어가 한번에 확인하고 관리할 수 있는 서비스입니다.<br/>
기존의 나눠져 있던 스케쥴러 서비스에 대한 불편점을 개선하고 보완한 새로운 서비스를 제공하고자 하였습니다.<br/><br/>
스케쥴러에 포함된 정보는 다음과 같습니다.<br/>

- 일정
- 일기 + 회고
- <del>투두리스트 + 30일 데일리 챌린지</del>
- <del>집중시간 + 낭비시간</del>
- <del>차트</del>

❗ <strong>현재는 일정과 일기만 구현되어있습니다.</strong>

홈페이지 주소 : https://spare-time.vercel.app/calendar

API 서버 : https://15.165.162.58:4000/graphql

## 🧑‍💻 Stack

### Front

- react
- styled-components
- material-ui
- fullcalendar
- dayjs
- axios
- recoil
- apollo-client

### Back

- express
- mongodb + mongoose
- dayjs
- axios
- graphql
- apollo-server-express

### Deploy

- Docker
- Aws EC2
- Vercel

## 📁 Schema

```typescript jsx
export interface IDate extends Document {
  date: string
  diaries?: IDiary[]
  schedules?: ISchedule[]
}

interface IDiary {
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface ISchedule {
  title: string
  location?: string
  start: string
  end: string
  createdAt: string
  updatedAt: string
}
```

### version1

유저가 선택한 날짜가 date로 가본키값으로 사용하며, 데이터가 수정될경우 diaries, schedules 배열에 추가 삭제하는식으로 구현되어있습니다.

해당 스키마의 경우 필드 하나만 바꾸는데 데이터가 많을경우 엄청나게 많은 데이터를 불러들이는 문제가 발생할 수가 있습니다.

만약 어떤 ISchedule의 title 수정을 요청받았을 때 그 데이트의 schedule이 만개면 만개 딥카피 떠서 타이틀만 바꾸고 바꿔치기 해야되지만,
몽고디비는 ACID 안지키고 도큐먼트 단위 원자성만 지원해서 그사이에 누가 또 수정하면 데이터 이상해질 수도 있습니다. 그래서 디비락걸고 수행하는데 만개짜리 딥카피때문에 디비 자체가 느려지게 됩니다.

그렇기 때문에, 보통 만개정도 이상으로 많은 경우에는 따로 배열을 분리하고 키값으로 연관 키값을 넣어서 구현합니다.
먼저 date를 읽고 schedule 도큐먼트에 그룹이랑 aggregation을 그 date 키값으로 걸어서 읽어오는 식으로 하게됩니다.
하지만 이 방식의 단점은 도튜먼트가 연관 키값으로 묶이긴 하는데 따로존재해서 만약 데이트를 삭제했을 때 그 데이트 키값을 가지는 schedule, diaries도 삭제할 때
트랜젝션 걸고 해야하지만 몽고디비는 그런걸 지원 안해서 아토믹하게 짤려면 개발자가 직접 책임지고 짜야합니다.

하지만 해당 프로젝트의 경우 데이터가 많지 않기 때문에, 안전하게 하나의 도큐먼트에서 전부 관리하는식으로 구현했습니다.

## 📋 Design

### 전체 시스템 구조

![image](./images/전체시스템구조.png)
*23.06.27 version1 기준*

### aws와 vercel을 둘다 사용하는 이유

vercel의 경우 Next JS를 개발한 회사이기 때문에 프로젝트 배포에 가장 최적화된 플랫폼으로
HTTPS와 CDN이 적용된 상태로 배포되며, CI/CD 자동화에 대한 환경을 고려하지 않아도 됩니다.

SpareTime의 경우 개인 프로젝트로 만든 서비스이기 때문에 트래픽도 적기때문에, 이미 잘 만들어진 무료 호스팅서비스인 vercel을 사용했습니다.

하지만 vercel 하나로 API 서버와 디비 그리고 클라이언트 서버까지 한번에 돌리기에는 무리가 있고 사용량에 따라서 제한이 있기 때문에 추가적으로 AWS EC2의 인스턴스를 생성하여
DB와 API 서버로 사용하였습니다.

## ✅ 추가되어야 할부분

### UI

- 모바일 상단 날짜 2줄로 나오는 부분
- 일정 이벤트들이 모두 같은색으로 보임
- 일요일과 토요일 상단헤더의 경우 파란색과 빨간색으로 보여도 되지만, 실제 데이터도 같은 색으로 변경됨
- 아이폰에서 주소창때문에 하단 네비게이션바가 안보임
- 아이폰에서 모달 상단이 잘림

### UX

- 달력(주, 일)에서 선택해서 추가할려는 시간대가 이미 일정이 있을경우 선택할 수 없고, 월로 이동후 추가해야되는 부분
- 클라이언트에서 에러 표시하는 부분 추가
- 로딩기능 추가

### 기능

- 로그인 기능
- 소셜 공유 기능
- 투두, 집중시간 + 낭비시간, 차트 추가

### 인프라

- aws 인스턴스 재부팅시 도커 자동으로 실행되도록 수정
- DB 도커 이미지 종료시 저장된 데이터 백업
- 젠킨스를 이용한 자동배포
- 무중단 배포 기능 구현

### App

- 리액트 네이티브 추가
- WebView 기능 추가
- 앱 출시
