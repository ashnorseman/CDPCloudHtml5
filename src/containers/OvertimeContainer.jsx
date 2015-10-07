/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../common/lang';
import Header from '../components/Header/Header.jsx';
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
        <Header back title={getLang('MY_OT')} />
      </div>
    );
  }
}


export default Container.create(Salary);