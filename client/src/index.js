import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Home } from './pages/home/Home';
import { User } from './pages/ProfilePage/Profile';
import Login from './pages/login&register/Login';
import Register from './pages/login&register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile/:userId' element={<User />} />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/*' element={<div>404 - Not Found</div>} />
    </Routes>
    <App />
  </Router>
);
