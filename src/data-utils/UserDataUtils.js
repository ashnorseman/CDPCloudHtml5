/**
 * User data utils
 */


'use strict';

import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import ajax from '../common/utils/ajax';
import cookies from '../common/utils/cookies';
import lang from '../common/lang';


export default {

  readCookie() {
    let result = {};

    cookies.keys().forEach((key) => {
      result[key] = cookies.getItem(key);
    });

    return result;
  },

  toggleRemember(remember) {

    if (remember) {
      cookies.setItem('remember', 1);
    } else {
      cookies.removeItem('remember');
      cookies.removeItem('username');
    }
  },

  login(data) {
    ajax.post('/login', data)
      .then((res) => {
        cookies.setItem('loggedIn', 1);

        dispatch({
          type: 'login-success',
          data: res
        });
      })
      .catch((e) => {
        dispatch({
          type: 'login-fail',
          data: e
        });
      });
  },

  logout() {
    ajax.get('/logout')
      .then(() => {
        cookies.removeItem('loggedIn');

        dispatch({
          type: 'logout-success'
        });
      })
      .catch((e) => {
        dispatch({
          type: 'logout-fail',
          error: e
        });
      });
  },

  setLang(code) {
    ajax.post('/lang', {
      lang: code
    })
      .then(() => {
        lang.setLang(code);
        dispatch({
          type: 'set-language-success',
          data: code
        });
      });
  },


  // Forgot password
  // ---------------------------

  /**
   * Get captcha for a mobile
   */
  getCaptcha(mobile) {
    let timer = 61,
        timeout;

    function countDown() {
      timer -= 1;

      dispatch({
        type: 'get-captcha-countdown',
        data: timer
      });

      if (timer === 0) {
        return clearTimeout(timeout);
      }

      timeout = setTimeout(countDown, 1000);
    }

    setTimeout(countDown, 0);

    ajax.get('/captcha', { mobile })
      .catch(() => {
        clearTimeout(timeout);
        dispatch({
          type: 'get-captcha-fail'
        });
      });
  },


  /**
   * Check captcha
   */
  checkCaptcha(formData) {
    ajax.post('/check-captcha', formData)
      .then(() => {
        dispatch({
          type: 'check-captcha-success'
        });
      });
  },


  // Home
  // ---------------------------


  /**
   * Get user identity and custom menu
   */
  getUserMenu() {
    ajax.get('/user-menu')
      .then((res) => {
        dispatch({
          type: 'get-user-menu-success',
          data: res
        });
      });
  }
};