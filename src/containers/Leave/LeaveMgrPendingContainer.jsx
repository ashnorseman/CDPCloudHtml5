/**
 * Home page
 */


import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveListContainer extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    const state = LeaveStore.getState();

    return {
      pendingRecords: state.pendingRecords,
      status: state.status
    };
  }

  constructor(props) {
    super(props);

    this.getPendingRecords();
  }

  render() {
    const { pendingRecords, status } = this.state;

    return (
      <div>
        <PullLoader status={status} className='side-gap' onLoad={this.loadMore}>
          <RecordList recordList={pendingRecords}
                      url='leave-record-mgr' />
        </PullLoader>
      </div>
    );
  }


  /**
   * Get employees' leave records (parameters)
   * @param params
   */
  getPendingRecords(params = {}) {
    params.page = 1;
    params.loadMore = false;

    LeaveDataUtils.getPendingRecords(params);
  }


  /**
   * Load next page
   */
  loadMore() {
    LeaveDataUtils.getPendingRecords({
      loadMore: true
    });
  }
}


export default Container.create(LeaveListContainer);