import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import barsIcon from '../../../assets/icons/bars-solid.svg';
import { 
  header, 
  nav, 
  navItem, 
  activeNavItem, 
  userName,
  menuIcon,
  mobileNav,
  mobileNavItem
} from './styles.css';

interface HeaderProps {
  nickname: string;
}

const Header: React.FC<HeaderProps> = ({ nickname }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className={header}>
      {isMobile && (
        <div onClick={toggleMobileMenu} style={{ cursor: 'pointer' }}>
          <img src={barsIcon} alt="메뉴" className={menuIcon} />
        </div>
      )}
      
      {!isMobile && (
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
      )}
      
      {isMobile && showMobileMenu && (
        <nav className={mobileNav}>
          <div 
            className={`${mobileNavItem} ${isActive('/mypage/info') ? activeNavItem : ''}`}
            onClick={() => handleNavigate('/mypage/info')}
          >
            내 정보
          </div>
          <div 
            className={`${mobileNavItem} ${isActive('/mypage/search') ? activeNavItem : ''}`}
            onClick={() => handleNavigate('/mypage/search')}
          >
            회원 조회
          </div>
          <div 
            className={mobileNavItem}
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </nav>
      )}
      
      <div className={userName}>{nickname}</div>
    </header>
  );
};

export default Header;