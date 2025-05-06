import { GAME_MESSAGES } from '../constants/baseball';

// 랜덤 3자리 숫자 생성
export const generateAnswer = () => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const shuffled = [...numbers].sort(() => Math.random() - 0.5);
  const answer = shuffled.slice(0, 3);
  console.log('정답:', answer.join(''));
  return answer;
};

// 숫자 유효성 검사
export const validateGuess = (guess) => {
  // 숫자만 입력 가능
  if (!/^\d+$/.test(guess)) {
    return { valid: false, message: GAME_MESSAGES.NUMERIC_ONLY };
  }

  // 3자리 이하 확인
  if (guess.length > 3) {
    return { valid: false, message: GAME_MESSAGES.MAX_DIGITS };
  }

  // 중복 숫자 확인
  const digits = [...guess];
  if (new Set(digits).size !== digits.length) {
    return { valid: false, message: GAME_MESSAGES.UNIQUE_DIGITS };
  }

  return { valid: true, message: '' };
};

// 게임 결과 계산
export const calculateResult = (guessDigits, answer) => {
  const result = { strikes: 0, balls: 0 };
  
  guessDigits.forEach((digit, index) => {
    const numDigit = Number(digit);
    
    if (numDigit === answer[index]) {
      result.strikes++;
    } else if (answer.includes(numDigit)) {
      result.balls++;
    }
  });
  
  return result;
};

// 게임 결과 메시지 생성
export const getResultMessage = (result) => {
  const { strikes, balls } = result;
  
  if (strikes === 0 && balls === 0) return GAME_MESSAGES.OUT;
  return GAME_MESSAGES.STRIKE_BALL(strikes, balls);
};