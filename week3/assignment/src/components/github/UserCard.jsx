import Button from '../common/Button';

function UserCard({ userInfo, onClose }) {
  const { data } = userInfo;
  const { login, html_url, avatar_url, name, bio, followers, following } = data;

  return (
    <div 
      className="bg-gray-800 text-white p-6 rounded-lg shadow-md relative mb-6"
      aria-live="polite"
    >
      <Button
        onClick={onClose}
        className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600"
        aria-label="Close user card"
      >
        ✕
      </Button>
      <div className="flex flex-col items-center mb-4">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          <img
            src={avatar_url}
            alt={`${login} 프로필 이미지`}
            className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400"
          />
        </a>
        <a 
          href={html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xl font-bold hover:text-blue-400"
        >
          {name || login}
        </a>
        <p className="text-gray-400 mb-4">{login}</p>
        {bio && <p className="text-center mb-4">{bio}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-600 p-4 rounded-lg text-center">
          <p className="font-medium">Followers</p>
          <p className="text-xl">{followers}</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg text-center">
          <p className="font-medium">Following</p>
          <p className="text-xl">{following}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;