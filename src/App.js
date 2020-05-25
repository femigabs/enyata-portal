import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import application from './pages/application/application';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Signup} />
        <Route exact path='/application' component={application} />
      </Switch>
    </div>
  );
}

export default App;
