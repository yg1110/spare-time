## 🗓 SpareTime?

SpareTime 프로젝트는 달력에 여러 정보들을 복합적으로 넣은 스케쥴러입니다.<br/>
주요 기획 의도는 원하는 기능들이 하나의 스케쥴러에 모두 들어가 한번에 확인하고 관리할 수 있는 서비스입니다.<br/>
기존의 나눠져 있던 스케쥴러 서비스에 대한 불편점을 개선하고 보완한 새로운 서비스를 제공하고자 하였습니다.<br/><br/>
스케쥴러에 포함된 정보는 다음과 같습니다.<br/>

- 일정
- 일기

홈페이지 주소 : https://spare-time.vercel.app/calendar

API : https://sparetime.life:4000/api/v1

graphQL : https://sparetime.life:4000/graphql

## 🧑‍💻 Stack

### Front

- next
- next-auth
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
  userId: string
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

유저가 선택한 날짜가 date와 로그인한 유저의 objectId를 userId를 사용하며, 데이터가 수정될경우 diaries, schedules 배열에 추가 삭제하는식으로 구현되어있습니다.

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
*version1*

### aws와 vercel을 둘다 사용하는 이유

vercel의 경우 Next JS를 개발한 회사이기 때문에 프로젝트 배포에 가장 최적화된 플랫폼으로
HTTPS와 CDN이 적용된 상태로 배포되며, CI/CD 자동화에 대한 환경을 고려하지 않아도 됩니다.

SpareTime의 경우 개인 프로젝트로 만든 서비스이기 때문에 트래픽도 적기때문에, 이미 잘 만들어진 무료 호스팅서비스인 vercel을 사용했습니다.

하지만 vercel 하나로 API 서버와 디비 그리고 클라이언트 서버까지 한번에 돌리기에는 무리가 있고 사용량에 따라서 제한이 있기 때문에 추가적으로 AWS EC2의 인스턴스를 생성하여
DB와 API 서버로 사용하였습니다.

### 로그인 프로세스

로그인의 경우 next-auth 라이브러리를 이용하여 next 서버에서 자체적으로 관리하게 되며, express 서버에서는 관리하고 있지 않습니다.

추가적으로 소셜로그인은 구현하지 않았으며, credential만 사용하여 기본적인 로그인만 구현되어 있습니다.

세션 기간은 1일로 설정 했으며, JWT은 사용하지 않습니다.

JWT와 소셜로그인을 따로 구현하지 않은 이유는 현재 프로젝트에서는 간단한 로그인만 있어도 충분할 것 같다고 판단했기 때문입니다.

next-auth/middleware 파일을 통해 설정한 페에지의 경우 로그인 세션여부에 따라 login 패이지로 리다이렉션 됩니다.

API 요청은 세션 만료와는 상관없이 모두 리턴값이 오며, 클라이언트에서 미들웨어를 이용하여 페이지를 리다이렉션 시켜 세션값이 없을 경우에는 요청하지 않도록 예외처리 하였습니다.

전체적인 프로세스의 경우 CredentialsProvider에서 authorize를 거치면서 현재 입력한 id와 password를 이용하여 디비에서 검색 후 해당 결과에 따라서 각각 처리하게 됩니다.

## ✅ 프로젝트를 진행하면서 기록으로 남기고 싶은 에러들

### 1. m1에서 이미지 빌드시 aws linux환경에서 빌드가 되지 않는 문제

- --platform 옵션을 줘서 해결

> docker build --platform linux/amd64 -t [image-name] .

### 2. graphQL의 캐싱 기능 때문에 데이터 추가후 조회가 제대로 되지 않았던 문제

- 조회 쿼리에 fetch policy 옵션 추가

```javascript
const [getDateRange] = useLazyQuery(GET_DATE_RANGE, {
  fetchPolicy: 'network-only',
})
```

### 3. AWS에서 서버 실행시 타임존이 달라서 디비에 시간이 제대로 들어가지 않는 문제

- aws timezone 수정후 재부팅

> sudo rm /etc/localtime
>
> sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

### 4. mongoDB 컨테이너가 내려갔을 경우에 기존 디비데이터를 복구하는 방법

- docker를 실행할 때 -v옵션 사용하여 볼륨을 설정
- -v {외부Volume}:/data/db

> docker run -p 27017:27017 -v /home/ubuntu/mongodb/data:/data/db -d spare-time-mongo:0.0.1

### 5. apollo client가 CA 인증되지 않은 ssl을 사용한 https를 사용할 경우 연결되지 않는 오류

- CA 인증된 https API 서버 사용

> API 주소 도메인 구입 (https://15.165.162.58:4000 -> https://sparetime.life:4000)

> https://www.sslforfree.com/ 사이트에서 무료 ssl을 설정 후 CA가 인증된 https api 서버로 변경

> aws 로드밸런서로 CA가 설정된 ssl key값 설정

### 6. 공인되지 CA에서 발급한 인증서로 https 요청시 "Unable to verify the first certificate" 에러

> 테스트용으로 임의로 발급한 것이기 때문에, process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' 을 이용하여 인증서의 유효성을 검사하지 않는 것으로 설정
