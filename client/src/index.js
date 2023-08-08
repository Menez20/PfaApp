import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Home } from './pages/home/Home';
import { User } from './pages/ProfilePage/Profile';
import Login from './pages/login&register/Login';
import Register from './pages/login&register/Register';
import { configureStore } from '@reduxjs/toolkit';

// import authReducer from './state/features/authSlice';
const store = configureStore({
  reducer: {},
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:userId' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  </Provider>
);
