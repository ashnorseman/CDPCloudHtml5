/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import './header.less';

import React, { Component } from 'react';

import Button from '../Button/Button.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';


export default class Header extends Component {

  render() {
    const { title, iconLeft, iconRight, onTapLeft, onTapRight, back, dropdown } = this.props;

    const buttonLeft = back
            ? <Button className='header-icon-left' icon='chevron-left' onClick={this.back}></Button>
            : iconLeft
                ? <Button className='header-icon-left' icon={iconLeft} onClick={onTapLeft}></Button>
                : null;
    const buttonRight = iconRight
            ? <Button className='header-icon-right' icon={iconRight} onClick={onTapRight}></Button>
            : null;
    const dropdownMenu = dropdown
            ? <Dropdown {...dropdown} />
            : null;

    return (
      <header>
        <h1>{title}</h1>
        {buttonLeft}
        {buttonRight}
        {dropdownMenu}
        {this.props.children}
      </header>
    );
  }


  /**
   * `Back` event for `back` icon
   */
  back() {
    history.back();
  }
}