// 4. 조회가 잘 된다면? 버튼을 클릭하면 조회가 되게 해보자!

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const getUsers = async () => {
  const response = await axios.get('https://api.atsopt-seminar4.site/api/v1/users');

  return response.data.data;
};

function App() {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: shouldFetch,
  });

  const isLoading = shouldFetch && isPending;

  return (
    <div>
      <h1>유저 목록</h1>
      <button onClick={() => setShouldFetch(true)}>
        데이터 가져오기
      </button>

      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        shouldFetch && data?.nicknameList && (
          <div>
            {data.nicknameList.map((nickname: string, index: number) => (
              <div key={index}>
                <h2>{nickname}</h2>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default App;