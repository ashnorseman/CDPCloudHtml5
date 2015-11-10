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
import SideNav from '../../components/SideNav/SideNav.jsx';
import LoginContainer from './../Login/LoginContainer.jsx';
import UserStore from '../../stores/UserStore';


const sideNavData = [
  {
    text: getLang('CHANGE_MOBILE'),
    link: 'change-mobile'
  },
  {
    text: getLang('CHANGE_PWD'),
    link: 'change-password'
  },
  {
    text: getLang('LOGOUT')
  }
];

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
    this.openSideNav = this.openSideNav.bind(this);

    sideNavData[2].onTouchTap = this.logout;

    this.getUserMenu();
  }

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    const user = UserStore.getState();

    return {
      loggedIn: user.loggedIn,
      menu: user.menu
    };
  }

  render() {
    const { loggedIn, menu } = this.state,
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
                          iconLeft='bars' onTapLeft={this.openSideNav}></Header>
                : null
            }
            {
              hasHeader
                ? <SideNav ref='sideNav' data={sideNavData}></SideNav>
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


  openSideNav() {
    this.refs.sideNav.open();
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