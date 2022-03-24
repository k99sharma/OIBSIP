// importing built-in components
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useToken } from './custom/useToken';


// importing components
import Navbar from './components/Navbar';

import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Menu from './routes/Menu';


function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setToken={setToken} token={token} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login token={token} setToken={setToken} />} />
          <Route path='/signup' element={<Signup token={token} setToken={setToken} />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
