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
import FormControl from '../../components/FormControl/FormControl.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';
import Button from '../../components/Button/Button.jsx';

import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveRecord extends Component {

  constructor(props) {
    super(props);
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);

    this.getLeaveRecord();
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    const state = LeaveStore.getState();

    return {
      status: state.status,
      leaveRecord: state.leaveRecord,
      mgrAjax: state.mgrAjax
    };
  }

  render() {
    const { status, leaveRecord } = this.state,
          mgr = (this.props.route.name === 'leave-record-mgr');

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
        {
          mgr ?
            <div>
              <div className='row'>
                <div className='col-1-1'>
                  <FormControl label='审批意见'>
                    <TextInput ref='opinion' />
                  </FormControl>
                </div>
              </div>
              <div className='row'>
                <div className='col-1-2'>
                  <Button text={getLang('APPROVE')} onTouchTap={this.approve}></Button>
                </div>
                <div className='col-1-2'>
                  <Button hollow className='text-primary' text={getLang('REJECT')} onTouchTap={this.reject}></Button>
                </div>
              </div>
            </div> : null
        }
      </div>
    );
  }


  /**
   * Get a single leave record
   */
  getLeaveRecord() {
    LeaveDataUtils.getLeaveRecord(this.props.params && this.props.params.id);
  }


  /**
   * Approve a record
   */
  approve() {
    LeaveDataUtils.approveRecord({
      id: this.props.params.id,
      opinion: React.findDOMNode(this.refs.opinion).value
    });
  }


  /**
   * Reject a record
   */
  reject() {
    LeaveDataUtils.rejectRecord({
      id: this.props.params.id,
      opinion: React.findDOMNode(this.refs.opinion).value
    });
  }
}


export default Container.create(LeaveRecord);