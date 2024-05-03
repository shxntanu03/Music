import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,  Route } from 'react-router-dom';
import ReadSong from './components/ReadSong.jsx';
import AddSong from './components/AddSong.jsx';
import UpdateSong from './components/UpdateSong.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ReadSong/>}></Route>
          <Route path='/add' element={<AddSong/>}></Route>
          <Route path='/update/:id' element={<UpdateSong/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
