/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import { getItem as getLang } from '../common/lang';
import Header from '../components/Header/Header.jsx';
import Loader from '../components/Loader/Loader.jsx';
import Search from '../components/Search/Search.jsx';
import Sorter from '../components/Sorter/Sorter.jsx';
import UserList from '../components/UserList/UserList.jsx';
import TeamProfileStore from '../stores/TeamProfileStore';


const sortItems = [
  {
    text: getLang('NAME'),
    name: 'name',
    order: 'asc'
  },
  {
    text: getLang('JOIN_TIME'),
    name: 'joinTime',
    order: 'desc'
  }
];

class Profile extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.sort = this.sort.bind(this);
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
    const { status, empList } = this.state;

    return (
      <div>
        <Header back title={getLang('TEAM_PROFILE')}>
          <Search placeholder={getLang('ENTER_USER_SEARCH')} onSearch={this.search}></Search>
        </Header>

        <Sorter items={sortItems} defaultItem='name' onSort={this.sort} />

        <Loader status={status} className='side-gap gap-t pad-b'>
          <UserList userList={empList} onSelectUser={this.selectUser} />
        </Loader>
      </div>
    );
  }


  /**
   * Get team members
   */
  getTeamMembers() {
    dispatch({
      type: 'get-team-members'
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
    console.log(query);
  }


  /**
   * Sort
   * @param name
   * @param order
   */
  sort(name, order) {
    console.log(name, order);
  }
}


export default Container.create(Profile);