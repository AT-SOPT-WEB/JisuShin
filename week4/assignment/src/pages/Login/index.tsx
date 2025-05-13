import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { container, formContainer, title, inputGroup, input, loginButton, signupText, signupLink } from './styles.css';

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('Login attempt with:', id, password);
    
    // 실제 API 연동 시 아래와 같이 구현
    // try {
    //   const response = await axios.post('서버_URL/login', { id, password });
    //   if (response.data && response.data.userId) {
    //     localStorage.setItem('userId', response.data.userId);
    //     navigate('/mypage');
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    //   alert('로그인에 실패했습니다.');
    // }
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