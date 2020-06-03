import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import DashBoard from './pages/dashBoard/DashBoard';
import Application from './pages/application/Application';
import Assessment from './pages/assessment/Assessment';
import Admin from './pages/admin/Admin';
import AdminBoard from './pages/adminBoard/AdminBoard';
import AdminEntries from './pages/adminEntries/AdminEntries';
import Create from './pages/create/Create';
import AssessmentHistory from './pages/assessmentHistory/AssessmentHistory';
import Compose from './pages/composeAssessment/ComposeAssessment';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={DashBoard} />
        <Route exact path='/application/:id' component={Application} />
        <Route exact path='/assessment' component={Assessment} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/adminboard' component={AdminBoard} />
        <Route exact path='/adminentries' component={AdminEntries} />
        <Route exact path='/create' component={Create} />
        <Route exact path='/assessmentHistory' component={AssessmentHistory} />
        <Route exact path='/compose' component={Compose} />
      </Switch>
    </div>
  );
}

export default App;
