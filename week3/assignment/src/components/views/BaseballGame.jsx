import InputForm from '../common/InputForm';
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
      <InputForm
        onSubmit={makeGuess}
        placeholder="3자리 숫자를 입력해주세요."
        disabled={status !== GAME_STATUS.PLAYING}
        maxLength={3}
        autoFocus
      />
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