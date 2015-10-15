/**
 * Created by AshZhang on 15/10/15.
 */


'use strict';

import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import LeaveStore from '../../stores/LeaveStore';


class LeaveRecord extends Component {

  constructor(props) {
    super(props);
    this.getLeaveRecord();
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    const state = LeaveStore.getState();

    return {
      status: state.status,
      leaveRecord: state.leaveRecord
    };
  }

  render() {
    const { status, leaveRecord } = this.state;

    return (
      <div>
        <Header back title={getLang('MY_APPLY')}></Header>
        <Loader status={status} className='side-gap gap-t-lg pad-b'>
          <UserInfo userInfo={leaveRecord.userInfo} className='gap-b-lg'></UserInfo>
          {
            leaveRecord.data && leaveRecord.data.map((item, index) => {
              return <InfoCard title={item.title} items={item.items} key={index}></InfoCard>;
            })
          }
        </Loader>
      </div>
    );
  }


  /**
   * Get a single leave record
   */
  getLeaveRecord() {
    dispatch({
      type: 'get-leave-record',
      data: this.props.params && this.props.params.id
    });
  }
}


export default Container.create(LeaveRecord);