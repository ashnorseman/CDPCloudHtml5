/**
 * Home page
 */


'use strict';

import './leave-mgr.less';

import React, { Component } from 'react';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Tab from '../../components/Tab/Tab.jsx';


const tabSettings = [
  {
    text: getLang('LEAVE_QUOTA'),
    name: 'leave-mgr/quota',
    icon: 'calendar',
    active: true
  },
  {
    text: getLang('PENDING'),
    name: 'leave-mgr/pending',
    icon: 'plane'
  },
  {
    text: getLang('HISTORY'),
    name: 'leave-mgr/history',
    icon: 'book'
  },
  {
    text: getLang('LEAVE_SUMMARY'),
    name: 'leave-mgr/summary',
    icon: 'pie-chart'
  }
];


class LeaveMgr extends Component {

  render() {
    return (
      <div className='bottom-gap'>
        <Header back title={getLang('LEAVE_MGR')} />

        <Tab items={tabSettings} bottom></Tab>

        {this.props.children}
      </div>
    );
  }
}


export default LeaveMgr;