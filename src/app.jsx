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

import HomeContainer from './containers/HomeMenu/HomeContainer.jsx';
import EmployeeContainer from './containers/HomeMenu/EmployeeContainer.jsx';
import ManagerContainer from './containers/HomeMenu/ManagerContainer.jsx';
import ProfileContainer from './containers/ProfileContainer.jsx';
import SalaryContainer from './containers/SalaryContainer.jsx';
import ChangePwd from './containers/Config/ChangePwd.jsx';
import ChangeMobile from './containers/Config/ChangeMobile.jsx';
import LeaveContainer from './containers/Leave/LeaveContainer.jsx';
import LeaveListContainer from './containers/Leave/LeaveListContainer.jsx';
import LeaveRecordContainer from './containers/Leave/LeaveRecordContainer.jsx';
import LeaveQuotaContainer from './containers/Leave/LeaveQuotaContainer.jsx';
import LeaveSummaryContainer from './containers/Leave/LeaveSummaryContainer.jsx';
import OvertimeContainer from './containers/OvertimeContainer.jsx';
import TeamProfileContainer from './containers/TeamProfileContainer.jsx';
import LeaveMgrContainer from './containers/Leave/LeaveMgrContainer.jsx';
import OvertimeMgrContainer from './containers/OvertimeMgrContainer.jsx';


// Settings
// ---------------------------

React.initializeTouchEvents(true);
ReactTap();

if (process.env.NODE_ENV !== 'production') {
  //ajax.setDomain('https://116.246.38.199:8083');
  ajax.setDomain('http://192.168.23.210:9090');
}


// Routes
// ---------------------------

React.render((
  <Router>
    <Route path='/' name='home' component={HomeContainer}>
      <IndexRoute component={EmployeeContainer} />

      <Route path='change-password' name='change-pwd' component={ChangePwd} />
      <Route path='change-mobile' name='change-mobile' component={ChangeMobile} />

      <Route path='profile(/:id)' name='profile' component={ProfileContainer} />
      <Route path='my-salary' name='my-salary' component={SalaryContainer} />
      <Route path='my-leave' name='my-leave' component={LeaveContainer}>
        <IndexRoute component={LeaveListContainer} />
        <Route path='leave-list' name='leave-list' component={LeaveListContainer}></Route>
        <Route path='leave-quota' name='leave-quota' component={LeaveQuotaContainer}></Route>
        <Route path='leave-summary' name='leave-summary' component={LeaveSummaryContainer}></Route>
      </Route>
      <Route path='leave-record/:id' name='leave-record' component={LeaveRecordContainer} />
      <Route path='leave-record-mgr/:id' name='leave-record-mgr' component={LeaveRecordContainer} />
      <Route path='my-ot' name='my-ot' component={OvertimeContainer} />

      <Route path='team-profile' name='profile' component={TeamProfileContainer} />
      <Route path='leave-mgr' name='leave-mgr' component={LeaveMgrContainer} />
      <Route path='ot-mgr' name='ot-mgr' component={OvertimeMgrContainer} />

      <Route path='manager' name='manager' component={ManagerContainer} routerProps={{header:true}} />
      <Route path='*' name='employee' component={EmployeeContainer} routerProps={{header:true}} />
    </Route>
  </Router>
), document.getElementById('app'));