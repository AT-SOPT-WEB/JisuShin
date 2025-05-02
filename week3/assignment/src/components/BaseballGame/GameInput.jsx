// src/components/BaseballGame/GameInput.jsx
import { useState } from 'react';

function GameInput({ onSubmit, gameStatus }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && gameStatus === 'playing') {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="3자리 숫자를 입력해주세요."
        disabled={gameStatus !== 'playing'}
        className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
      />
    </form>
  );
}

export default GameInput;