/**
 * Created by AshZhang on 15/10/3.
 */


'use strict';

import './page-opener.less';

import React, { Component } from 'react';


export default class PageOpener extends Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`page-opener ${className}`}>
        <i className='fa fa-times page-closer' onTouchTap={this.close}></i>
        {this.props.children}
      </div>
    );
  }


  /**
   * Opens a page from certain origin
   * @param e
   */
  open(e) {
    const pX = e.clientX / window.innerWidth * 100 + '%',
          pY = e.clientY / window.innerHeight * 100 + '%',
          to = pX + ' ' + pY,
          page = React.findDOMNode(this);

    page.style.transformOrigin = to;
    page.style.webkitTransformOrigin = to;

    page.classList.add('opened');
  }


  /**
   * Close a page
   */
  close() {
    React.findDOMNode(this).classList.remove('opened');
  }
}