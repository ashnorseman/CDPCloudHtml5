/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';

import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveQuota extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  componentDidMount() {
    LeaveDataUtils.getQuota();
  }

  render() {
    const { quota = [], status } = this.state;

    return (
      <div className="side-gap gap-t gap-b">
        <Loader status={status}>
          {
            quota.map((card, index) => {
              return <InfoCard items={card} key={index} />;
            })
          }
        </Loader>
      </div>
    );
  }
}


export default Container.create(LeaveQuota);