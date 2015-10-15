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


const changeMobileControls = [
  {
    type: 'password',
    id: 'password',
    name: 'password',
    label: getLang('PASSWORD'),
    required: true
  },
  {
    type: 'tel',
    id: 'mobile',
    name: 'mobile',
    label: getLang('NEW_MOBILE'),
    minLength: 11,
    maxLength: 11,
    required: true,
    tips: getLang('MOBILE_TIP')
  }
];

const submitButton = {
  text: getLang('CHANGE_MOBILE')
};

class ChangePwd extends Component {

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    return UserStore.getState();
  }

  render() {
    return (
      <div>
        <Header back title={getLang('CHANGE_MOBILE')} />
        <Form action='/change-mobile'
              controls={changeMobileControls}
              submitButton={submitButton}
              className='side-gap gap-t-lg'
              afterSubmit={this.getResult}></Form>
      </div>
    );
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


export default Container.create(ChangePwd);