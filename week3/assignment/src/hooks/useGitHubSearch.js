// src/hooks/useGitHubSearch.js
import { useState, useEffect } from 'react';

export default function useGitHubSearch() {
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [recentSearches, setRecentSearches] = useState([]);

  // localStorage에서 최근 검색어 로드
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // GitHub API 호출
  const getUserInfo = async (username) => {
    setUserInfo({ status: 'pending', data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUserInfo({ status: 'resolved', data });
      saveSearch(username);
    } catch {
      setUserInfo({ status: 'rejected', data: null });
    }
  };

  // 최근 검색어 저장
  const saveSearch = (username) => {
    if (!recentSearches.includes(username)) {
      const updatedSearches = [...recentSearches, username];
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  };

  // 최근 검색어 삭제
  const removeSearch = (username) => {
    const updatedSearches = recentSearches.filter(search => search !== username);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 사용자 정보 카드 닫기
  const clearUserInfo = () => {
    setUserInfo({ status: 'idle', data: null });
  };

  return {
    userInfo,
    recentSearches,
    getUserInfo,
    removeSearch,
    clearUserInfo
  };
}