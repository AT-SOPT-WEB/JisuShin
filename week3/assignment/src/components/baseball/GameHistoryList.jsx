function GameHistoryList({ guesses }) {
  if (guesses.length === 0) return null;
  
  return (
    <div className="space-y-2">
      {guesses.map((guess, index) => (
        <div 
          key={index} 
          className="bg-blue-50 p-3 rounded-lg flex items-center"
        >
          <span className="text-gray-500 w-10">#{index + 1}</span>
          <span className="font-medium flex-grow text-center">{guess.number} - {guess.result}</span>
        </div>
      ))}
    </div>
  );
}

export default GameHistoryList;