import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import BookingScreen from './screens/bookingScreen';
import RegisterScreen from './screens/registerScreen'
import LoginScreen from './screens/loginScreen';
import ProfileScreen from './screens/profileScreen';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<HomeScreen/>} />
          {/* Use "path" instead of "Path" */}
          <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/profile' element={<ProfileScreen/>} />

          

          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
