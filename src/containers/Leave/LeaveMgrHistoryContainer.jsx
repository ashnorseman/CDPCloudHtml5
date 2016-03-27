/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import LeaveList from './LeaveList.jsx';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

import UserList from '../../components/UserList/UserList.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';


class LeaveMgrQuota extends Component {

  constructor(props) {
    super(props);

    this.getTeamMembers();
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    const state = LeaveStore.getState();

    return {
      leaveEmpList: state.leaveEmpList,
      status: state.status
    };
  }

  render() {
    const { leaveEmpList, status } = this.state;

    return (
      <PullLoader className='side-gap gap-t pad-b'
                  status={status}
                  onLoad={this.loadMore}>
        <UserList userList={leaveEmpList}
                  onSelectUser={this.selectUser} />
      </PullLoader>
    );
  }


  getTeamMembers(query = {}) {
    query.page = 1;
    query.pageSize = 16;
    query.loadMore = false;

    LeaveDataUtils.getLeaveEmpList(query);
  }


  loadMore({ page = 1, ...props } = {}) {
    LeaveDataUtils.getLeaveEmpList({
      page: page + 1,
      ...props,
      loadMore: true
    });
  }


  selectUser(id) {
    location.hash = '/leave-mgr/history/' + id;
  }
}


export default Container.create(LeaveMgrQuota);