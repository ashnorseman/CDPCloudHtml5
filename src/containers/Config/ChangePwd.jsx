/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

import React, { Component } from 'react';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Form from '../../components/Form/Form.jsx';


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

export default class ChangePwd extends Component {

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
   */
  getResult() {
    alert(getLang('EDIT_SUCCESS'));
    history.back();
  }
}