import InputForm from '../common/InputForm';
import RecentSearches from '../github/RecentSearches';
import StatusContent from '../github/StatusContent';
import useGitHubSearch from '../../hooks/useGitHubSearch';

function GitHubSearch() {
  const { userInfo, recentSearches, getUserInfo, removeSearch, clearUserInfo } = useGitHubSearch();

  return (
    <div className="p-4">
      <InputForm
        onSubmit={getUserInfo}
        placeholder="Github 프로필을 검색해보세요."
      />
      <RecentSearches 
        searches={recentSearches} 
        onRemove={removeSearch} 
        onSelect={getUserInfo} 
      />
      <StatusContent 
        status={userInfo.status} 
        userInfo={userInfo} 
        onClose={clearUserInfo} 
      />
    </div>
  );
}

export default GitHubSearch;