// src/App.jsx
import { useState } from 'react';
import Header from './components/Header';
import GitHubSearchPage from './components/GitHubSearch/GitHubSearchPage';

function App() {
  const [currentTab, setCurrentTab] = useState('github'); // 기본 탭은 github

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="container mx-auto p-4 max-w-xl">
        {currentTab === 'github' ? (
          <GitHubSearchPage />
        ) : (
          <div>
            <p>숫자야구 게임 구현 예정</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;