import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// importing components
import Navbar from './components/Navbar';

import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Menu from './routes/Menu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
