import { STORAGE_KEYS } from '../constants/github';

// 최근 검색어 로드
export const loadRecentSearches = () => {
  const savedSearches = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
  return savedSearches ? JSON.parse(savedSearches) : [];
};

// 최근 검색어 저장
export const saveRecentSearches = (searches) => {
  localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(searches));
};

// 최근 검색어 추가
export const addRecentSearch = (username, currentSearches) => {
  if (!currentSearches.includes(username)) {
    const updatedSearches = [...currentSearches, username];
    saveRecentSearches(updatedSearches);
    return updatedSearches;
  }
  return currentSearches;
};

// 최근 검색어 삭제
export const removeRecentSearch = (username, currentSearches) => {
  const updatedSearches = currentSearches.filter(search => search !== username);
  saveRecentSearches(updatedSearches);
  return updatedSearches;
};