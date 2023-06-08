import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Signup from './component/signup';
import Login from './component/login';
import Home from './component/home';
import Navbar from './component/navbar';
import Detail from './component/detail';
// import Booking from './component/booking';

function App() {
  return (
    <div>
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        {/* <Route path='/booking' element = {<Booking/>}/> */}
        <Route path='/booking' element = {<Detail/>}/>
      </Routes>
    </Router>      
    </div>
  );
}

export default App;
