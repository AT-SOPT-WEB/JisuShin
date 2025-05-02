// src/components/BaseballGame/BaseballGamePage.jsx
import useBaseballGame from '../../hooks/useBaseballGame';
import GameInput from './GameInput';
import GameMessage from './GameMessage';
import GameHistoryList from './GameHistoryList';

function BaseballGamePage() {
  const { 
    guesses, 
    message, 
    status, 
    attempts, 
    maxAttempts,
    makeGuess 
  } = useBaseballGame();

  return (
    <div className="p-4">
      <GameInput onSubmit={makeGuess} gameStatus={status} />
      <GameMessage 
        message={message} 
        attempts={attempts} 
        maxAttempts={maxAttempts}
        gameStatus={status}
      />
      <GameHistoryList guesses={guesses} />
    </div>
  );
}

export default BaseballGamePage;