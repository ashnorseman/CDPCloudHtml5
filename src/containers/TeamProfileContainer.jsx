/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import { getItem as getLang } from '../common/lang';
import Header from '../components/Header/Header.jsx';
import PullLoader from '../components/PullLoader/PullLoader.jsx';
import Search from '../components/Search/Search.jsx';
import Dropdown from '../components/Dropdown/Dropdown.jsx';
import UserList from '../components/UserList/UserList.jsx';

import TeamProfileStore from '../stores/TeamProfileStore';


const dropdownItems = [
  {
    text: getLang('NAME'),
    name: 'name'
  },
  {
    text: getLang('POSITION'),
    name: 'position'
  }
];

class Profile extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.getTeamMembers();
  }

  static getStores() {
    return [TeamProfileStore];
  }

  static calculateState() {
    return TeamProfileStore.getState();
  }

  render() {
    const {status, empList} = this.state;

    return (
      <div>
        <Header back title={getLang('TEAM_PROFILE')} dropdown>
          <Search placeholder={getLang('ENTER_USER_SEARCH')} onSearch={this.search}></Search>
        </Header>

        <Dropdown items={dropdownItems} onClickItem />

        <PullLoader status={status} className='side-gap gap-t pad-b' onLoad={this.loadMore}>
          <UserList userList={empList} onSelectUser={this.selectUser} />
        </PullLoader>
      </div>
    );
  }

  /**
   * Get team members
   * @param {Object} [query]
   */
  getTeamMembers(query = {}) {
    query.page = 1;
    query.pageSize = 16;
    query.loadMore = false;
    dispatch({
      type: 'get-team-members',
      data: query
    });
  }


  /**
   * Load next page
   */
  loadMore() {
    dispatch({
      type: 'get-team-members',
      data: {
        loadMore: true
      }
    });
  }


  /**
   * Go to employee profile page
   * @param id
   */
  selectUser(id) {
    location.hash = '/profile/' + id;
  }


  /**
   * Search employee
   * @param {string} query
   */
  search(query) {
    this.getTeamMembers({
      search: query
    });
  }

}


export default Container.create(Profile);