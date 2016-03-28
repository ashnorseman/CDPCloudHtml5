/**
 * Leave List
 */


'use strict';

import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';

import { getItem as getLang } from '../../common/lang';
import Filter from '../../components/Filter/Filter.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import UserList from '../../components/UserList/UserList.jsx';

import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


// const filter = [
//   {
//     text: getLang('TIME'),
//     name: 'time',
//     choices: [
//       {
//         text: getLang('THIS_WEEK'),
//         name: 'thisMonth'
//       },
//       {
//         text: getLang('THIS_MONTH'),
//         name: 'all'
//       },
//       {
//         text: getLang('THIS_YEAR'),
//         name: 'all'
//       },
//       {
//         text: getLang('ALL'),
//         name: 'all'
//       }
//     ]
//   },
//   {
//     text: getLang('TYPE'),
//     name: 'type'
//   },
//   {
//     text: getLang('STATUS'),
//     name: 'status',
//     choices: [
//       {
//         text: getLang('APPROVED'),
//         name: 'approved'
//       },
//       {
//         text: getLang('PENDING'),
//         name: 'pending'
//       },
//       {
//         text: getLang('REJECTED'),
//         name: 'rejected'
//       }
//     ]
//   }
// ];

export default class LeaveList extends Component {

  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { defaultFilter, mgr } = this.props;

    if (mgr) {
      this._type = 'get-mgr-leave-history';
    } else {
      this._type = 'get-emp-leave-records';
    }

    this.getEmpLeaveRecords(defaultFilter);

    // Init default filter
    // if (defaultFilter) {
    //   let active = filter.filter((item) => {
    //     return item.name === defaultFilter.type;
    //   })[0];
		//
    //   if (active) {
    //     active.active = true;
		//
    //     active.choices.forEach((choice) => {
    //       choice.active = (defaultFilter.choice === choice.name);
    //     });
    //   }
    // }

    LeaveDataUtils.getLeaveTypes();
  }

  render() {
    const { leaveRecords, status, leaveTypes, mgr, selectable, toggleSelect } = this.props;

    return (
      <div>
        {/*<Filter items={filter} onFilter={this.filter}></Filter>*/}

        <PullLoader status={status} className='side-gap' onLoad={this.loadMore}>
          {
            mgr
              ? <div className="gap-t-lg">
                  <UserList userList={leaveRecords} onSelectUser={this.selectUser} />
                </div>
              : <RecordList recordList={leaveRecords}
                            url={'leave-record' + (mgr ? '-mgr' : '')}
                            selectable={selectable && this.select}
                            toggleSelect={toggleSelect} />
          }
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
    params.state = 'edit';

    dispatch({
      type: this._type,
      data: params
    });
  }


  /**
   * Load next page
   */
  loadMore() {
    dispatch({
      type: this._type,
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


  /**
   * Test if an item is selectable
   * @param {Object} item
   */
  select(item) {
    return item.status === 2;
  }


  selectUser(id) {
    location.hash = 'my-leave/leave-list/' + id;
  }
}
