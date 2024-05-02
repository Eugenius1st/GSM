import axios from 'axios';

// 단순 요청으로 인증값이 필요없는 경우
export const axiosApi = (url: string, options: any) => {
    const instance = axios.create({
        baseURL: url,
        // headers: { Authorization: 'Bearer ' + token },
        ...options,
    });
    return instance;
};

// post, delete등 api요청 시 인증값이 필요한 경우
// const axiosAuthApi = (url, options) => {
//     const token = '토큰 값'
//     const instance = axios.create({
//       baseURL: url,
//       headers: { Authorization: 'Bearer ' + token },
//       ...options,
//     })
//     return instance
//   }

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
