/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import './icon.less';

import React, { Component } from 'react';


export default class Icon extends Component {

  render() {
    const { name, button, className } = this.props;

    return (
      <i className={
        'fa fa-'
          + name
          + (button ? ' icon-button' : '')
          + (className ? ' ' +  className : '')
      }>{this.props.children}</i>
    );
  }
}