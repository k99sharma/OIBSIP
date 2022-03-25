import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// importing components
import Navbar from './components/Navbar/Navbar';

// importing routes
import Home from './Routes/Home/Home';
import Signup from './Routes/Signup/Signup';
import Login from './Routes/Login/Login';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
        </Routes>
      </Router>
    </>  
  );
}

export default App;
