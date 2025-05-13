import React, { useState } from 'react';

interface MyInfoProps {
  nickname: string;
  onUpdateNickname: (newNickname: string) => void;
}

const MyInfo: React.FC<MyInfoProps> = ({ nickname, onUpdateNickname }) => {
  const [newNickname, setNewNickname] = useState(nickname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    
    try {
      // API 연동 (나중에 구현)
      console.log('Update nickname to:', newNickname);
      
      // 닉네임 업데이트 성공
      onUpdateNickname(newNickname);
      alert('닉네임이 변경되었습니다.');
    } catch (error) {
      alert('닉네임 변경에 실패했습니다.');
      console.error('Update nickname error:', error);
    }
  };

  return (
    <div>
      <h2>내 정보 수정하기</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">새 닉네임</label>
          <input
            id="nickname"
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="새 닉네임을 입력하세요"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #e0e0e0',
              fontSize: '16px',
              marginTop: '5px',
              marginBottom: '15px'
            }}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none'
          }}
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default MyInfo;