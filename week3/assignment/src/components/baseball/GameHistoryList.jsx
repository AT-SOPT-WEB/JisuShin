// src/components/BaseballGame/GameHistoryList.jsx
function GameHistoryList({ guesses }) {
  if (guesses.length === 0) return null;
  
  return (
    <div className="space-y-2">
      {guesses.map((guess, index) => (
        <div 
          key={index} 
          className="bg-blue-50 p-3 rounded-lg text-center flex justify-between items-center"
        >
          <span className="text-gray-500">#{index + 1}</span>
          <span className="font-medium">{guess.number} - {guess.result}</span>
          <span className="w-4"></span> {/* 균형을 위한 빈 공간 */}
        </div>
      ))}
    </div>
  );
}

export default GameHistoryList;