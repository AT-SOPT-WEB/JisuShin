import { useState } from 'react';
import Input from '../common/Input';
import { GAME_STATUS } from '../../constants/baseball';

function GameInput({ onSubmit, gameStatus }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && gameStatus === GAME_STATUS.PLAYING) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="3자리 숫자를 입력해주세요."
        disabled={gameStatus !== GAME_STATUS.PLAYING}
        maxLength={3}
        autoFocus
      />
    </form>
  );
}

export default GameInput;