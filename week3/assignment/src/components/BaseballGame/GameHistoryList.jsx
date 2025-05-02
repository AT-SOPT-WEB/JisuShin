// src/components/BaseballGame/GameHistoryList.jsx
function GameHistoryList({ guesses }) {
  if (guesses.length === 0) return null;
  
  return (
    <div className="space-y-2">
      {guesses.map((guess, index) => (
        <div key={index} className="bg-blue-50 p-3 rounded-lg text-center">
          {guess.number} - {guess.result}
        </div>
      ))}
    </div>
  );
}

export default GameHistoryList;