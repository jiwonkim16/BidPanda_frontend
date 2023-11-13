# BidPanda 프로젝트
[🐼 비드판다 사이트 이동하기](https://bidpanda.app/)

![bpwall](https://github.com/jiwonkim16/BidPanda_frontend/assets/112574979/4867d6fb-b2e0-4dd3-8153-13fba88b9894)


<img width="1353" alt="sample" src="https://github.com/jiwonkim16/BidPanda_frontend/assets/112574979/32510dd3-3a7e-4956-ab79-25d426aeca8a">

## 프로젝트 소개
### 서비스 개요
```
    BID PANDA 서비스는 판매자와 구매자간 커뮤니케이션 리소스를 최소화 하기 위해
    경매 방식 거래 서비스를 도입하는게 어떨까?라는 아이디어에서 시작된 서비스입니다.

    사이트에 가입된 유저은 팔고자하는 물건을 지정한 기한을 정해서 경매 방식으로 판매 가능합니다.
    판매물건이 낙찰 확정되면, 판매자-낙찰자간 알림을 전송하고, 채팅을 할 수 있습니다.
```

#### 프로젝트 기간
2023.10.04 ~ 2023.11.15

#### 프로젝트 팀원
프론트엔드 2명 백엔드 4명

### 구현 기능

####  1.회원가입, 로그인 기능

- 이메일 인증 기능이 있는 회원가입
  
- 리프레쉬 토큰을 통한 액세스 토큰 재발급 기능
  
- 카카오 소셜 로그인 기능

#### 2.경매 물품 관련 기능

- 물품 등록

- 물품 정보 수정 / 삭제
  
- 물품 입찰 (입찰가 등록)

- 물품 검색 / 필터링

- 물품 좋아요

#### 3.알림 기능

- 경매 마감 30분전, 입찰을 했던 회원에게 알림 메시지 기능 

- 경매 마감시간에, 판매자와 낙찰자에게 알림창에서 알림 보내는 기능

- 회원 알림 읽음 처리 기능

#### 4.채팅 기능

- 회원 채팅방 조회

- 회원 채팅방 입장
    - 채팅방 입장에 대한 인증, 인가 적용 
    - 채팅방 입장시,최신 채팅 메시지 20개 조회

- 회원간 채팅 기능
    - STOMP가 적용된 웹소켓 채팅 기능 구현
    - 회원 채팅 참여 유무를 서버 캐시에 기록
    - 상대 회원이 채팅에 참여하지 않은 경우, 채팅 내용 기록 구현
    - 채팅방에 없는 회원에게 메시지 알림 전송 기능 동작

#### 5. 회원 정보 수정

- 회원 정보 수정

- 회원 탈퇴 기능

- 프로필 이미지 변경 기능

### 아키텍쳐 구성도

<!-- 여기에 이미지 -->

<img src="./bidpanda_archt.png" />

### 사용 기술 스택

|목록|사용 기술|
### 🐼 Language
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/>

<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat&logo=Recoil&logoColor=white"/>  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=React Query&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white"/>

### 🌐 Tools
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/>  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white"/>

### 📚 Library

<img src="https://img.shields.io/badge/React Hook Form-09D3AC?style=flat&logo=Create React App&logoColor=white"/>  <img src="https://img.shields.io/badge/React Toasitfy-38096C?style=flat&logo=Taco Bell&logoColor=white"/>
<img src="https://img.shields.io/badge/StompJS-F5455C?style=flat&logo=Rocket.Chat&logoColor=white"/>
<img src="https://img.shields.io/badge/SockJS-010101?style=flat&logo=Socket.io&logoColor=white"/>
<img src="https://img.shields.io/badge/MomentJS-03A9F4?style=flat&logo=Clockify&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT Token-000000?style=flat&logo=Json Web Tokens&logoColor=white"/>
<img src="https://img.shields.io/badge/Headless UI-66E3FF?style=flat&logo=Headless UI&logoColor=white"/>

#### 기술 사용 의사 결정 

|사용 기술|적용부분|사용 이유|
|:-------|:-------|:-------|
|TypeScript| language |컴파일 과정에서 타입 오류를 확인하여 유지보수가 용이하며, 코드 안정성이 높아짐|
|TailwindCSS| Style |불필요한 CSS 파일을 제거함으로서 성능 최적화에 용이함|
|Vercel| CI/CD |타 배포플랫폼에 비해 개발 및 배포 프로세스를 효율적으로 관리할 수 있음|
|VITE| Tool |ESmodule 기반의 Vite는 핀포인트 번들링으로 시간을 단축하고 번들링 성능를 개선|
|SSE| 알림 기능 | 서버 -> Client 단방향 알림을 주기 위해서|
|STOMP| 채팅 기능 | STOMP특유의 정형화된 부분 -> 채팅 메시지 전달에 좋을 것 같음, 채팅 참여자 추적에 용이|
|React-query| 서버 상태 관리 |데이터 fetching과 서버상태관리를 효율적으로 처리할 수 있음|


### 프로젝트 팀원 소개

|이름|역할|구현 기능|Contect|
|:-----:|:-----:|:------------|:-----|
|김고야|`LEAD`<br>`FE`|User ( 로그인 / 회원가입 / 소셜로그인 / 마이페이지 등 ),<br>Layout ( 메인페이지, 상단 Nav 등 ),<br>디자이너와 UI/UX 및 디자인 와이어프레임 관련 커뮤니케이션,<br>실시간 알림 기능 구현 ( SSE ),<br>React lazy 코드 스플리팅|📧[gim.goya@gmail.com](gim.goya@gmail.com)<br>✨ [https://github.com/goyka](https://github.com/goyka)|
|김지원|`FE`|경매 상품(등록, 조회<querydsl 동적쿼리 적용>, 입찰),<br>채팅방 조회 및 실시간 1:1 채팅기능,<br>상품 수정 및 삭제 기능,<br>상품 찜하기 및 취소 기능,<br>CI/CD,<br>인피니티 스크롤링, 페이지 라우팅|📧 [stayby16@tistory.com](https://hi-wonn.tistory.com/)<br>✨https://github.com/jiwonkim16

## 트러블 슈팅 🚀 


### 모바일 웹 브라우저 UI 대응

<details>
<summary>해결 과정</summary>
<div>

#### 문제상황

현재 상품 데이터베이스에는 경매 종료 시간 필드가 존재하므로,<br>경매 종료시간에 맞춰서 
판매자와 낙찰자에게 SSE 알림을 보내려는 계획이었다.<br>

어떤 시간에 경매 종료가 일어나는지 알 수 없는 상황<br>(상품 등록자는 원하는 종료 시간을 자유롭게 선택 가능)

하지만, 경매 종료 시간에 딱 맞춰서 이벤트를 발생시키는 것이 어려웠다.

#### 해결

1\. BackEnd 서버에서 EVENT 발생시키기

Schedular를 이용해 DB쿼리를 매초 날려 경매종료시간이 지났는지 확인해서 지났으면 SSE알림을 보내게 한다. 


2\.FrontEnd 페이지에서 EVENT 발생시키기


프론트 페이지에서 경매시간이 초단위로 카운팅 되면서 줄어들고 있다.남은시간이 0이 되었을 때,<br>
해당 itemId를 가지고 판매자와 낙찰자에게 종료 SSE알림을 보내는 백엔드 서버로 요청을 보내서<br>
SSE알림을 보내게 한다.


3\. 외부 Open API를 사용해 EVENT 발생시키기
</div>
</details>

## 부록 

### BidPanda API Documentation
[**🔗 Documentation Link**]()

