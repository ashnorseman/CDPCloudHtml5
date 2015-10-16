/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Tab from '../../components/Tab/Tab.jsx';
import Button from '../../components/Button/Button.jsx';
import Form from '../../components/Form/Form.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import PageOpener from '../../components/PageOpener/PageOpener.jsx';

import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


const tabSettings = [
  {
    text: getLang('MY_APPLY'),
    name: 'my-leave/leave-list',
    icon: 'plane',
    active: true
  },
  {
    text: getLang('LEAVE_QUOTA'),
    name: 'my-leave/leave-quota',
    icon: 'flask'
  },
  {
    text: getLang('LEAVE_SUMMARY'),
    name: 'my-leave/leave-summary',
    icon: 'pie-chart'
  }
];


class Leave extends Component {

  constructor(props) {
    super(props);
    this.openApply = this.openApply.bind(this);
    this.applyResponse = this.applyResponse.bind(this);
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  render() {
    const submitButton = {
            text: getLang('APPLY_LEAVE')
          },
          { status, leaveForm, leaveValidation } = this.state;

    return (
      <div className='bottom-gap'>
        <Header back title={getLang('MY_LEAVE')} />
        <Tab items={tabSettings} bottom></Tab>
        <Button icon='pencil' action onClick={this.openApply}></Button>

        <PageOpener ref='apply'>
          <Loader status={status}>
            <Form className='side-gap pad-b' action='/leave-apply' ref='applyForm'
                  controls={leaveForm} submitButton={submitButton}
                  beforeSubmit={leaveValidation} afterSubmit={this.applyResponse} />
          </Loader>
        </PageOpener>

        {this.props.children}
      </div>
    );
  }


  /**
   * Open apply form
   * @param e
   */
  openApply(e) {
    this.refs.apply.open(e);

    if (!LeaveStore.getState().leaveForm || !LeaveStore.getState().leaveForm.length) {
      LeaveDataUtils.getLeaveForm();
    }
  }


  /**
   * Apply response
   * @param res
   */
  applyResponse(res) {

    if (res.success) {
      this.refs.apply.close();
      alert(getLang('APPLY_SUCCESS'));
    } else {
      alert(res.data);
    }
  }
}


export default Container.create(Leave);