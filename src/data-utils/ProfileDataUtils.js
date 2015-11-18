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
    const path = '/profile'
                    + ((id === void 0) ? `` : `/${id}`);

    ajax.get(path)
      .then((res) => {
        dispatch({
          type: 'get-profile-success',
          data: res.val
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
          data: res.data
        });
      });
  }
};