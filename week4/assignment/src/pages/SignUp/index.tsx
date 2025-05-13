import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/authService'; 
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
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();

  // 아이디 유효성 검사
  useEffect(() => {
    if (id) {
      if (id.length < 8) {
        setIdError('아이디는 8자 이상이어야 합니다.');
      } else if (id.length > 20) {
        setIdError('아이디는 20자 이하여야 합니다.');
      } else if (!/^[a-zA-Z0-9]+$/.test(id)) {
        setIdError('아이디는 대소문자/숫자만 사용 가능합니다.');
      } else {
        setIdError('');
      }
    } else {
      setIdError('');
    }
  }, [id]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (password) {
      if (password.length < 8) {
        setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      } else if (password.length > 20) {
        setPasswordError('비밀번호는 20자 이하여야 합니다.');
      } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
        setPasswordError('비밀번호는 대소문자/숫자만 사용 가능합니다.');
      } else if (passwordConfirm && password !== passwordConfirm) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordError('');
    }
  }, [password, passwordConfirm]);

  // 다음 단계로 이동
  const goToNextStep = () => {
    setError('');

    // 현재 단계에서의 유효성 검사
    if (step === SignUpStep.ID) {
      if (id.trim() === '') {
        setIdError('아이디를 입력해주세요.');
        return;
      }
      if (idError) {
        return;
      }
      setStep(SignUpStep.PASSWORD);
    } else if (step === SignUpStep.PASSWORD) {
      if (password.trim() === '') {
        setPasswordError('비밀번호를 입력해주세요.');
        return;
      }
      if (passwordConfirm.trim() === '') {
        setPasswordError('비밀번호 확인을 입력해주세요.');
        return;
      }
      if (password !== passwordConfirm) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (passwordError) {
        return;
      }
      setStep(SignUpStep.NICKNAME);
    }
  };

  // 회원가입 제출 처리
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (nickname.trim() === '') {
      setError('닉네임을 입력해주세요.');
      return;
    }

    try {
      // API 호출
      const response = await signUp({
        loginId: id,
        password: password,
        nickname: nickname
      });
      
      if (response.success) {
        // 회원가입 성공
        alert(`${response.data?.nickname}님, 회원가입에 성공했습니다!`);
        navigate('/login');
      } else {
        // 서버에서 오류 메시지를 보낸 경우
        setError(response.message);
      }
    } catch (error: any) {
      // 네트워크 오류 등 예외 처리
      if (error.response && error.response.data) {
        setError(error.response.data.message || '회원가입에 실패했습니다.');
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
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
      return id.trim() === '' || idError !== '';
    } else if (step === SignUpStep.PASSWORD) {
      return password.trim() === '' || 
             passwordConfirm.trim() === '' || 
             password !== passwordConfirm || 
             passwordError !== '';
    } else {
      return nickname.trim() === '';
    }
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
              {idError && <div className={errorText}>{idError}</div>}
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
                {passwordError && <div className={errorText}>{passwordError}</div>}
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