/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Filter from '../../components/Filter/Filter.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import LeaveStore from '../../stores/LeaveStore';


const filter = [
  {
    text: getLang('TIME'),
    name: 'time',
    choices: [
      {
        text: getLang('THIS_WEEK'),
        name: 'thisMonth'
      },
      {
        text: getLang('THIS_MONTH'),
        name: 'all'
      },
      {
        text: getLang('THIS_YEAR'),
        name: 'all'
      },
      {
        text: getLang('ALL'),
        name: 'all'
      }
    ]
  },
  {
    text: getLang('TYPE'),
    name: 'type'
  },
  {
    text: getLang('STATUS'),
    name: 'status',
    choices: [
      {
        text: getLang('APPROVED'),
        name: 'approved'
      },
      {
        text: getLang('PENDING'),
        name: 'pending'
      },
      {
        text: getLang('REJECTED'),
        name: 'pending'
      }
    ]
  }
];

class LeaveList extends Component {

  constructor(props) {
    super(props);

    dispatch({
      type: 'get-leave-types'
    });

    this.filter = this.filter.bind(this);

    this.getEmpLeaveRecords();
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  render() {
    const { leaveTypes, leaveRecords, status } = this.state;

    filter[1].choices = leaveTypes;

    return (
      <div>
        <Filter items={filter} onFilter={this.filter}></Filter>

        <PullLoader status={status} className='side-gap'>
          <RecordList recordList={leaveRecords} url='leave-record'></RecordList>
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

    dispatch({
      type: 'get-emp-leave-records',
      data: params
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


export default Container.create(LeaveList);