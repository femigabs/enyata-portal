import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import DashBoard from './pages/dashBoard/DashBoard';
import application from './pages/application/application';
import admin from './pages/admin/admin';
import adminBoard from './pages/adminBoard/adminBoard';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={DashBoard} />
        <Route exact path='/' component={Signup} />
        <Route path='/application' component={application} />
        <Route exact path='/admin' component={admin} />
        <Route exact path='/adminBoard' component={adminBoard} />
      </Switch>
    </div>
  );
}

export default App;
