// src/hooks/useBaseballGame.js
import { useState, useEffect, useCallback } from 'react';
import { GAME_STATUS, GAME_SETTINGS, GAME_MESSAGES } from '../constants/baseball';

export default function useBaseballGame() {
  // 게임 상태
  const [gameState, setGameState] = useState({
    answer: [],
    guesses: [],
    message: '',
    status: GAME_STATUS.PLAYING,
    attempts: 0
  });
  
  // 랜덤 3자리 숫자 생성
  const generateAnswer = useCallback(() => {
    const numbers = Array.from({ length: 10 }, (_, i) => i); // [0, 1, 2, ..., 9]
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    const answer = shuffled.slice(0, 3);
    console.log('정답:', answer.join('')); // 테스트용 정답 출력
    return answer;
  }, []);

  // 게임 초기화
  const resetGame = useCallback(() => {
    setGameState({
      answer: generateAnswer(),
      guesses: [],
      message: '',
      status: 'playing',
      attempts: 0
    });
  }, [generateAnswer]);

  // 컴포넌트 마운트 시 게임 초기화
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // 게임 종료 시 자동 리셋
  useEffect(() => {
    const { status } = gameState;
    
    if (status === GAME_STATUS.PLAYING) return;
    
    const delay = status === GAME_STATUS.WON 
      ? GAME_SETTINGS.RESET_DELAY.WIN
      : GAME_SETTINGS.RESET_DELAY.LOSE;
    const timer = setTimeout(resetGame, delay);
    
    return () => clearTimeout(timer);
  }, [gameState.status, resetGame]);

  // 숫자 유효성 검사
  const validateGuess = (guess) => {
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
  const calculateResult = (guessDigits) => {
    const { answer } = gameState;
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
  const getResultMessage = (result) => {
    const { strikes, balls } = result;
    
    if (strikes === 0 && balls === 0) return GAME_MESSAGES.OUT;
    return GAME_MESSAGES.STRIKE_BALL(strikes, balls);
  };

  // 게임 진행
  const makeGuess = (guess) => {
    // 이미 게임이 끝났으면 무시
    if (gameState.status !== 'playing') return;
    
    // 유효성 검사
    const validation = validateGuess(guess);
    if (!validation.valid) {
      setGameState(prev => ({ ...prev, message: validation.message }));
      return;
    }

    // 시도 횟수 증가 및 결과 계산
    const guessDigits = [...guess];
    const newAttempts = gameState.attempts + 1;
    const result = calculateResult(guessDigits);
    const resultMessage = getResultMessage(result);
    
    // 새 추측 기록 생성
    const newGuess = { number: guess, result: resultMessage };
    
    // 게임 상태 업데이트 로직
    setGameState(prev => {
      const newState = {
        ...prev,
        guesses: [...prev.guesses, newGuess],
        attempts: newAttempts
      };
      
      // 승리 조건
      if (result.strikes === 3) {
        newState.message = GAME_MESSAGES.VICTORY;
        newState.status = GAME_STATUS.WON;
      } 
      // 패배 조건
      else if (newAttempts >= GAME_SETTINGS.MAX_ATTEMPTS) {
        newState.message = GAME_MESSAGES.DEFEAT;
        newState.status = GAME_STATUS.LOST;
      } 
      // 계속 진행
      else {
        newState.message = `${result.strikes} 스트라이크 ${result.balls} 볼`;
      }
      
      return newState;
    });
  };

  return {
    guesses: gameState.guesses,
    message: gameState.message,
    status: gameState.status,
    attempts: gameState.attempts,
    maxAttempts: GAME_SETTINGS.MAX_ATTEMPTS,
    makeGuess,
    resetGame
  };
}