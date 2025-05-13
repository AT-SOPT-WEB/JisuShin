import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInfo from './MyInfo';
import UserSearch from './UserSearch';

// 마이페이지 탭 정의
enum MyPageTab {
  MY_INFO = 'myInfo',
  USER_SEARCH = 'userSearch',
}

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MyPageTab>(MyPageTab.MY_INFO);
  const [nickname, setNickname] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 체크 (토큰 확인)
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    
    // 사용자 정보 가져오기 (나중에 API로 대체)
    setNickname('사용자');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const updateNickname = (newNickname: string) => {
    setNickname(newNickname);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      {/* 헤더 */}
      <header style={{ 
        backgroundColor: '#4CAF50', 
        color: '#ffffff',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <div 
            style={{ 
              cursor: 'pointer',
              fontWeight: activeTab === MyPageTab.MY_INFO ? 'bold' : 'normal',
              borderBottom: activeTab === MyPageTab.MY_INFO ? '2px solid #ffffff' : 'none'
            }}
            onClick={() => setActiveTab(MyPageTab.MY_INFO)}
          >
            내 정보
          </div>
          <div 
            style={{ 
              cursor: 'pointer',
              fontWeight: activeTab === MyPageTab.USER_SEARCH ? 'bold' : 'normal',
              borderBottom: activeTab === MyPageTab.USER_SEARCH ? '2px solid #ffffff' : 'none'
            }}
            onClick={() => setActiveTab(MyPageTab.USER_SEARCH)}
          >
            회원 조회
          </div>
          <div 
            style={{ cursor: 'pointer' }}
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </nav>
        <div style={{ fontWeight: 'bold' }}>{nickname}</div>
      </header>
      
      {/* 콘텐츠 */}
      <div style={{ 
        flex: 1, 
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}>
        {activeTab === MyPageTab.MY_INFO ? (
          <MyInfo nickname={nickname} onUpdateNickname={updateNickname} />
        ) : (
          <UserSearch />
        )}
      </div>
    </div>
  );
};

export default MyPage;