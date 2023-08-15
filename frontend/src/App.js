import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import HomeScreen from './screens/homeScreen';
import Room from './components/Room';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<HomeScreen/>} />
          <Route path='/home1' element={<Room/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
