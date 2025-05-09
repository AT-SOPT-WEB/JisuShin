export const GAME_STATUS = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost'
};

export const GAME_SETTINGS = {
  MAX_ATTEMPTS: 10,
  RESET_DELAY: {
    WIN: 3000,
    LOSE: 5000
  }
};

export const GAME_MESSAGES = {
  VICTORY: '🎉 정답입니다 ! 3초 후에 게임이 리셋됩니다.',
  DEFEAT: '💥 게임 오버 ! 10번을 넘겨서 실패하였습니다. 게임이 초기화됩니다.',
  
  NUMERIC_ONLY: '숫자만 입력할 수 있습니다.',
  MAX_DIGITS: '3자리 이하의 숫자만 입력할 수 있습니다.',
  UNIQUE_DIGITS: '서로 다른 숫자 3자리를 입력해주세요 !',
  
  OUT: 'OUT',
  STRIKE_BALL: (strikes, balls) => `${strikes} 스트라이크 ${balls} 볼`
};