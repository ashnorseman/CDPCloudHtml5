/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import LeaveList from './LeaveList.jsx';
import LeaveStore from '../../stores/LeaveStore';


class LeaveListContainer extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    const state = LeaveStore.getState();

    return {
      leaveTypes: state.leaveTypes,
      leaveRecords: state.leaveRecords,
      status: state.status
    };
  }

  render() {
    return (
      <LeaveList {...this.state}></LeaveList>
    );
  }
}


export default Container.create(LeaveListContainer);