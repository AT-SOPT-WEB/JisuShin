// src/components/GitHubSearch/SearchBar.jsx
import { useState } from 'react';
import Input from '../common/Input';

function SearchBar({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Github 프로필을 검색해보세요."
      />
    </form>
  );
}

export default SearchBar;