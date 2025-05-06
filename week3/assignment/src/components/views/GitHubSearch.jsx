import InputForm from '../common/InputForm';
import UserCard from '../github/UserCard';
import RecentSearches from '../github/RecentSearches';
import useGitHubSearch from '../../hooks/useGitHubSearch';
import { API_STATUS } from '../../constants/github';

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
      {userInfo.status === API_STATUS.RESOLVED && (
        <UserCard userInfo={userInfo} onClose={clearUserInfo} />
      )}
    </div>
  );
}

export default GitHubSearch;