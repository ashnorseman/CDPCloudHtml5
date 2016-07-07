/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

import Header from '../../components/Header/Header.jsx';
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
      <div>
        <Header back="manager" title={getLang('HISTORY')} />

        <PullLoader className='pad-b'
                    status={status}
                    onLoad={this.loadMore}>
          <RecordList recordList={leaveRecords} href={null} />
        </PullLoader>
      </div>
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
