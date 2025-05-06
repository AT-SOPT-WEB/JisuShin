// src/App.jsx
import { useState } from 'react';
import Header from './components/common/Header';
import GitHubSearch from './components/views/GitHubSearch';
import BaseballGame from './components/views/BaseballGame';

function App() {
  const [currentTab, setCurrentTab] = useState('github'); // 기본 탭은 github

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="container mx-auto p-4 max-w-xl">
        {currentTab === 'github' ? (
          <GitHubSearch />
        ) : (
          <BaseballGame />
        )}
      </main>
    </div>
  );
}

export default App;