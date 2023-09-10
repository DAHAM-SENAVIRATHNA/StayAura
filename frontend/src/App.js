import './App.css';
import Navbar from './components/navbar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import BookingScreen from './screens/bookingScreen';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import ProfileScreen from './screens/profileScreen';
import AdminScreen from './screens/adminScreen';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen />} /> {/* Updated path */}
          <Route path='/book/:roomid/:fromdate/:todate' element={<BookingScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/admin' element={<AdminScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
