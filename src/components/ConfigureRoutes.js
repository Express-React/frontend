import React from 'react';
import Login from './Login'
import Dashboard from './Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default function ConfigureRoutes() {
 
  return (
    <Router>
      <Route path='/' exact component={Login}></Route>
      <Route path='/dash' exact component={Dashboard}></Route>
      <Route path='/login' exact component={Login}></Route>
    </Router>   
  );
}