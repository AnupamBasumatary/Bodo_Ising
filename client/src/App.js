import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Menu from './components/Pages/menu/Menu';
import Navbar from './components/layout/navbar/Navbar';

import About from './About';

import Alerts from './components/layout/alerts/Alerts';

import UserRegister from './components/auth/UserRegister';
import UserLogin from './components/auth/UserLogin';
import AdminIn from './components/auth/AdminIn';

import UserDetails from './components/Pages/users/UserDetails';
import LoadUser from './components/Pages/users/LoadUser';

import AlertState from './context/alert/AlertState';

import './App.css';

//Testing
import AdminLogin from './components/Pages/AdminAuth/AdminLogin';
import AdminRegister from './components/Pages/AdminAuth/AdminRegister';
import AdminDashboard from './components/Pages/AdminAuth/AdminDashboard';
import Error from './components/Pages/AdminAuth/Error';
import AdminFoodUpdate from './components/Pages/admin/AdminFoodUpdate';
import AdminPrivateRoute from './components/routing/AdminPrivateRoute';

import Context from './components/ContextProvider/Context';
import UserContext from './components/ContextProvider/UserContext';

//User Testing
import UserOrder from './components/Pages/users/UserOrder';
import UserIn from './components/Pages/users/UserIn';
import UserDashBoard from './components/auth/UserDashBoard';

const App = () => {
  return (
    <div className='App'>
      <AlertState>
        <UserContext>
          <Context>
            <Router>
              <Navbar />
              <Alerts />
              <Routes>
                <Route path='*' element={<Error />} />
                <Route path='/Register' element={<UserRegister />} />
                <Route path='/Login' element={<UserIn />} />
                <Route path='/UserLogin' element={<UserLogin />} />
                {/* User Private Route for User Order && User Details */}
                <Route path='/UserOrder' element={<UserOrder />} />
                <Route path='/UserDetails' element={<UserDetails />} />
                <Route path='/UserDashBoard' element={<UserDashBoard />} />
                <Route path='/LoadUser' element={<LoadUser />} />
                <Route path='/' element={<Home />} />
                <Route path='/About' element={<About />} />
                <Route path='/Menu' element={<Menu />} />
                <Route path='/AdminIn' element={<AdminIn />} />
                <Route path='/AdminLogin' element={<AdminLogin />} />
                <Route path='/AdminRegister' element={<AdminRegister />} />
                {/*Admin Private route for admin Dashboard && Admin Food Update */}
                <Route path='/AdminDashboard' element={<AdminDashboard />} />
                <Route
                  path='/FoodUpdate'
                  element={<AdminPrivateRoute component={AdminFoodUpdate} />}
                />
                {/* <Route path='/adminRegister' element={<AdminRegister />} /> */}
              </Routes>
            </Router>
          </Context>
        </UserContext>
      </AlertState>
    </div>
  );
};

export default App;
