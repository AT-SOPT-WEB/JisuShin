import axios from 'axios';

const BASE_URL = 'https://api.atsopt-seminar4.site';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰이 필요한 요청에 토큰 추가
client.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // API 명세에 맞게 userId 헤더 설정
      config.headers.userId = userId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 공통 에러 처리
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 응답 처리
    if (error.response) {
      // 서버에서 응답이 왔지만 상태 코드가 2xx가 아닌 경우
      console.error('API Error:', error.response.data);
      
      // 인증 에러인 경우 (401) - 로그인 페이지로 리다이렉트
      if (error.response.status === 401 && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('userId');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // 요청이 발생했지만 응답을 받지 못한 경우
      console.error('API Request Error:', error.request);
    } else {
      // 요청 설정 단계에서 오류가 발생한 경우
      console.error('API Config Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);