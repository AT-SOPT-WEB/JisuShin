import React from 'react';
import Button from './Button';

function Header({ currentTab, setCurrentTab }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center">⚾ 숫자야구 || 깃허브 검색 🤔</h1>
        <div className="flex justify-center space-x-4">
          <Button
            variant={currentTab === 'github' ? 'secondary' : 'primary'}
            onClick={() => setCurrentTab('github')}
          >
            깃허브 검색 🔍
          </Button>
          <Button
            variant={currentTab === 'baseball' ? 'secondary' : 'primary'}
            onClick={() => setCurrentTab('baseball')}
          >
            숫자야구 ⚾
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;