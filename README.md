# ⚽ GSM – 축구 클래스 예약/안내/회차 차감 시스템

GSM은 유소년 및 일반 축구 수강생을 위한 **클래스 예약, 알림, 회차 차감** 기능을 제공하는 웹 애플리케이션입니다.  
운영자는 수업 스케줄을 등록하고, 수강생은 손쉽게 원하는 회차에 참여 신청할 수 있으며, 출석 시 자동 차감됩니다.
선수, 어드민, 코치, 클래스 등을 관리합니다.

---

## 🛠️ 기술 스택

### 📦 Frontend

- **React 18** – UI 컴포넌트 기반 SPA 개발
- **TypeScript** – 정적 타입을 통한 안정성 확보
- **React Router DOM v6** – 클라이언트 라우팅
- **Recoil** – 전역 상태 관리
- **React Query v5 (TanStack Query)** – 서버 상태 및 API 캐싱
- **TailwindCSS** – 유틸리티 기반 빠른 스타일링
- **MUI (Material UI)** – UI 컴포넌트 프레임워크
- **Day.js** – 날짜 포맷팅 및 계산
- **Kakao Maps SDK** – 위치 기반 지도 서비스 연동
- **heic2any, heictojpeg** – HEIC 이미지 변환 지원

### 🧪 테스트

- **React Testing Library**, **Jest**, **@testing-library/user-event**

---

## 🚀 주요 기능

- ✅ 수업 클래스 생성 및 관리 (운영자)
- 📅 주간 스케줄 및 예약
- 👥 수강생 신청 및 출석 확인
- ⏳ 회차 자동 차감 기능
- 🔔 예약 알림 및 리마인드 기능
- 🗺️ 지도 기반 장소 안내 (카카오맵)
- 📸 iOS에서 업로드한 HEIC 이미지 처리

---



<h3>📍 사용자 예약 및 수업 확인 화면</h3>
<table>
  <tr>
    <td align="center"><strong>로그인</strong></td>
    <td align="center"><strong>내 수업 관리</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5377c1b2-43c7-498e-b81d-02b1e00c74c1" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/4ec1c402-9aa6-4598-b308-41232faf1c36" width="300"/></td>
  </tr>
</table>

<br/>

<h3>📍 회차별 예약 및 회원 관리</h3>
<table>
  <tr>
    <td align="center"><strong>회차별 예약</strong></td>
    <td align="center"><strong>회원관리</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/29bc7fad-1e35-4791-a2ea-50b637541dfa" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/0dd0ecba-59e8-4aa8-a78f-cfb024a46ada" width="300"/></td>
  </tr>
</table>
