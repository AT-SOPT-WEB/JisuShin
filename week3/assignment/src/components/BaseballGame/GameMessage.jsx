// src/components/BaseballGame/GameMessage.jsx
function GameMessage({ message }) {
  return (
    <div className="text-center mb-6">
      {message && (
        <p className={`text-lg ${message.includes('정답') ? 'text-green-600 font-bold' : ''}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default GameMessage;