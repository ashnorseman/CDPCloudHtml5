/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../common/lang';
import Header from '../components/Header/Header.jsx';
import ProfileStore from '../stores/ProfileStore';


class Profile extends Component {

  static getStores() {
    return [ProfileStore];
  }

  static calculateState() {
    return ProfileStore.getState();
  }

  render() {
    return (
      <div>
        <Header back title={getLang('TEAM_PROFILE')} />
      </div>
    );
  }
}


export default Container.create(Profile);