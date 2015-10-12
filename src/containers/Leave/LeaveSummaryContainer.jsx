/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';


class LeaveQuota extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  render() {
    return (
      <div>
        <h2>Leave Quota</h2>
      </div>
    );
  }
}


export default Container.create(LeaveQuota);