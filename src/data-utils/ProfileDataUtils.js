/**
 * Created by AshZhang on 15/10/8.
 */


'use strict';

import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import ajax from '../common/utils/ajax';


export default {


  /**
   * Get user profile
   * @param {number} [id]
   */
  getProfile(id) {
    const path = '/user-message' + ((id === void 0) ? `` : `/${id}`);

    ajax.get(path)
      .then((res) => {
        dispatch({
          type: 'get-profile-success',
          data: res
        });
      });
  },


  /**
   * Get user profile categories
   * @param {number} [id]
   */
  getProfileCategories(id) {
    const path = '/user-message-info-type' + ((id === void 0) ? `` : `/${id}`);

    ajax.get(path)
      .then((res) => {
        dispatch({
          type: 'get-profile-categories-success',
          data: res
        });
      });
  },


  /**
   * Get a category detail
   */
  getProfileByCategory(cmdId) {
    ajax.post('/user-base-message-info', {
      cmdId
    })
      .then((res) => {
        dispatch({
          type: 'get-profile-category-detail-success',
          data: {
            cmdId,
            items: res.items
          }
        });
      });
  },


  /**
   * Get team member list (for managers)
   * @param {Object} query
   */
  getTeamMembers(query) {
    ajax.get('/team-members', query)
      .then((res) => {
        dispatch({
          type: 'get-team-members-success',
          data: res
        });
      });
  }
};