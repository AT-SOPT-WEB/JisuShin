// src/components/BaseballGame/BaseballGamePage.jsx
import useBaseballGame from '../../hooks/useBaseballGame';
import GameInput from './GameInput';
import GameMessage from './GameMessage';
import GameHistoryList from './GameHistoryList';

function BaseballGamePage() {
  const { guesses, message, gameStatus, makeGuess } = useBaseballGame();

  return (
    <div className="p-4">
      <GameInput onSubmit={makeGuess} gameStatus={gameStatus} />
      <GameMessage message={message} />
      <GameHistoryList guesses={guesses} />
    </div>
  );
}

export default BaseballGamePage;