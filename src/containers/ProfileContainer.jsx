/**
 * Profile container
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import { getItem as getLang } from '../common/lang';
import Header from '../components/Header/Header.jsx';
import Loader from '../components/Loader/Loader.jsx';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import InfoCard from '../components/InfoCard/InfoCard.jsx';
import ProfileStore from '../stores/ProfileStore';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.getProfile(this.props.params.id);
  }

  static getStores() {
    return [ProfileStore];
  }

  static calculateState() {
    return ProfileStore.getState();
  }

  render() {
    const { basicInfo, infoList, workExp, status } = this.state;

    return (
      <div>
        <Header back title={getLang('PROFILE')} />

        <Loader status={status} className='side-gap pad-b'>
          <UserInfo className='gap-t-lg gap-b-lg' userInfo={basicInfo} />

          {
            infoList.map((card, index) => {
              return <InfoCard title={card.title} items={card.items} key={index} />;
            })
          }

          <hr className='gap-t-lg gap-b-lg' />

          <h2 className='gap-b'>{getLang('WORK_EXP')}</h2>

          {
            workExp.map((card, index) => {
              return <InfoCard items={card.items} key={index} />;
            })
          }
        </Loader>
      </div>
    );
  }


  /**
   * Get an employees profile
   * @param {number} [id]
   */
  getProfile(id) {
    dispatch({
      type: 'get-profile',
      data: id
    });
  }
}


export default Container.create(Profile);