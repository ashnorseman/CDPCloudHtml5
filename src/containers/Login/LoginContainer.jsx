/**
 * Login page
 */


import './login.less';

import assign from 'object-assign';
import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { dispatch } from '../../dispatcher/Dispatcher';
import { getItem as getLang } from '../../common/lang';

import Button from '../../components/Button/Button.jsx';
import Form from '../../components/Form/Form.jsx';
import FormControl from '../../components/FormControl/FormControl.jsx';
import PageOpener from '../../components/PageOpener/PageOpener.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';

import ForgotStep1 from './ForgotStep1.jsx';

import LoginStore from '../../stores/LoginStore';
import UserStore from '../../stores/UserStore';


const loginForm = [
    {
      type: 'text',
      id: 'company',
      name: 'company',
      icon: 'home',
      placeholder: getLang('COMPANY'),
      required: true
    },
    {
      type: 'text',
      id: 'username',
      name: 'username',
      icon: 'user',
      placeholder: getLang('USERNAME'),
      required: true
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      icon: 'lock',
      placeholder: getLang('PASSWORD'),
      required: true
    },
    {
      type: 'checkbox',
      id: 'remember',
      name: 'remember',
      placeholder: getLang('REMEMBER')
    }
  ],
  loginSubmit = {
    text: getLang('LOGIN')
  },
  resetForm = [
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
  ],
  resetSubmit = {
    text: getLang('RESET_PWD')
  };


class Login extends Component {

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.openForgotPage = this.openForgotPage.bind(this);
  }

  static getStores() {
    return [LoginStore, UserStore];
  }

  static calculateState() {
    return assign(
      {},
      LoginStore.getState(),
      UserStore.getState()
    );
  }

  componentDidUpdate() {
    if (this.state.loginStatus && this.state.loginStatus.indexOf('failed') > -1) {
      this.refs.loginForm.setState({
        submitting: false
      });
    }
  }

  render() {
    const {
            captchaPass,
            captchaTimer,
            reset,
            resetPass,
            savedLogin
          } = this.state;

    loginForm[0].defaultValue = savedLogin.company || '';
    loginForm[1].defaultValue = savedLogin.username || '';
    loginForm[3].defaultChecked = !!savedLogin.remember;

    return (
      <div className='login'>
        <div className='login-logo'></div>

        <Form className='login-form'
              ref='loginForm'
              controls={loginForm}
              submitButton={loginSubmit}
              onSubmit={this.login} />

        <Button className='login-forgot'
                text={getLang('FORGOT_PWD')}
                onClick={this.openForgotPage} />

        <div className='login-copyright'>{getLang('COPYRIGHT')}</div>

        <PageOpener ref='forgotPage' className={captchaPass && ''}>
          <ForgotStep1 captchaTimer={captchaTimer}
                       reset={reset} />
        </PageOpener>

        <PageOpener className={(captchaPass && !resetPass) ? 'opened' : ''}
                    ref='resetPage'>
          <Form className='login-reset-form'
                ref='resetPwdForm'
                action='/reset-password'
                controls={resetForm}
                submitButton={resetSubmit}
                beforeSubmit={this.checkPwd}
                afterSubmit={this.assureResetPwd} />
        </PageOpener>
      </div>
    );
  }


  // Login
  // ---------------------------

  login() {

    // Remember me
    dispatch({
      type: 'toggle-remember',
      data: {
        remember: document.getElementById('remember').checked ? 1 : 0,
        company: document.getElementById('company').value,
        username: document.getElementById('username').value
      }
    });

    // Login
    dispatch({
      type: 'login',
      data: new FormData(React.findDOMNode(this.refs.loginForm))
    });
  }


  // Forgot password
  // ---------------------------


  /**
   * Open `forgot password` page
   * @param e
   */
  openForgotPage(e) {
    this.refs.forgotPage.open(e);
  }


  /**
   * Check password and repeat password are the same
   */
  checkPwd() {
    const pwd = document.getElementById('new-password').value,
          rpt = document.getElementById('repeat-password').value;

    if (pwd !== rpt) {
      alert(getLang('SAME_PWD'));
      return false;
    }
  }


  /**
   * Password reset success
   */
  assureResetPwd() {
    alert(getLang('PWD_RESET_SUCCESS'));
    dispatch({
      type: 'reset-password-success'
    });
  }
}


export default Container.create(Login);