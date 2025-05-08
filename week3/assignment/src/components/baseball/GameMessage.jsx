import { GAME_STATUS } from '../../constants/baseball';
import classNames from 'classnames';

function GameMessage({ message, attempts, maxAttempts, gameStatus }) {
  const isAlert = gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST;

  // classNames 라이브러리를 사용한 조건부 스타일링
  const messageClasses = classNames('text-lg', {
    'text-green-600 font-bold': gameStatus === GAME_STATUS.WON,
    'text-red-600 font-bold': gameStatus === GAME_STATUS.LOST
  });

  return (
    <div className="text-center mb-6">
      {attempts > 0 && (
        <div className="mb-2 text-sm text-gray-600">
          시도 횟수: {attempts}/{maxAttempts}
        </div>
      )}
      {message && (
        <p 
          className={messageClasses}
          role={isAlert ? "alert" : "status"}
          aria-live={isAlert ? "assertive" : "polite"}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default GameMessage;