import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import DashBoard from './pages/dashBoard/DashBoard';
import Application from './pages/application/Application';
import Assessment from './pages/assessment/Assessment';
import CompletedAssessment from './pages/completedAssessment/CompletedAssessment';
import TakeAssessment from './pages/takeAssessment/TakeAssessment';
import Admin from './pages/admin/Admin';
import AdminBoard from './pages/adminBoard/AdminBoard';
import AdminEntries from './pages/adminEntries/AdminEntries'
import CreateApplication from './pages/createApplication/CreateApplication';
import ComposeAssessment from './pages/composeAssessment/ComposeAssessment';
import AssessmentResult from './pages/assessmentResult/AssessmentResult';
import AssessmentHistory from './pages/assessmentHistory/AssessmentHistory';
import Error_page from './pages/error/Error';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/signup' component={Signup} />  
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={DashBoard} />
        <Route exact path='/application/:id' component={Application} />
        <Route exact path='/assessment' component={Assessment} />
        <Route exact path='/completed' component={CompletedAssessment} />
        <Route exact path='/quiz' component={TakeAssessment} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/adminboard' component={AdminBoard} />
        <Route exact path='/adminentries' component={AdminEntries} />
        <Route exact path='/createapplication' component={CreateApplication} />
        <Route exact path='/composeassessment' component={ComposeAssessment} />
        <Route exact path='/results' component={AssessmentResult} />
        <Route exact path='/assessmenthistory' component={AssessmentHistory} />
        <Route component={Error_page}/>
      </Switch>
    </div>
  );
}

export default App;
