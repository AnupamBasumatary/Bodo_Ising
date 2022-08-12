import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Menu from './components/Pages/menu/Menu';
import Navbar from './components/layout/navbar/Navbar';
import Admin from './components/Pages/admin/Admin';
import About from './About';

import Alerts from './components/layout/alerts/Alerts';

import UserRegister from './components/auth/UserRegister';
import UserLogin from './components/auth/UserLogin';
import AdminIn from './components/auth/AdminIn';

import UserDetails from './components/Pages/users/UserDetails';
import LoadUser from './components/Pages/users/LoadUser';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <AuthState>
        <AlertState>
          <Router>
            <Navbar />
            <Alerts />
            <Routes>
              <Route path='/UserRegister' element={<UserRegister />} />
              <Route path='/UserLogin' element={<UserLogin />} />
              <Route path='/UserDetails' element={<UserDetails />} />
              <Route path='/LoadUser' element={<LoadUser />} />
              <Route path='/' element={<Home />} />
              <Route path='/About' element={<About />} />
              <Route path='/Menu' element={<Menu />} />
              <Route path='/Login' element={<Admin />} />
              <Route path='/AdminIn' element={<AdminIn />} />
            </Routes>
          </Router>
        </AlertState>
      </AuthState>
    </div>
  );
};

export default App;
