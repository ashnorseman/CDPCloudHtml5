/**
 * Lauguages
 */


'use strict';

import cookies from '../common/utils/cookies';


const supported = ['zh', 'en', 'jp'];

const lang = {

  zh: {

    // Login
    COMPANY: '公司',
    USERNAME: '用户',
    PASSWORD: '密码',
    LOGIN: '登　录',
    REMEMBER: '记住我',
    FORGOT_PWD: '忘记密码',
    COPYRIGHT: 'CDP © 2015 版权所有',

    // Forgot password
    MOBILE: '手机',
    CAPTCHA: '验证码',
    GET_CAPTCHA: '获得验证码',
    RETRY_CAPTCHA: '秒后重试',
    NEXT: '下一步',
    NEW_PWD: '新密码',
    REPEAT_PWD: '再次输入密码',
    RESET_PWD: '重置密码',
    AT_LEAST_6: '至少 6 位',
    SAME_PWD: '必须和密码相同',
    PWD_RESET_SUCCESS: '密码重置成功',

    WELCOME: '欢迎您',
    LOGOUT: '退出登录',
    PROFILE: '我的信息',
    MY_SALARY: '我的薪酬',

    // Validation
    REQUIRED: '必填',

    // Punctuation
    COMMA: '，'
  },

  en: {

    // Login
    COMPANY: 'Company',
    USERNAME: 'User',
    PASSWORD: 'Password',
    LOGIN: 'Login',
    REMEMBER: 'Remember me',
    FORGOT_PWD: 'Forgot password',
    COPYRIGHT: 'CDP © 2015 All rights reserved',

    // Forgot password
    MOBILE: 'Mobile',
    CAPTCHA: 'CAPTCHA',
    GET_CAPTCHA: 'Get CAPTCHA',
    RETRY_CAPTCHA: 'seconds',
    NEXT: 'Next',
    NEW_PWD: 'New password',
    REPEAT_PWD: 'Enter password again',
    RESET_PWD: 'Reset Password',
    AT_LEAST_6: 'At least 6 characters',
    SAME_PWD: 'Must the same as password',
    PWD_RESET_SUCCESS: 'Password reset succeeded.',

    WELCOME: 'Welcome',
    LOGOUT: 'Log out',
    PROFILE: 'Profile',
    MY_SALARY: 'My Salary',

    // Validation
    REQUIRED: 'Required',

    // Punctuation
    COMMA: ', '
  },

  jp: {

    // Login
    COMPANY: '株式会社',
    USERNAME: 'ユーザー',
    PASSWORD: 'パスワード',
    LOGIN: 'ログイン',
    REMEMBER: '私を覚えて',
    FORGOT_PWD: 'パスワードを忘れました',
    COPYRIGHT: 'CDP © 2015 版権所有',

    // Forgot password
    MOBILE: '携帯電話',
    CAPTCHA: 'キャプチャ',
    GET_CAPTCHA: 'キャプチャを得る',
    RETRY_CAPTCHA: '秒後リトライ',
    NEXT: '次に',
    NEW_PWD: '新パスワード',
    REPEAT_PWD: 'パスワードを再入力',
    RESET_PWD: 'パスワードをリセット',
    AT_LEAST_6: '至少 6 位',
    SAME_PWD: '必须和密码相同',
    PWD_RESET_SUCCESS: '密码重置成功',

    WELCOME: 'ようこそ',
    LOGOUT: 'ログアウト',
    PROFILE: 'プロフィール',
    MY_SALARY: '私の給料',

    // Validation
    REQUIRED: '必要です',

    // Punctuation
    COMMA: '，'
  }
};

const bl = navigator.browserLanguage;
const ls = navigator.languages;
const l = navigator.language;

let defaultLang = cookies.getItem('lang')
                    || (bl && bl.split('-')[0]) // IE11+
                    || (ls && ls[0] && ls[0].split('-')[0])
                    || (l && l.split('-')[0]);

if (supported.indexOf(defaultLang) === -1) {
  defaultLang = 'en';
}


export default {

  setLang(code) {
    defaultLang = code;
    cookies.setItem('lang', code);
  },

  getLang() {
    return defaultLang;
  },

  getItem(key) {
    return lang[defaultLang][key] || '';
  }
};