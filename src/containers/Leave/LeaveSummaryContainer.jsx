/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

import Loader from '../../components/Loader/Loader.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';


class LeaveQuota extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  componentDidMount() {
    LeaveDataUtils.getLeaveSummary();
  }

  render() {
    const { leaveSummary, status } = this.state;

    return (
      <Loader status={status} className='side-gap gap-t-lg pad-b'>
        {
          Array.isArray(leaveSummary) && leaveSummary.map((item, index) => {
            return <InfoCard title={item.title} items={item.items} key={index}></InfoCard>;
          })
        }
      </Loader>
    );
  }
}


export default Container.create(LeaveQuota);