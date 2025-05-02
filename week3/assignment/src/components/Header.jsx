// src/components/Header.jsx
import React from 'react';

function Header({ currentTab, setCurrentTab }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center">⚾ 숫자야구 || 깃허브 검색 🤔</h1>
        <div className="flex justify-center space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${currentTab === 'github' ? 'bg-gray-800' : 'bg-blue-800 hover:bg-blue-700'}`}
            onClick={() => setCurrentTab('github')}
          >
            깃허브 검색 🔍
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${currentTab === 'baseball' ? 'bg-gray-800' : 'bg-blue-800 hover:bg-blue-700'}`}
            onClick={() => setCurrentTab('baseball')}
          >
            숫자야구 ⚾
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;