import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
