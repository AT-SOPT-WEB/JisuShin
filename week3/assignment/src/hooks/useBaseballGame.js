// src/hooks/useBaseballGame.js
import { useState, useEffect, useCallback } from 'react';
import { GAME_STATUS, GAME_SETTINGS, GAME_MESSAGES } from '../constants/baseball';
import { 
  generateAnswer, 
  validateGuess, 
  calculateResult, 
  getResultMessage 
} from '../utils/baseballUtils';

export default function useBaseballGame() {
  // 게임 상태
  const [gameState, setGameState] = useState({
    answer: [],
    guesses: [],
    message: '',
    status: GAME_STATUS.PLAYING,
    attempts: 0
  });

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
    const result = calculateResult(guessDigits, gameState.answer);
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