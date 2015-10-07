/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { dispatch } from '../../dispatcher/Dispatcher';

import lang, { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Tab from '../../components/Tab/Tab.jsx';
import LoginContainer from './../Login/LoginContainer.jsx';
import UserStore from '../../stores/UserStore';


/**
 * Language dropdown settings
 * @type {{items: *[], onClickItem}}
 */
const langDropdown = {
  items: [
    {
      text: '中文',
      name: 'zh'
    },
    {
      text: 'English',
      name: 'en'
    },
    {
      text: '日本語',
      name: 'jp'
    }
  ],
  onClickItem(langCode) {
    dispatch({
      type: 'set-language',
      data: langCode
    });
  }
};


const tabItems = [
  {
    text: getLang('EMPLOYEE'),
    name: 'employee'
  },
  {
    text: getLang('MANAGER'),
    name: 'manager'
  }
];


class Home extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.getUserMenu();
  }

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    const user = UserStore.getState();

    return {
      loggedIn: user.loggedIn,
      identity: user.identity,
      menu: user.menu
    };
  }

  render() {
    const { loggedIn, identity, menu } = this.state,
          routeName = this.props.location.pathname,
          hasHeader = ['/employee', '/manager', '/'].indexOf(routeName) > -1;

    Object.keys(menu).forEach((userType, index) => {
      tabItems[index].notification = menu[userType].some((item) => {
          return item.notification;
        });
    });

    return (
      !loggedIn
        ? <LoginContainer />
        : <div>
            {
              hasHeader
                ? <Header title='CDP Portal' dropdown={langDropdown}
                          iconLeft='sign-out' onTapLeft={this.logout}></Header>
                : null
            }
            {
              hasHeader
                ? <Tab items={tabItems}></Tab>
                : null
            }
            {this.props.children}
          </div>
    );
  }


  /**
   * Get custimzed menu list
   */
  getUserMenu() {
    dispatch({
      type: 'get-user-menu'
    });
  }


  /**
   * Logout
   */
  logout() {
    dispatch({
      type: 'logout'
    });
  }
}


export default Container.create(Home);