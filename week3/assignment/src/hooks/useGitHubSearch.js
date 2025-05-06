// src/hooks/useGitHubSearch.js
import { useState, useEffect } from 'react';
import { API_STATUS, STORAGE_KEYS } from '../constants/github';
import { 
  loadRecentSearches, 
  addRecentSearch, 
  removeRecentSearch 
} from '../utils/githubUtils';

export default function useGitHubSearch() {
  const [userInfo, setUserInfo] = useState({ status: API_STATUS.IDLE, data: null });
  const [recentSearches, setRecentSearches] = useState([]);

  // localStorage에서 최근 검색어 로드
  useEffect(() => {
    const savedSearches = loadRecentSearches();
    setRecentSearches(savedSearches);
  }, []);

  // GitHub API 호출
  const getUserInfo = async (username) => {
    setUserInfo({ status: API_STATUS.PENDING, data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUserInfo({ status: API_STATUS.RESOLVED, data });
      const updatedSearches = addRecentSearch(username, recentSearches);
      setRecentSearches(updatedSearches);
    } catch {
      setUserInfo({ status: API_STATUS.REJECTED, data: null });
    }
  };

  // 최근 검색어 삭제
  const removeSearch = (username) => {
    const updatedSearches = removeRecentSearch(username, recentSearches);
    setRecentSearches(updatedSearches);
  };

  // 사용자 정보 카드 닫기
  const clearUserInfo = () => {
    setUserInfo({ status: API_STATUS.IDLE, data: null });
  };

  return {
    userInfo,
    recentSearches,
    getUserInfo,
    removeSearch,
    clearUserInfo
  };
}