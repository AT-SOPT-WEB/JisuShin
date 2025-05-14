// src/pages/MyPage/index.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyInfo } from '../../api/userService';
import MyInfo from './MyInfo';
import UserSearch from './UserSearch';
import { 
  container,
  content,
  header,
  tabsContainer,
  tab,
  activeTab,
  userNameContainer
} from './styles.css';

enum MyPageTab {
  MY_INFO = 'myInfo',
  USER_SEARCH = 'userSearch',
}

const MyPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<MyPageTab>(MyPageTab.MY_INFO);
  const [nickname, setNickname] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyInfo = async () => {
      // 로그인 체크 (토큰 확인)
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        const response = await getMyInfo();
        
        if (response.success) {
          setNickname(response.data?.nickname || '');
        } else {
          setError(response.message);
          // 인증 관련 오류인 경우 로그인 페이지로 이동
          if (response.code === 'USER_002') {
            localStorage.removeItem('userId');
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setError('사용자 정보를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const updateNickname = (newNickname: string) => {
    setNickname(newNickname);
  };

  const handleTabChange = (tab: MyPageTab) => {
    setCurrentTab(tab);
  };

  return (
    <div className={container}>
      {/* 헤더 */}
      <header className={header}>
        <div className={tabsContainer}>
          <div 
            className={`${tab} ${currentTab === MyPageTab.MY_INFO ? activeTab : ''}`}
            onClick={() => handleTabChange(MyPageTab.MY_INFO)}
          >
            내 정보
          </div>
          <div 
            className={`${tab} ${currentTab === MyPageTab.USER_SEARCH ? activeTab : ''}`}
            onClick={() => handleTabChange(MyPageTab.USER_SEARCH)}
          >
            회원 조회
          </div>
          <div 
            className={tab}
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </div>
        <div className={userNameContainer}>{nickname}</div>
      </header>
      
      {/* 콘텐츠 */}
      <div className={content}>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          currentTab === MyPageTab.MY_INFO ? (
            <MyInfo nickname={nickname} onUpdateNickname={updateNickname} />
          ) : (
            <UserSearch />
          )
        )}
      </div>
    </div>
  );
};

export default MyPage;