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
import UserPage from './pages/UserPage/UserPage';
import NotFound from './components/widget/NotFoundPage';
// index.js or App.js
import './components/widget/ClearLocalStorageOnClose.jsx';

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
        <Route path='/user/:userId' element={<UserPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  </Provider>
);
