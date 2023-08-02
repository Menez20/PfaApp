import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { Home } from './pages/home/Home';
import { User } from './pages/ProfilePage/Profile';
import Login from './pages/login&register/Login';
import Register from './pages/login&register/Register';
import authReducer from './state'
import { Provider } from 'react-redux';
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';
import   storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {key:'root',storage,version:1};
const persistedReducer = persistReducer(persistConfig,authReducer);
const store = configureStore({
  reducer : persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
    },
  }),         
  })

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
    <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile/:userId' element={<User />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/*' element={<div>404 - Not Found</div>} />
    </Routes>
    {/* <App /> */}
  </Router>
    </PersistGate>
    </Provider>

);
