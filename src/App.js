import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/signup';
import Level1 from './pages/GameLevels/Components/Level1';
import Level2 from './pages/GameLevels/Components/Level2';
import Level3 from './pages/GameLevels/Components/Level3';
import Level4 from './pages/GameLevels/Components/Level4';
import Start from './pages/StartPage/index.jsx';
import Scoreboard from './pages/Scoreboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Start/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="level1" element={<Level1/>} />
        <Route path="level2" element={<Level2/>}/>
        <Route path="level3" element={<Level3/>}/>
        <Route path="level4" element={<Level4/>}/>
        <Route path="scoreboard" element={<Scoreboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
