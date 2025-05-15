import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMyInfo } from '../../api/userService';
import Header from '../../components/common/Header';
import MyInfo from './MyInfo';
import UserSearch from './UserSearch';
import { 
  container,
  content
} from './styles.css';

enum MyPageTab {
  MY_INFO = 'myInfo',
  USER_SEARCH = 'userSearch',
}

const MyPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<MyPageTab>(MyPageTab.MY_INFO);
  const [nickname, setNickname] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/mypage/search')) {
      setCurrentTab(MyPageTab.USER_SEARCH);
    } else {
      setCurrentTab(MyPageTab.MY_INFO);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchMyInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }
      
      try {
        const response = await getMyInfo();
        if (response.success && response.data) {
          setNickname(response.data.nickname || '');
        } else if (response.code === 'USER_002') {
          localStorage.removeItem('userId');
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchMyInfo();
  }, [navigate]);

  const updateNickname = (newNickname: string) => {
    setNickname(newNickname);
  };

  return (
    <div className={container}>
      <Header nickname={nickname} />
      
      <div className={content}>
        {currentTab === MyPageTab.MY_INFO ? (
          <MyInfo nickname={nickname} onUpdateNickname={updateNickname} />
        ) : (
          <UserSearch />
        )}
      </div>
    </div>
  );
};

export default MyPage;