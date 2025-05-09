// src/App.jsx
import { useState } from 'react';
import Header from './components/common/Header';
import GitHubSearch from './components/views/GitHubSearch';
import BaseballGame from './components/views/BaseballGame';
import { TAB_TYPES } from './constants/tabs';

function App() {
  const [currentTab, setCurrentTab] = useState(TAB_TYPES.GITHUB); // 기본 탭은 github

  const TAB_COMPONENTS = {
    [TAB_TYPES.GITHUB]: <GitHubSearch />,
    [TAB_TYPES.BASEBALL]: <BaseballGame />
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="container mx-auto p-4 max-w-xl">
        {TAB_COMPONENTS[currentTab]}
      </main>
    </div>
  );
}

export default App;