import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { header, nav, navItem, activeNavItem, userName } from './styles.css';

interface HeaderProps {
  nickname: string;
}

const Header: React.FC<HeaderProps> = ({ nickname }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // 로그아웃 처리: localStorage에서 userId 제거
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <header className={header}>
      <nav className={nav}>
        <div 
          className={`${navItem} ${isActive('/mypage/info') ? activeNavItem : ''}`}
          onClick={() => handleNavigate('/mypage/info')}
        >
          내 정보
        </div>
        <div 
          className={`${navItem} ${isActive('/mypage/search') ? activeNavItem : ''}`}
          onClick={() => handleNavigate('/mypage/search')}
        >
          회원 조회
        </div>
        <div 
          className={navItem}
          onClick={handleLogout}
        >
          로그아웃
        </div>
      </nav>
      <div className={userName}>{nickname}</div>
    </header>
  );
};

export default Header;