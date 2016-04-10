/**
 * Home page
 */


import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveListContainer extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);

    LeaveDataUtils.getLeaveSummary(this.props.params.id);
  }

  render() {
    const { leaveSummary = [], status } = this.state;

    return (
      <div>
        <Header goBack title={getLang('LEAVE_SUMMARY')} />
        <Loader status={status} className='side-gap gap-t-lg' onLoad={this.loadMore}>
          {
            leaveSummary.map((card, index) => {
              return <InfoCard {...card} key={index} />;
            })
          }
        </Loader>
      </div>
    );
  }
}


export default Container.create(LeaveListContainer);
