/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import LeaveDataUtils from '../data-utils/LeaveDataUtils';


class LeaveStore extends ReduceStore {

  getInitialState() {
    return {
      leaveForm: [],
      status: 'loading',
      leaveValidation: null,
      leaveTypes: [],
      leaveRecords: []
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'get-leave-form':
      if (!state.leaveForm.length) {
        LeaveDataUtils.getLeaveForm();

        return assign({}, state, {
          status: 'loading'
        });
      }
      return state;
    case 'get-leave-form-success':
      return assign({}, state, {
        leaveForm: action.data,
        status: 'loaded',
        leaveValidation: window.leaveValidation
      });
    case 'get-leave-types':
      LeaveDataUtils.getLeaveTypes();
      break;
    case 'get-leave-types-success':
      return assign({}, state, {
        leaveTypes: action.data
      });
    case 'get-emp-leave-records':
      LeaveDataUtils.getEmpLeaveRecords(action.data);
      return assign({}, state, {
        leaveRecords: [],
        status: 'loading'
      });
    case 'get-emp-leave-records-success':
      return assign({}, state, {
        leaveRecords: action.data,
        status: 'loaded'
      });
    }

    return state;
  }
}


export default new LeaveStore(Dispatcher);