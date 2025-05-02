// src/App.jsx
import { useState } from 'react';
import Header from './components/Header';

function App() {
  const [currentTab, setCurrentTab] = useState('github'); // 기본 탭은 github

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="container mx-auto p-4">
        {currentTab === 'github' ? (
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">GitHub 검색</h2>
            <p>GitHub 검색 기능 구현 예정</p>
          </div>
        ) : (
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">숫자야구 게임</h2>
            <p>숫자야구 게임 구현 예정</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;