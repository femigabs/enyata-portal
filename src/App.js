import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import DashBoard from './pages/dashBoard/DashBoard';
import application from './pages/application/application';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={DashBoard} />
        <Route exact path='/' component={Signup} />
        <Route exact path='/application' component={application} />
      </Switch>
    </div>
  );
}

export default App;
