// src/api/authService.ts
import { client } from './client';
import { ApiResponse, SignUpResponseData } from '../types/api';

// 회원가입 함수
export interface SignUpParams {
  loginId: string;
  password: string;
  nickname: string;
}

export const signUp = async (params: SignUpParams): Promise<ApiResponse<SignUpResponseData>> => {
  const response = await client.post<ApiResponse<SignUpResponseData>>('/api/v1/auth/signup', params);
  return response.data;
};

// 로그인 함수
export interface LoginParams {
  loginId: string;
  password: string;
}

// API 응답에 맞게 타입 정의
export interface LoginResponseData {
  userId: number;
}

export const login = async (params: LoginParams): Promise<ApiResponse<LoginResponseData>> => {
  const response = await client.post<ApiResponse<LoginResponseData>>('/api/v1/auth/signin', params);
  return response.data;
};