/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../common/lang';
import SalaryStore from '../stores/SalaryStore';


class Salary extends Component {

  static getStores() {
    return [SalaryStore];
  }

  static calculateState() {
    return SalaryStore.getState();
  }

  render() {
    return (
      <div>
        <h2>{getLang('MY_OT')}</h2>
      </div>
    );
  }
}


export default Container.create(Salary);