/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import './userInfo.less';

import React, { Component } from 'react';


export default class UserInfo extends Component {

  render() {
    const {
            userInfo = {},
            action,
            simple,
            className
          } = this.props;

    const avatarStyle = userInfo.avatar ? {
                          backgroundImage: `url(${userInfo.avatar})`
                        } : null,
          userClass = 'user-info clearfix' +
                        (className ? ' ' + className : '') +
                        (simple ? ' user-info-simple' : '');

    return (
      <section className={userClass}>
        <div className='user-info-avatar' style={avatarStyle}></div>
        <div className='user-info-main clearfix'>
          <div className='user-info-name'>{userInfo.name}</div>
          <div className='user-info-pos'>{userInfo.position}</div>
        </div>
        {
          action
            ? <a className='user-info-action' href={action.link}>{action.text}</a>
            : null
        }
      </section>
    );
  }
}