/**
 * Login page
 */


'use strict';

import './login.less';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { dispatch } from '../../dispatcher/Dispatcher';

import { getItem as getLang } from '../../common/lang';
import UserStore from '../../stores/UserStore';
import LoginStore from '../../stores/LoginStore';

import Form from '../../components/Form/Form.jsx';
import FormControl from '../../components/FormControl/FormControl.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';
import Button from '../../components/Button/Button.jsx';
import PageOpener from '../../components/PageOpener/PageOpener.jsx';
import ForgotStep1 from './ForgotStep1.jsx';

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
        text: getLang('LOGIN'),
        hollow: true
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

    const savedLogin = Login.calculateState().savedLogin;

    // Saved cookies
    if (savedLogin.company) {
      loginForm[0].defaultValue = savedLogin.company;
    }

    if (savedLogin.username) {
      loginForm[1].defaultValue = savedLogin.username;
    }

    if (savedLogin.remember) {
      loginForm[3].defaultChecked = true;
    }
  }

  static getStores() {
    return [UserStore, LoginStore];
  }

  static calculateState() {
    const login = LoginStore.getState();

    return {
      savedLogin: UserStore.getState().savedLogin,
      captchaTimer: login.captchaTimer,
      reset: login.reset,
      captchaPass: login.captchaPass,
      resetPass: login.resetPass,
      loginStatus: login.loginStatus
    };
  }

  componentDidUpdate() {
    if (this.state.loginStatus.indexOf('failed') > -1) {
      this.refs.loginForm.setState({
        submitting: false
      });
    }
  }

  render() {
    const { captchaTimer, reset, captchaPass, resetPass, loginStatus } = this.state;

    return (
      <div className='login'>
        <div className='login-logo'>此处应有 Logo</div>

        <Form className='login-form'
              ref='loginForm'
              controls={loginForm}
              submitButton={loginSubmit}
              onSubmit={this.login}></Form>

        <Button className='login-forgot' text={getLang('FORGOT_PWD')} onClick={this.openForgotPage} />

        <div className="login-copyright">{getLang('COPYRIGHT')}</div>

        <PageOpener ref='forgotPage' className={captchaPass && ''}>
          <ForgotStep1 captchaTimer={captchaTimer} reset={reset}></ForgotStep1>
        </PageOpener>

        <PageOpener ref='resetPage' className={(captchaPass && !resetPass) ? 'opened' : ''}>
          <Form ref='resetPwdForm' className='login-reset-form'
                action='/reset-password'
                controls={resetForm} submitButton={resetSubmit}
                beforeSubmit={this.checkPwd} afterSubmit={this.assureResetPwd}></Form>
        </PageOpener>
      </div>
    );
  }


  // Login
  // ---------------------------

  login() {

    // Remember me
    dispatch({
      type: 'toggleRemember',
      data: document.getElementById('remember').checked
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