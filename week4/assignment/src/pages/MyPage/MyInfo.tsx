import React, { useState } from 'react';
import { updateNickname } from '../../api/userService';
import { 
  form, 
  inputGroup, 
  input, 
  button 
} from './styles.css';

interface MyInfoProps {
  nickname: string;
  onUpdateNickname: (newNickname: string) => void;
}

const MyInfo: React.FC<MyInfoProps> = ({ nickname, onUpdateNickname }) => {
  const [newNickname, setNewNickname] = useState(nickname);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await updateNickname({ nickname: newNickname });
      
      if (response.success) {
        setSuccess('닉네임이 성공적으로 변경되었습니다.');
        onUpdateNickname(newNickname);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      console.error('Failed to update nickname:', error);
      setError(error.response?.data?.message || '닉네임 변경 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>내 정보 수정하기</h2>
      
      <form onSubmit={handleSubmit} className={form}>
        <div className={inputGroup}>
          <label htmlFor="nickname">새 닉네임</label>
          <input
            id="nickname"
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="새 닉네임을 입력하세요"
            className={input}
          />
        </div>

        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '15px' }}>{success}</p>}
        
        <button 
          type="submit" 
          disabled={loading}
          className={button}
        >
          {loading ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  );
};

export default MyInfo;