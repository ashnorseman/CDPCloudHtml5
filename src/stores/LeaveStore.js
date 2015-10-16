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
      leaveRecords: [],
      leaveRecord: {},
      selectedLeaveRecords: [],
      mgrAjax: false,
      query: {
        page: 1,
        pageSize: 20,
        sort: 'time',
        order: 'desc'
      }
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'get-leave-form':
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-leave-form-success':
      return assign({}, state, {
        leaveForm: action.data,
        status: 'loaded',
        leaveValidation: window.leaveValidation
      });
    case 'get-leave-types-success':
      return assign({}, state, {
        leaveTypes: action.data
      });
    case 'get-emp-leave-records':
      const newQuery = assign(state.query, action.data);

      if (action.data && action.data.loadMore) {
        if (state.status === 'loading') return state;

        newQuery.page += 1;
      }

      LeaveDataUtils.getEmpLeaveRecords(newQuery);
      return assign({}, state, {
        status: 'loading',
        query: newQuery
      });
    case 'get-emp-leave-records-success':
      const data = action.data;

      return assign({}, state, {
        leaveRecords: state.query.loadMore ? state.leaveRecords.concat(data) : data,
        status: (data.length < state.query.pageSize)
          ? 'no-more-data'
          : 'loaded'
      });
    case 'get-leave-record':
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-leave-record-success':
      return assign({}, state, {
        leaveRecord: action.data,
        status: 'loaded'
      });
    case 'toggle-leave-record-selectable':
      return assign({}, state, {
        selectable: !state.selectable
      });
    case 'toggle-leave-record-select-status':
      if (action.data.isSelected && (state.selectedLeaveRecords.indexOf(action.data.id) === -1)) {
        state.selectedLeaveRecords.push(action.data.id);
      }
      if (!action.data.isSelected && (state.selectedLeaveRecords.indexOf(action.data.id) !== -1)) {
        state.selectedLeaveRecords = state.selectedLeaveRecords.filter((item) => {
          return item !== action.data.id;
        });
      }
      return assign({}, state);
    case 'approve-all-leaves':
    case 'reject-all-leaves':
      return assign({}, state, {
        mgrAjax: true
      });
    case 'approve-all-leaves-success':
    case 'reject-all-leaves-success':
      location.reload();
      return state;
    case 'toggle-leave-record-select-all':
      state.selectedLeaveRecords = [];
      state.leaveRecords.forEach((item) => {
        if (item.status === 2) {
          item.checked = action.data;
          state.selectedLeaveRecords.push(item.id);
        }
      });
      return assign({}, state);
    case 'leave-record-approve-success':
    case 'leave-record-reject-success':
      history.back();
      return state;
    }

    return state;
  }
}


export default new LeaveStore(Dispatcher);