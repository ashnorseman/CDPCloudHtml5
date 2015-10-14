/**
 * Created by AshZhang on 15/10/13.
 */


'use strict';

import './sideNav.less';

import React, { Component } from 'react';


export default class SideNav extends Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    document.addEventListener('touchend', this.close, false);
  }

  componetnWillUnmount() {
    document.removeEventListener('touchend', this.close, false);
  }

  render() {
    const { data = [] } = this.props;

    return (
      <nav className='side-nav'>
        {
          data.map((item, index) => {
            return <a className='side-nav-item' key={index}
                      href={item.link ? `#/${item.link}` : null}
                      onTouchTap={this.onTouchTap.bind(this, item.onTouchTap)}>{item.text}</a>;
          })
        }
      </nav>
    );
  }


  /**
   * Open the nav
   */
  open() {
    React.findDOMNode(this).classList.add('opened');
    document.body.classList.add('side-nav-opened');
  }


  /**
   * Close the nav
   */
  close(e) {

    if (!e || e.target.nodeName === 'BODY') {
      React.findDOMNode(this).classList.remove('opened');
      document.body.classList.remove('side-nav-opened');
    }
  }


  onTouchTap(callback) {
    this.close();

    if (typeof callback === 'function') {
      callback();
    }
  }
}