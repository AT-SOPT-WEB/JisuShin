import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  container, 
  formContainer, 
  title, 
  inputGroup, 
  input, 
  button, 
  activeButton, 
  disabledButton, 
  errorText, 
  loginLink, 
  loginLinkText 
} from './styles.css';

// 회원가입 단계 정의
enum SignUpStep {
  ID = 'id',
  PASSWORD = 'password',
  NICKNAME = 'nickname',
}

const SignUp: React.FC = () => {
  const [step, setStep] = useState<SignUpStep>(SignUpStep.ID);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // 다음 단계로 이동
  const goToNextStep = () => {
    setError('');
    if (step === SignUpStep.ID) {
      setStep(SignUpStep.PASSWORD);
    } else if (step === SignUpStep.PASSWORD) {
      setStep(SignUpStep.NICKNAME);
    }
  };

  // 회원가입 제출 처리
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // API 연동 부분 (나중에 구현)
      console.log('Sign up with:', { id, password, nickname });
      
      // 회원가입 성공 시 처리
      alert('회원가입에 성공했습니다!');
      navigate('/login');
    } catch (error) {
      setError('회원가입에 실패했습니다.');
      console.error('Sign up error:', error);
    }
  };

  // 로그인 페이지로 이동
  const goToLogin = () => {
    navigate('/login');
  };

  // 버튼 활성화 여부 확인
  const isButtonDisabled = () => {
    if (step === SignUpStep.ID) {
      return id.trim() === '';
    } else if (step === SignUpStep.PASSWORD) {
      return password.trim() === '' || passwordConfirm.trim() === '' || password !== passwordConfirm;
    } else {
      return nickname.trim() === '';
    }
  };

  // 비밀번호 오류 메시지
  const getPasswordError = () => {
    if (password && passwordConfirm && password !== passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  return (
    <div className={container}>
      <div className={formContainer}>
        <h1 className={title}>회원가입</h1>
        
        <form onSubmit={step === SignUpStep.NICKNAME ? handleSignUp : (e) => { e.preventDefault(); goToNextStep(); }}>
          {step === SignUpStep.ID && (
            <div className={inputGroup}>
              <input
                type="text"
                placeholder="아이디를 입력해주세요 (8~20자, 대소문자/숫자만 가능)"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className={input}
              />
            </div>
          )}
          
          {step === SignUpStep.PASSWORD && (
            <>
              <div className={inputGroup}>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={input}
                />
              </div>
              
              <div className={inputGroup}>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className={input}
                />
                {getPasswordError() && <div className={errorText}>{getPasswordError()}</div>}
              </div>
            </>
          )}
          
          {step === SignUpStep.NICKNAME && (
            <div className={inputGroup}>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={input}
              />
            </div>
          )}
          
          {error && <div className={errorText}>{error}</div>}
          
          <button 
            type="submit" 
            className={`${button} ${isButtonDisabled() ? disabledButton : activeButton}`}
            disabled={isButtonDisabled()}
          >
            {step === SignUpStep.NICKNAME ? '회원가입' : '다음'}
          </button>
        </form>
        
        <div className={loginLink}>
          이미 회원이신가요?
          <span className={loginLinkText} onClick={goToLogin}>로그인</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;