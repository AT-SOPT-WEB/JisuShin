import { client } from './client';
import { ApiResponse } from '../types/api';

// 내 닉네임 조회
interface UserInfoResponse {
  nickname: string;
}

export const getMyInfo = async (): Promise<ApiResponse<UserInfoResponse>> => {
  const response = await client.get<ApiResponse<UserInfoResponse>>('/api/v1/users/me');
  return response.data;
};

// 닉네임 수정
interface UpdateNicknameParams {
  nickname: string;
}

export const updateNickname = async (params: UpdateNicknameParams): Promise<ApiResponse<null>> => {
  const response = await client.patch<ApiResponse<null>>('/api/v1/users', params);
  return response.data;
};

// 전체 유저 닉네임 조회
interface SearchUsersResponse {
  nicknameList: string[];
}

export const searchUsers = async (keyword?: string): Promise<ApiResponse<SearchUsersResponse>> => {
  const params = keyword ? { keyword } : {};
  const response = await client.get<ApiResponse<SearchUsersResponse>>('/api/v1/users', { params });
  return response.data;
};