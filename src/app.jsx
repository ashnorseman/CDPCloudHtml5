/**
 * App entrance
 */


'use strict';

import '../node_modules/font-awesome/css/font-awesome.css';
import './common/styles/app.less';

import React, { Component } from 'react';
import ReactTap from 'react-tap-event-plugin';
import { Router, Route, IndexRoute } from 'react-router';

import ajax from './common/utils/ajax';

import HomeContainer from './containers/HomeContainer.jsx';
import ProfileContainer from './containers/ProfileContainer.jsx';
import SalaryContainer from './containers/SalaryContainer.jsx';


// Settings
// ---------------------------

React.initializeTouchEvents(true);
ReactTap();

if (process.env.NODE_ENV !== 'production') {
  ajax.setDomain('//localhost:9090');
}


// Routes
// ---------------------------

React.render((
  <Router>
    <Route path='/' name='home' component={HomeContainer}>
      <IndexRoute component={ProfileContainer} />
      <Route path='salary' name='salary' component={SalaryContainer} />
      <Route path='*' name='profile' component={ProfileContainer} />
    </Route>
  </Router>
), document.getElementById('app'));