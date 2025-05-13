export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
}

// 회원가입 응답 데이터 타입
export interface SignUpResponseData {
  userId: number;
  nickname: string;
}

// 로그인 응답 데이터 타입
export interface LoginResponseData {
  userId: number;
}

// 사용자 정보 타입
export interface UserData {
  userId: number;
  loginId: string;
  nickname: string;
}