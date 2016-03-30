/**
 * Home page
 */


import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';
import ajax, { ajaxDispatch } from '.././../common/utils/ajax';

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
    text: getLang('LEAVE_QUOTA'),
    name: 'my-leave/leave-quota',
    icon: 'calendar'
  },
  {
    text: getLang('MY_APPLY'),
    name: 'my-leave/leave-list',
    icon: 'plane'
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
    this.save = this.save.bind(this);
    this.submit = this.submit.bind(this);
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  render() {
    const { status, leaveForm } = this.state;

    return (
      <div className='bottom-gap'>
        <Header back title={getLang('MY_LEAVE')} />
        <Tab items={tabSettings} bottom></Tab>
        <Button icon='pencil' action onClick={this.openApply}></Button>

        <PageOpener ref='apply'>
          <Loader status={status}>
            <Form className='side-gap pad-b' action='/leave-apply' ref='applyForm'
                  controls={leaveForm} />

            <div className="row">
              <div className="col-1-2"><Button type='button' text={getLang('SAVE')} onClick={this.save} /></div>
              <div className="col-1-2"><Button type='button' text={getLang('SUBMIT')} onClick={this.submit} /></div>
            </div>
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


  save() {
    if (!this.refs.applyForm.isValid() || window.leaveValidation && !window.leaveValidation()) return;

    const formData = new FormData(React.findDOMNode(this.refs.applyForm));

    ajax.post('/ess-insert-submit-lv', formData)
      .then((res) => {
        this.applyResponse(res);
      });
  }


  submit() {
    if (!this.refs.applyForm.isValid() || window.leaveValidation && !window.leaveValidation()) return;

    const formData = new FormData(React.findDOMNode(this.refs.applyForm));

    ajax.post('/ess-submit-lv', formData)
      .then((res) => {
        this.applyResponse(res);
      });
  }


  /**
   * Apply response
   * @param res
   */
  applyResponse(res) {
    const inputs = React.findDOMNode(this.refs.applyForm).querySelectorAll('input, select, textarea');

    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].value = '';
    }

    if (res) {
      alert(res);
    }
    this.refs.apply.close();
  }
}


export default Container.create(Leave);