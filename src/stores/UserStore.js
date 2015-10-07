/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import lang from '../common/lang';
import LoginStore from '../stores/LoginStore';
import UserDataUtils from '../data-utils/UserDataUtils';


class UserStore extends ReduceStore {

  getInitialState() {
    const userCookie = UserDataUtils.readCookie();

    return {
      loggedIn: userCookie.loggedIn,
      lang: lang.getLang(),
      savedLogin: userCookie,
      basicInfo: userCookie,

      // 0 - undefined
      // 1 - employee
      // 2 - manager
      identity: 0,

      menu: {}
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'login-success':
      return assign({}, state, {
        loggedIn: true,
        basicInfo: UserDataUtils.readCookie()
      });
    case 'login-failed':
    case 'logout-success':
      return assign({}, state, {
        loggedIn: false,
        basicInfo: {}
      });
    case 'toggleRemember':
      UserDataUtils.toggleRemember(action.data);
      break;
    case 'set-language':
      UserDataUtils.setLang(action.data);
      break;
    case 'set-language-success':
      location.reload();
      return assign({}, state, {
        lang: action.data
      });
    case 'get-user-menu':
      UserDataUtils.getUserMenu();
      break;
    case 'get-user-menu-success':
      return assign({}, state, action.data);
    default:
    }

    return state;
  }
}


export default new UserStore(Dispatcher);