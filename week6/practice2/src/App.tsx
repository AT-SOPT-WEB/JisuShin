import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const userId = 100;

const getMyNickname = async (userId: number) => {
  const response = await axios.get('https://api.atsopt-seminar4.site/api/v1/users/me', {
    headers: {
      userId: userId
    }
  });
  return response.data.data;
};

const updateNickname = async (newNickname: string) => {
  const response = await axios.patch('https://api.atsopt-seminar4.site/api/v1/users',
    { nickname: newNickname },
    {
      headers: {
        userId: userId
      }
    }
  );
  return response.data.data;
};

function App() {
  const [newNickname, setNewNickname] = useState('');
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ['myNickname', userId],
    queryFn: () => getMyNickname(userId)
  });

  const { mutate } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      // 쿼리 데이터 무효화를 통한 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['myNickname', userId] });
      setNewNickname('');
    }
  });

  if (isPending) return <div>로딩 중...</div>;

  return (
    <div>
      내 정보:
      {data && <span> {data.nickname}</span>}
      <div>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="새 닉네임"
        />
        <button
          onClick={() => mutate(newNickname)}
        >
          닉네임 수정
        </button>
      </div>
    </div>
  );
}

export default App;