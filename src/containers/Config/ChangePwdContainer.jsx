/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Form from '../../components/Form/Form.jsx';
import UserStore from '../../stores/UserStore';


const changePwdControls = [
  {
    type: 'password',
    id: 'oldPassword',
    name: 'oldPassword',
    label: getLang('OLD_PASSWORD'),
    required: true
  },
  {
    type: 'password',
    id: 'new-password',
    name: 'new-password',
    label: getLang('NEW_PWD'),
    tips: getLang('AT_LEAST_6'),
    required: true,
    minLength: 6
  },
  {
    type: 'password',
    id: 'repeat-password',
    name: 'repeat-password',
    label: getLang('REPEAT_PWD'),
    tips: getLang('SAME_PWD'),
    required: true,
    minLength: 6
  }
];

const submitButton = {
  text: getLang('CHANGE_PWD')
};

class ChangeMobile extends Component {

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    return UserStore.getState();
  }

  render() {
    return (
      <div>
        <Header back title={getLang('CHANGE_PWD')} />
        <Form action='/change-password'
              controls={changePwdControls}
              submitButton={submitButton}
              className='side-gap gap-t-lg'
              beforeSubmit={this.checkPwd}
              afterSubmit={this.getResult}></Form>
      </div>
    );
  }


  /**
   * Check password and repeat password are the same
   */
  checkPwd() {
    if (document.getElementById('new-password').value !== document.getElementById('repeat-password').value) {
      alert(getLang('SAME_PWD'));
      return false;
    }
  }


  /**
   * Get change mobile result
   * @param {Object} res
   */
  getResult(res) {

    if (res.success) {
      alert(getLang('EDIT_SUCCESS'));
      history.back();
    } else {
      alert(getLang('EDIT_FAIL'));
    }
  }
}


export default Container.create(ChangeMobile);