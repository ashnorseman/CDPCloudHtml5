/**
 * Created by AshZhang on 15/10/14.
 */


import React, { Component } from 'react';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Form from '../../components/Form/Form.jsx';


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

export default class ChangeMobile extends Component {

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
   */
  getResult() {
    alert(getLang('EDIT_SUCCESS'));
    history.back();
  }
}