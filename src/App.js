// importing built-in components
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

// function to set token
const setToken = (userToken) => {
  localStorage.setItem('token', JSON.stringify(userToken));
}

// function to get token
const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  console.log(userToken);
  return userToken;
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={getToken()} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setToken={ setToken } />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
