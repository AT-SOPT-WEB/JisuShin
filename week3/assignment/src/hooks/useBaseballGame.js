// src/hooks/useBaseballGame.js
import { useState, useEffect, useCallback } from 'react';

export default function useBaseballGame() {
  // 게임 상태 관리
  const [answer, setAnswer] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  // 랜덤 3자리 숫자 생성
  const generateAnswer = useCallback(() => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    const newAnswer = shuffled.slice(0, 3);
    console.log('정답:', newAnswer.join('')); // 테스트용 정답 출력
    return newAnswer;
  }, []);

  // 게임 초기화
  const resetGame = useCallback(() => {
    const newAnswer = generateAnswer();
    setAnswer(newAnswer);
    setGuesses([]);
    setMessage('');
    setGameStatus('playing');
  }, [generateAnswer]);

  // 게임 시작시 초기화
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // 게임 승리 시 3초 후 초기화
  useEffect(() => {
    if (gameStatus === 'won') {
      const timer = setTimeout(() => {
        resetGame();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus, resetGame]);

  // 숫자 유효성 검사
  const validateGuess = (guess) => {
    // 숫자만 입력 가능
    if (!/^\d+$/.test(guess)) {
      return { valid: false, message: '숫자만 입력할 수 있습니다.' };
    }

    // 3자리 이하인지 확인
    if (guess.length > 3) {
      return { valid: false, message: '3자리 이하의 숫자만 입력할 수 있습니다.' };
    }

    // 중복된 숫자가 있는지 확인
    const digits = guess.split('');
    const uniqueDigits = [...new Set(digits)];
    if (digits.length !== uniqueDigits.length) {
      return { valid: false, message: '서로 다른 숫자 3자리를 입력해주세요!' };
    }

    return { valid: true, message: '' };
  };

  // 게임 결과 계산
  const calculateResult = (guess) => {
    const guessDigits = guess.split('').map(Number);
    let strikes = 0;
    let balls = 0;

    guessDigits.forEach((digit, index) => {
      if (digit === answer[index]) {
        strikes++;
      } else if (answer.includes(digit)) {
        balls++;
      }
    });

    return { strikes, balls };
  };

  // 게임 진행
  const makeGuess = (guess) => {
    // 유효성 검사
    const validation = validateGuess(guess);
    if (!validation.valid) {
      setMessage(validation.message);
      return;
    }

    // 결과 계산
    const result = calculateResult(guess);
    const resultMessage = result.strikes === 0 && result.balls === 0
      ? 'OUT'
      : `${result.strikes}S ${result.balls}B`;

    // 게임 기록 업데이트
    const newGuess = { number: guess, result: resultMessage };
    setGuesses(prev => [...prev, newGuess]);

    // 승리 조건 확인
    if (result.strikes === 3) {
      setMessage('정답입니다! 3초 후에 게임이 리셋됩니다.');
      setGameStatus('won');
    } else {
      setMessage(`${result.strikes} 스트라이크 ${result.balls} 볼`);
    }
  };

  return {
    guesses,
    message,
    gameStatus,
    makeGuess,
    resetGame
  };
}