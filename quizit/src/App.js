import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Landing from './Pages/Landing/Landing'
import Test from './Pages/Test/Test';
import StartTest from './Pages/StartTest/StartTest';
import ScoreTest from './Pages/Score/Score'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/landing' element={<Landing/>}></Route>
      <Route path='/test' element={<Test/>}></Route>
      <Route path='/test/start' element={<StartTest/>}></Route>
      <Route path='/test/score' element={<ScoreTest/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;