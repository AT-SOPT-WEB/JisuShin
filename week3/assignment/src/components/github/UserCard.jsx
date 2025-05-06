// src/components/GitHubSearch/UserCard.jsx
function UserCard({ userInfo, onClose }) {
  const { data } = userInfo;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md relative mb-6">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600"
      >
        ✕
      </button>
      <div className="flex flex-col items-center mb-4">
        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
          <img
            src={data.avatar_url}
            alt={`${data.login} 프로필 이미지`}
            className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400"
          />
        </a>
        <a 
          href={data.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xl font-bold hover:text-blue-400"
        >
          {data.name || data.login}
        </a>
        <p className="text-gray-400 mb-4">{data.login}</p>
        {data.bio && <p className="text-center mb-4">{data.bio}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-600 p-4 rounded-lg text-center">
          <h3 className="font-medium">Followers</h3>
          <p className="text-xl">{data.followers}</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg text-center">
          <h3 className="font-medium">Following</h3>
          <p className="text-xl">{data.following}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;