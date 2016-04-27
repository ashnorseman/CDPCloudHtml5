/**
 * Home page
 */


import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import LeaveList from './LeaveList.jsx';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

import RecordList from '../../components/RecordList/RecordList.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';


class LeaveMgrQuota extends Component {

  constructor(props) {
    super(props);

    LeaveDataUtils.getMgrLeaveHistory();
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  render() {
    const { leaveRecords, status } = this.state;

    return (
      <PullLoader className='side-gap gap-t pad-b'
                  status={status}
                  onLoad={this.loadMore}>
        <RecordList recordList={leaveRecords} />
      </PullLoader>
    );
  }


  loadMore({ page = 1, ...props } = {}) {
    LeaveDataUtils.getMgrLeaveHistory({
      page: page + 1,
      ...props,
      loadMore: true
    });
  }
}


export default Container.create(LeaveMgrQuota);
