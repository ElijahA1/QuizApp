import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Landing from './Pages/Landing/Landing'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/landing' element={<Landing/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;