import GameInput from '../baseball/GameInput';
import GameMessage from '../baseball/GameMessage';
import GameHistoryList from '../baseball/GameHistoryList';
import useBaseballGame from '../../hooks/useBaseballGame';

function BaseballGame() {
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

export default BaseballGame;