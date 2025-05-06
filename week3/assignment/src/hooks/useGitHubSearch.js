import { useState, useEffect } from 'react';
import { API_STATUS, STORAGE_KEYS } from '../constants/github';
import { 
  loadRecentSearches, 
  addRecentSearch, 
  removeRecentSearch 
} from '../utils/githubUtils';

export default function useGitHubSearch() {
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [userData, setUserData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // localStorage에서 최근 검색어 로드
  useEffect(() => {
    const savedSearches = loadRecentSearches();
    setRecentSearches(savedSearches);
  }, []);

  // GitHub API 호출
  const getUserInfo = async (username) => {
    setStatus(API_STATUS.PENDING);
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setUserData(data);
      setStatus(API_STATUS.RESOLVED);

      const updatedSearches = addRecentSearch(username, recentSearches);
      setRecentSearches(updatedSearches);
    } catch {
      setStatus(API_STATUS.REJECTED);
      setUserData(null);
    }
  };

  // 최근 검색어 삭제
  const removeSearch = (username) => {
    const updatedSearches = removeRecentSearch(username, recentSearches);
    setRecentSearches(updatedSearches);
  };

  // 사용자 정보 카드 닫기
  const clearUserInfo = () => {
    setStatus(API_STATUS.IDLE);
    setUserData(null);
  };

  const userInfo = {
    status,
    data: userData
  };

  return {
    userInfo,
    recentSearches,
    getUserInfo,
    removeSearch,
    clearUserInfo
  };
}