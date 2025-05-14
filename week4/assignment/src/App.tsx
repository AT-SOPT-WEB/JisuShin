import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { themeClass } from './styles/theme.css';
import './styles/reset.css';
import './styles/global.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div className={themeClass}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;