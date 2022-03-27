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
import Cart from './Routes/Cart/Cart';
import NotFound from './Routes/404/404';
import { Dashboard } from './Routes/Dashboard/Dashboard';


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className='h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          {
            authCtx.user.role === 'CUST'
            &&
            authCtx.isLoggedIn 
            && 
            <Route exact path='/menu' element={<Menu />} />
          }
          {
            authCtx.user.role === 'CUST'
            &&
            authCtx.isLoggedIn 
            && 
            <Route exact path='/cart' element={<Cart />} />
          }
          {
            !authCtx.isLoggedIn && <Route exact path='/login' element={<Login />} />
          }
          {
            !authCtx.isLoggedIn && <Route exact path='/signup' element={<Signup />} />
          }
          {
            authCtx.user.role === 'ADMIN'
            &&
            authCtx.isLoggedIn
            &&
            <Route exact path='/dashboard' element={ <Dashboard /> } />
          }
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
