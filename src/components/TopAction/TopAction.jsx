/**
 * Created by AshZhang on 15/10/25.
 */


import './TopAction.less';

import React, { Component, PropTypes } from 'react';


export default class TopAction extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: window.pageYOffset > 0
    };

    this._listenToScroll = this._listenToScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._listenToScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._listenToScroll, false);
  }


  /**
   * Scroll to the top of window
   */
  scrollTop() {
    window.scroll(0, 0);
  }


  /**
   * Only visible when the viewport has been scrolled down
   * @private
   */
  _listenToScroll() {
    this.setState({
      visible: window.pageYOffset > 0
    });
  }


  render() {
    const {
        visible
        } = this.state,

      visibilityStyle = {
        display: visible ? 'block' : 'none'
      };

    return (
      <span className="top-action"
            style={visibilityStyle}
            onTouchTap={this.scrollTop.bind(this)}>
        <svg version="1.0" id="图层_1" x="0px" y="0px" width="2rem" height="2rem" viewBox="0 0 51.609 50.273" enable-background="new 0 0 51.609 50.273">
          <path fill-rule="evenodd" clipRule="evenodd" fill="#FFFFFF" stroke="rgb(216, 0, 49)" strokeWidth="0.25" strokeMiterlimit="10" d="
            M25.945,49.078c-13.164,0-23.836-10.672-23.836-23.836S12.781,1.406,25.945,1.406s23.836,10.672,23.836,23.836
            S39.109,49.078,25.945,49.078z M44.508,29.25h-0.026L26.209,13.008h15.557v-0.07H10.477v0.07h15.626L7.55,29.25H7.523v0.023
            L7.5,29.294l0.023,0.026l0,0l0,0l0.023,0.026l0.03-0.026h11.337v13.078h0.07V29.32v-0.07H7.657l18.499-16.195l18.22,16.195H33.188
            v0.07h-0.07v13.148H18.984v0.07h14.133h0.07v-0.07V29.32h11.268l0.029,0.026l0.023-0.026l0,0l0,0l0.023-0.026l-0.023-0.021V29.25z"
            />
          <path fillRule="evenodd" clipRule="evenodd" fill="none" stroke="rgb(216, 0, 49)" strokeWidth="0.25" d="M25.945,1.547
            c13.086,0,23.695,10.609,23.695,23.695S39.032,48.938,25.945,48.938S2.25,38.329,2.25,25.242S12.859,1.547,25.945,1.547z"/>
        </svg>
      </span>
    );
  }
}
