import React, { useState } from 'react';

interface User {
  id: string;
  nickname: string;
  email: string;
}

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API 연동 (나중에 구현)
      console.log('Searching for:', searchTerm);
      
      // 임시 데이터
      setTimeout(() => {
        const mockUsers = [
          { id: '1', nickname: '사용자1', email: 'user1@example.com' },
          { id: '2', nickname: '사용자2', email: 'user2@example.com' },
          { id: '3', nickname: '사용자3', email: 'user3@example.com' },
        ];
        
        setUsers(mockUsers);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Search error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>회원 조회</h2>
      
      <form onSubmit={handleSearch}>
        <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="회원 검색"
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #e0e0e0',
              fontSize: '16px'
            }}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              backgroundColor: '#4CAF50',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none'
            }}
          >
            {isLoading ? '검색 중...' : '확인'}
          </button>
        </div>
      </form>
      
      {users.length > 0 ? (
        <div style={{ 
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {users.map((user) => (
            <div 
              key={user.id} 
              style={{ 
                padding: '15px',
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{user.nickname}</div>
              <div style={{ color: '#666666', fontSize: '14px' }}>{user.email}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default UserSearch;