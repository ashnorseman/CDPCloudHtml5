/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Header from '../../components/Header/Header.jsx';
import Tab from '../../components/Tab/Tab.jsx';

import { getItem as getLang } from '../../common/lang';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


const tabSettings = [
  {
    text: getLang('PENDING'),
    name: 'ot-mgr/pending',
    icon: 'clock-o'
  },
  {
    text: getLang('HISTORY'),
    name: 'ot-mgr/history',
    icon: 'book'
  },
  {
    text: getLang('OT_SUMMARY'),
    name: 'ot-mgr/summary',
    icon: 'pie-chart'
  }
];

class OvertimeMgr extends Component {

  static getStores() {
    return [OvertimeStore];
  }

  static calculateState() {
    return OvertimeStore.getState();
  }

  render() {
    return (
      <div>
        <Header back title={getLang('OT_MGR')} />

        {this.props.children}

        <Tab items={tabSettings} bottom />
      </div>
    );
  }
}


export default Container.create(OvertimeMgr);
