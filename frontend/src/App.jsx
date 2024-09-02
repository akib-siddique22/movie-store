import React from 'react'
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import CreateMovie from './pages/CreateMovies';
import ShowMovie from './pages/ShowMovie';
import EditMovie from './pages/EditMovie';
import DeleteMovie from './pages/DeleteMovie';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movies/create' element={<CreateMovie />} />
      <Route path='/movies/details/:id' element={<ShowMovie />} />
      <Route path='/movies/edit/:id' element={<EditMovie />} />
      <Route path='/movies/delete/:id' element={<DeleteMovie />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  );
};

export default App;