import React, { useState } from 'react';
import { searchUsers } from '../../api/userService';
import { 
  form, 
  searchContainer, 
  input, 
  button, 
  searchButton, 
  memberList, 
  memberItem, 
  memberName 
} from './styles.css';

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');

      const response = await searchUsers(searchTerm);

      if (response.success) {
        setNicknames(response.data?.nicknameList || []);
        setSearched(true);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      console.error('Failed to search users:', error);
      setError(error.response?.data?.message || '회원 검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>회원 조회</h2>
      
      <form onSubmit={handleSearch} className={form}>
        <div className={searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="닉네임으로 검색 (비워두면 전체 조회)"
            className={input}
          />
          <button 
            type="submit" 
            disabled={loading}
            className={`${button} ${searchButton}`}
          >
            {loading ? '검색 중...' : '확인'}
          </button>
        </div>
      </form>

      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      
      {searched && (
        <div>
          <h3>검색 결과</h3>
          {nicknames.length > 0 ? (
            <ul className={memberList}>
              {nicknames.map((nickname, index) => (
                <li 
                  key={index}
                  className={memberItem}
                >
                  <div className={memberName}>{nickname}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch;