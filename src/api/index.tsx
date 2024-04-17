import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000, // 요청 타임아웃 설정 (ms)
    headers: {
        'Content-Type': 'application/json', // 기본 헤더 설정
        //   'Authorization': 'Bearer token' // 예시: 인증 토큰 설정
    },
});

// 기본 설정을 사용하여 인스턴스로 요청 보내기
// axiosInstance.get('/endpoint')
//   .then(response => {
//     console.log('응답 데이터:', response.data);
//   })
//   .catch(error => {
//     console.error('에러 발생:', error);
//   });

// axiosInstance.interceptors.request.use(config => {
//     // 요청 전 로직을 추가할 수 있음
//     console.log('요청 보냄:', config);
//     return config;
//   }, error => {
//     return Promise.reject(error);
//   });

//   // 응답 인터셉터 설정 (응답 후 실행)
//   axiosInstance.interceptors.response.use(response => {
//     // 응답 후 로직을 추가할 수 있음
//     console.log('응답 받음:', response);
//     return response;
//   }, error => {
//     return Promise.reject(error);
//   });
