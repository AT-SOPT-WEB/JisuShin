// src/components/BaseballGame/GameMessage.jsx
function GameMessage({ message, attempts, maxAttempts, gameStatus }) {
  // 메시지 스타일 결정
  const getMessageStyle = () => {
    if (gameStatus === 'won') return 'text-green-600 font-bold';
    if (gameStatus === 'lost') return 'text-red-600 font-bold';
    return '';
  };

  return (
    <div className="text-center mb-6">
      {attempts > 0 && (
        <div className="mb-2 text-sm text-gray-600">
          시도 횟수: {attempts}/{maxAttempts}
        </div>
      )}
      {message && (
        <p className={`text-lg ${getMessageStyle()}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default GameMessage;