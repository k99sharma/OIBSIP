import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// importing components
import Home from './routes/Home';
import Login from './routes/Login';
import Logout from './routes/Logout';
import Menu from './routes/Menu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
