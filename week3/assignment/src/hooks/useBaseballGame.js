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
  const [answer, setAnswer] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(GAME_STATUS.PLAYING);
  const [attempts, setAttempts] = useState(0);

  // 게임 초기화
  const resetGame = useCallback(() => {
    setAnswer(generateAnswer());
    setGuesses([]);
    setMessage('');
    setStatus(GAME_STATUS.PLAYING);
    setAttempts(0);
  }, []);

  // 컴포넌트 마운트 시 게임 초기화
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // 게임 종료 시 자동 리셋
  useEffect(() => {
    if (status === GAME_STATUS.PLAYING) return;
    
    const delay = status === GAME_STATUS.WON 
      ? GAME_SETTINGS.RESET_DELAY.WIN
      : GAME_SETTINGS.RESET_DELAY.LOSE;
    
    const timer = setTimeout(resetGame, delay);
    
    return () => clearTimeout(timer);
  }, [status, resetGame]);

  // 게임 진행
  const makeGuess = (guess) => {
    // 이미 게임이 끝났으면 무시
    if (status !== GAME_STATUS.PLAYING) return;
    
    // 유효성 검사
    const validation = validateGuess(guess);
    if (!validation.valid) {
      setMessage(validation.message);
      return;
    }

    // 시도 횟수 증가 및 결과 계산
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    const guessDigits = [...guess];
    const result = calculateResult(guessDigits, answer);
    const resultMessage = getResultMessage(result);
    
    // 새 추측 기록 추가
    const newGuess = { number: guess, result: resultMessage };
    setGuesses(prev => [...prev, newGuess]);
    
    // 승리 조건
    if (result.strikes === 3) {
      // 승리 조건
      setMessage(GAME_MESSAGES.VICTORY);
      setStatus(GAME_STATUS.WON);
    } 
    else if (newAttempts >= GAME_SETTINGS.MAX_ATTEMPTS) {
      // 패배 조건
      setMessage(GAME_MESSAGES.DEFEAT);
      setStatus(GAME_STATUS.LOST);
    } 
    else {
      // 계속 진행
      setMessage(GAME_MESSAGES.STRIKE_BALL(result.strikes, result.balls));
    }
  };

  return {
    guesses,
    message,
    status,
    attempts,
    maxAttempts: GAME_SETTINGS.MAX_ATTEMPTS,
    makeGuess,
    resetGame
  };
}