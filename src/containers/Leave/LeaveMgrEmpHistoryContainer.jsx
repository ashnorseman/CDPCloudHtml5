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
      // leaveTypes: state.leaveTypes,
      leaveRecords: state.leaveRecords,
      status: state.status
    };
  }

  constructor(props) {
    super(props);

    this.getEmpLeaveRecords();
  }

  render() {
    const { leaveRecords } = this.state,
      mgr = location.hash.indexOf('mgr') !== -1;

    return (
      <div>
        <Header back title={getLang('LEAVE_SUMMARY')} />
        <PullLoader status={status} className='side-gap' onLoad={this.loadMore}>
          <RecordList recordList={leaveRecords}
                      url='leave-record-mgr' />
        </PullLoader>
      </div>
    );
  }


  /**
   * Get employees' leave records (parameters)
   * @param params
   */
  getEmpLeaveRecords(params = {}) {
    params.page = 1;
    params.loadMore = false;
    params.empId = this.props.routeParams.id;
    // params.state = 'edit';

    dispatch({
      type: 'get-emp-leave-records',
      data: params
    });
  }


  /**
   * Load next page
   */
  loadMore() {
    dispatch({
      type: 'get-emp-leave-records',
      data: {
        loadMore: true
      }
    });
  }


  /**
   * Update filter
   * @param type
   * @param choice
   */
  filter(type, choice) {
    this.getEmpLeaveRecords({ type, choice });
  }
}


export default Container.create(LeaveListContainer);