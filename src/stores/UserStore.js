/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import lang from '../common/lang';
import UserDataUtils from '../data-utils/UserDataUtils';


class UserStore extends ReduceStore {

  getInitialState() {
    const userCookie = UserDataUtils.readCookie();

    return {
      loggedIn: userCookie.loggedIn,
      lang: lang.getLang(),
      langList: localStorage.langList ? JSON.parse(localStorage.langList) : [],
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
      const data = assign({}, state, {
        loggedIn: true,
        basicInfo: assign(UserDataUtils.readCookie(), action.data.userInfo),
        langList: action.data.lang,
        lang: action.data.lang[0].langCode
      });
      localStorage.langList = JSON.stringify(action.data.lang);
      UserDataUtils.getUserMenu();
      return data;
    case 'login-failed':
    case 'logout-success':
      return assign({}, state, {
        loggedIn: false,
        basicInfo: {}
      });
    case 'toggle-remember':
      UserDataUtils.toggleRemember(action.data);
      return assign({}, state, {
        loggedIn: false,
        basicInfo: {},
        savedLogin: action.data.remember ? action.data : {}
      });
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
      console.log(action.data);
      const menu = action.data.menu;
      return assign({}, state, action.data, {
        isMrg: menu && menu.ess && menu.ess.length && menu.mss && menu.mss.length
      });
    case 'confirm-mobile-success':
      return assign({}, state, {
        basicInfo: assign({}, state.basicInfo, {
          userFlag: 1
        })
      });
    default:
    }

    return state;
  }
}


export default new UserStore(Dispatcher);