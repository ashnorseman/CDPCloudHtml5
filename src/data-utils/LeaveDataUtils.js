/**
 * Created by AshZhang on 15/10/8.
 */


'use strict';

import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import ajax, { ajaxDispatch } from '../common/utils/ajax';


export default {


  /**
   * Get Leave Quota
   */
  getQuota() {
    dispatch({
      type: 'get-leave-quota'
    });

    ajax.get('/user-quota')
        .then((data) => {
          console.log(data);

          dispatch({
            type: 'get-leave-quota-success',
            data
          });
        });
  },


  /**
   * Get leave form
   */
  getLeaveForm() {
    dispatch({
      type: 'get-leave-form'
    });

    ajax.get('/leave-form')
      .then((form) => {

        ajax.getScript('/leave-validation')
          .then(() => {

            setTimeout(() => {
              dispatch({
                type: 'get-leave-form-success',
                data: form
              });
            }, 200);
          });
      });
  },


  /**
   * Get leave types
   */
  getLeaveTypes() {
    ajaxDispatch({
      action: 'get-leave-types',
      url: '/leave-types',
      method: 'get'
    });
  },


  /**
   * Get an employee's leave records
   * @param {Object} [params]
   */
  getEmpLeaveRecords(params) {
    ajax.get('/leave-records', params)
      .then((res) => {
        dispatch({
          type: 'get-emp-leave-records-success',
          data: res
        });
      });
  },


  /**
   * Get a single leave record by id
   */
  getLeaveRecord(id) {

    ajaxDispatch({
      action: 'get-leave-record',
      url: '/leave-record/' + id,
      method: 'get'
    });
  },


  /**
   * Approve all records
   * @param {Array} records
   */
  approveAll(records) {

    ajaxDispatch({
      action: 'approve-all-leaves',
      url: '/approve-leave',
      method: 'post',
      data: records
    });
  },


  /**
   * Reject all records
   * @param {Array} records
   */
  rejectAll(records) {

    ajaxDispatch({
      action: 'reject-all-leaves',
      url: '/reject-leave',
      method: 'post',
      data: records
    });
  },


  /**
   * Reject a record
   */
  approveRecord({ id, opinion }) {

    ajaxDispatch({
      action: 'leave-record-approve',
      url: '/approve-leave/' + id,
      method: 'post',
      data: {
        opinion
      }
    });
  },


  /**
   * Reject a record
   */
  rejectRecord({ id, opinion }) {

    ajaxDispatch({
      action: 'leave-record-reject',
      url: '/reject-leave/' + id,
      method: 'post',
      data: {
        opinion
      }
    });
  }
};