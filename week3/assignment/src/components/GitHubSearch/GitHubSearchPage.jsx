// src/components/GitHubSearch/GitHubSearchPage.jsx
import SearchBar from './SearchBar';
import UserCard from './UserCard';
import RecentSearches from './RecentSearches';
import useGitHubSearch from '../../hooks/useGitHubSearch';

function GitHubSearchPage() {
  const { userInfo, recentSearches, getUserInfo, removeSearch, clearUserInfo } = useGitHubSearch();

  return (
    <div className="p-4">
      <SearchBar onSearch={getUserInfo} />
      <RecentSearches 
        searches={recentSearches} 
        onRemove={removeSearch} 
        onSelect={getUserInfo} 
      />
      {userInfo.status === 'resolved' && (
        <UserCard userInfo={userInfo} onClose={clearUserInfo} />
      )}
    </div>
  );
}

export default GitHubSearchPage;