import { client } from './client';
import { ApiResponse, SignUpResponseData } from '../types/api';

export interface SignUpParams {
  loginId: string;
  password: string;
  nickname: string;
}

export const signUp = async (params: SignUpParams): Promise<ApiResponse<SignUpResponseData>> => {
  const response = await client.post<ApiResponse<SignUpResponseData>>('/api/v1/auth/signup', params);
  return response.data;
};

export interface LoginParams {
  loginId: string;
  password: string;
}

export interface LoginResponseData {
  userId: number;
}

export const login = async (params: LoginParams): Promise<ApiResponse<LoginResponseData>> => {
  const response = await client.post<ApiResponse<LoginResponseData>>('/api/v1/auth/signin', params);
  return response.data;
};