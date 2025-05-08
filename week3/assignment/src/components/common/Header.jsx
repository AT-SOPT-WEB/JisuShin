import React from 'react';
import Button from './Button';
import { TAB_TYPES } from '../../constants/tabs';

function Header({ currentTab, setCurrentTab }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center">⚾ 숫자야구 || 깃허브 검색 🤔</h1>
        <div className="flex justify-center space-x-4">
          <Button
            variant={currentTab === TAB_TYPES.GITHUB && 'secondary'}
            onClick={() => setCurrentTab(TAB_TYPES.GITHUB)}
          >
            깃허브 검색 🔍
          </Button>
          <Button
            variant={currentTab === TAB_TYPES.BASEBALL && 'secondary'}
            onClick={() => setCurrentTab(TAB_TYPES.BASEBALL)}
          >
            숫자야구 ⚾
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;