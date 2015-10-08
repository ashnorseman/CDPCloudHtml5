/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import ProfileDataUtils from '../data-utils/ProfileDataUtils';


class ProfileStore extends ReduceStore {

  getInitialState() {
    return {
      basicInfo: {},
      infoList: [],
      workExp: [],
      status: 'loading'
    };
  }

  reduce(state, action) {

    switch (action.type) {
    case 'get-profile':
      ProfileDataUtils.getProfile(action.data);
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-profile-success':
      return assign({}, state, action.data.data, {
        status: 'loaded'
      });
    default:
    }

    return state;
  }
}


export default new ProfileStore(Dispatcher);