import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

// importing components
import Navbar from './components/Navbar/Navbar';

// importing routes
import Home from './Routes/Home/Home';
import Menu from './Routes/Menu/Menu';
import Signup from './Routes/Signup/Signup';
import Login from './Routes/Login/Login';
import NotFound from './Routes/404/404';


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          {
            authCtx.isLoggedIn && <Route exact path='/menu' element={<Menu />} />
          }
          {
            !authCtx.isLoggedIn && <Route exact path='/login' element={ <Login /> } />
          }
          {
            !authCtx.isLoggedIn && <Route exact path='/signup' element={ <Signup /> } />
          }
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>  
  );
}

export default App;
