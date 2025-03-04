import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';

function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/new');
  };
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/new">New</Link>
        <Link to="/diary">Diary</Link>
      </div>
      <button onClick={onClickButton}>new 페이지로 이동</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
