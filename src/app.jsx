/**
 * App entrance
 */


import '../node_modules/font-awesome/css/font-awesome.css';
import './common/styles/app.less';

import React, { Component } from 'react';
import ReactTap from 'react-tap-event-plugin';
import { Router, Route, IndexRoute } from 'react-router';

import ajax from './common/utils/ajax';
import { dispatch } from './dispatcher/Dispatcher';

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
import TeamProfileEmpProfileContainer from './containers/TeamProfileEmpProfileContainer.jsx';
import LeaveMgrContainer from './containers/Leave/LeaveMgrContainer.jsx';
import LeaveMgrHistoryContainer from './containers/Leave/LeaveMgrHistoryContainer.jsx';
import LeaveMgrEmpHistoryContainer from './containers/Leave/LeaveMgrEmpHistoryContainer.jsx';
import LeaveMgrQuotaContainer from './containers/Leave/LeaveMgrQuotaContainer.jsx';
import LeaveMgrEmpQuotaContainer from './containers/Leave/LeaveMgrEmpQuotaContainer.jsx';
import OvertimeMgrContainer from './containers/OvertimeMgrContainer.jsx';


// Settings
// ---------------------------

React.initializeTouchEvents(true);
ReactTap();

ajax.onError((status, err) => {
  if (status === 999) {
    dispatch({
      type: 'logout'
    });
  } else {
    alert(err);
  }
});


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
        <IndexRoute component={LeaveQuotaContainer} />
        <Route path='leave-list(/:id)' name='leave-list' component={LeaveListContainer}></Route>
        <Route path='leave-quota' name='leave-quota' component={LeaveQuotaContainer}></Route>
        <Route path='leave-summary' name='leave-summary' component={LeaveSummaryContainer}></Route>
      </Route>
      <Route path='leave-record/:id' name='leave-record' component={LeaveRecordContainer} />
      <Route path='leave-record-mgr/:id' name='leave-record-mgr' component={LeaveRecordContainer} />
      <Route path='my-ot' name='my-ot' component={OvertimeContainer} />

      <Route path='team-profile' name='profile' component={TeamProfileContainer} />
      <Route path='team-profile/profile(/:id)' name='profile' component={TeamProfileEmpProfileContainer}></Route>

      <Route path='leave-mgr' name='leave-mgr' component={LeaveMgrContainer}>
        <IndexRoute component={LeaveMgrQuotaContainer} />
        <Route path='quota' name='quota' component={LeaveMgrQuotaContainer}></Route>
        <Route path='pending' name='pending' component={LeaveListContainer}></Route>
        <Route path='history' name='history' component={LeaveMgrHistoryContainer}></Route>
        <Route path='summary' name='summary' component={LeaveListContainer}></Route>
      </Route>
      <Route path='leave-mgr/quota/:id' name='emp-quota' component={LeaveMgrEmpQuotaContainer}></Route>
      <Route path='leave-mgr/history/:id' name='emp-history' component={LeaveMgrEmpHistoryContainer}></Route>

      <Route path='ot-mgr' name='ot-mgr' component={OvertimeMgrContainer} />

      <Route path='manager' name='manager' component={ManagerContainer} routerProps={{header:true}} />
      <Route path='*' name='employee' component={EmployeeContainer} routerProps={{header:true}} />
    </Route>
  </Router>
), document.getElementById('app'));