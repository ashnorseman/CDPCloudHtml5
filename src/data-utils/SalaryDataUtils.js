/**
 * Created by AshZhang on 15/10/8.
 */


'use strict';

import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import ajax from '../common/utils/ajax';


export default {


  /**
   * Get user salary
   * @param {number} year
   * @param {number} month
   */
  getSalary({year, month}) {

    ajax.get('/salary', {
      year, month
    })
      .then((res) => {
        dispatch({
          type: 'get-salary-success',
          data: res
        });
      });
  }
};