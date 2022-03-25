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
import NotFound from './Routes/404/404';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route exact path='/login' element={ <Login /> } />
          <Route exact path='/signup' element={ <Signup /> } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>  
  );
}

export default App;
