// src/pages/Login/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authService';
import { container, formContainer, title, inputGroup, input, loginButton, signupText, signupLink } from './styles.css';

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // API 호출
      const response = await login({
        loginId: id,
        password: password
      });
      
      if (response.success && response.data) {
        // 로그인 성공 - userId 저장
        localStorage.setItem('userId', response.data.userId.toString());
        
        // 마이페이지로 이동
        navigate('/mypage');
      } else {
        // 서버에서 오류 메시지를 보낸 경우
        setError(response.message);
      }
    } catch (error: any) {
      // 네트워크 오류 등 예외 처리
      if (error.response && error.response.data) {
        setError(error.response.data.message || '로그인에 실패했습니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
      console.error('Login error:', error);
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className={container}>
      <div className={formContainer}>
        <h1 className={title}>로그인</h1>
        
        <form onSubmit={handleLogin}>
          <div className={inputGroup}>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={input}
            />
          </div>
          
          <div className={inputGroup}>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </div>
          
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          
          <button type="submit" className={loginButton}>
            로그인
          </button>
        </form>
        
        <div className={signupText}>
          회원이 아니신가요?
          <span className={signupLink} onClick={goToSignUp}>회원가입</span>
        </div>
      </div>
    </div>
  );
};

export default Login;