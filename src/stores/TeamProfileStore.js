/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import ProfileDataUtils from '../data-utils/ProfileDataUtils';


class TeamProfileStore extends ReduceStore {

  getInitialState() {
    return {
      empList: [],
      status: 'loading'
    };
  }

  reduce(state, action) {

    switch (action.type) {
    case 'get-team-members':
      ProfileDataUtils.getTeamMembers();
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-team-members-success':
      return assign({}, state, {
        empList: action.data.data,
        status: 'loaded'
      });
    default:
    }

    return state;
  }
}


export default new TeamProfileStore(Dispatcher);