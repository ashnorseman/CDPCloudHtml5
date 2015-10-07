/**
 * Created by AshZhang on 15/10/7.
 */


'use strict';

import { getItem as getLang } from '../../common/lang';

export default {

  profile: {
    text: getLang('PROFILE'),
    style: 1,
    link: 'profile',
    icon: 'user'
  },
  mySalary: {
    text: getLang('MY_SALARY'),
    style: 2,
    link: 'my-salary',
    icon: 'money'
  },
  myLeave: {
    text: getLang('MY_LEAVE'),
    style: 3,
    link: 'my-leave',
    icon: 'plane'
  },
  myOT: {
    text: getLang('MY_OT'),
    style: 4,
    link: 'my-ot',
    icon: 'coffee'
  },
  leaveMgr: {
    text: getLang('LEAVE_MGR'),
    style: 5,
    link: 'leave-mgr',
    icon: 'plane'
  },
  otMgr: {
    text: getLang('OT_MGR'),
    style: 6,
    link: 'ot-mgr',
    icon: 'coffee'
  },
  teamProfile: {
    text: getLang('TEAM_PROFILE'),
    style: 7,
    link: 'team-profile',
    icon: 'users'
  }
};