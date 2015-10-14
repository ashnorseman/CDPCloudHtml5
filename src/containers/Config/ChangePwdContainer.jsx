/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import UserStore from '../../stores/UserStore';


class ChangeMobile extends Component {

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    return UserStore.getState();
  }

  render() {
    return (
      <div>
        <Header back title={getLang('CHANGE_PWD')} />
      </div>
    );
  }
}


export default Container.create(ChangeMobile);