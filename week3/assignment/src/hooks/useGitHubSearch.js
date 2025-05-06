// src/hooks/useGitHubSearch.js
import { useState, useEffect } from 'react';
import { API_STATUS, STORAGE_KEYS } from '../constants/github';

export default function useGitHubSearch() {
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [recentSearches, setRecentSearches] = useState([]);

  // localStorage에서 최근 검색어 로드
  useEffect(() => {
    const savedSearches = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // GitHub API 호출
  const getUserInfo = async (username) => {
    setUserInfo({ status: API_STATUS.PENDING, data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUserInfo({ status: API_STATUS.RESOLVED, data });
      saveSearch(username);
    } catch {
      setUserInfo({ status: API_STATUS.REJECTED, data: null });
    }
  };

  // 최근 검색어 저장
  const saveSearch = (username) => {
    if (!recentSearches.includes(username)) {
      const updatedSearches = [...recentSearches, username];
      setRecentSearches(updatedSearches);
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updatedSearches));
    }
  };

  // 최근 검색어 삭제
  const removeSearch = (username) => {
    const updatedSearches = recentSearches.filter(search => search !== username);
    setRecentSearches(updatedSearches);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updatedSearches));
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