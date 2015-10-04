/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { Container } from 'flux/utils';
import { dispatch } from '../dispatcher/Dispatcher';

import lang, { getItem as getLang } from '../common/lang';
import LoginContainer from './Login/LoginContainer.jsx';
import UserStore from '../stores/UserStore';


class Home extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.setLang = this.setLang.bind(this);
  }

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    const user = UserStore.getState();

    return {
      loggedIn: user.loggedIn,
      nickname: user.basicInfo.nickname
    };
  }

  render() {
    return (
      !this.state.loggedIn
        ? <LoginContainer />
        : <div>
            <h1>{getLang('WELCOME') + getLang('COMMA') + this.state.nickname}</h1>
            <button type='button' onClick={this.logout}>{getLang('LOGOUT')}</button>
            <select onChange={this.setLang} defaultValue={lang.getLang()}>
              <option value="zh">中文</option>
              <option value="en">English</option>
              <option value="jp">日本語</option>
            </select>
            <Link to='/profile'>{getLang('PROFILE')}</Link>
            <Link to='/salary'>{getLang('MY_SALARY')}</Link>
            {this.props.children}
          </div>
    );
  }

  logout() {
    dispatch({
      type: 'logout'
    });
  }

  setLang(e) {
    dispatch({
      type: 'set-language',
      data: e.target.value
    });
  }
}


export default Container.create(Home);