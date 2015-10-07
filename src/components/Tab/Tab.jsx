/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import './tab.less';

import React, { Component } from 'react';


export default class Tab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items
    };
  }

  render() {
    const { items } = this.state,
          { onActivate } = this.props,
          hasActive = items.some((item) => {
            if (item.name === location.hash.split('?')[0].slice(2)) {
              item.active = true;
            }
            return item.active;
          }),
          style = {
            width: (100 / items.length) + '%'
          };

    // Set default active item
    if (!hasActive) {
      items[0].active = true;
    }

    this.onActivate = onActivate;

    const tabItems = items.map((item, index) => {
      const className = 'tab-item' + (item.active ? ' active' : '');

      return <a className={className} key={index}
                href={`#/${item.name}`}
                style={style}
                onTouchTap={this.activateTab.bind(this, index)}>
        {item.text}
        {item.notification ? <span className='tab-notification'></span> : null}
      </a>;
    });

    return (
      <nav className={'tab clearfix tab-count-' + items.length}>
        {tabItems}
        <div className='tab-active-line' style={{width: 100 / items.length + '%'}}></div>
      </nav>
    );
  }


  /**
   * Activate a tab by index
   * @param {number} index
   */
  activateTab(index) {
    let oldActiveItem, activeItem;

    this.state.items.forEach((item, itemIndex) => {
      if (item.active) {
        oldActiveItem = item;
      }

      item.active = (itemIndex === index);

      if (item.active) {
        activeItem = item;
      }
    });

    if ((oldActiveItem !== activeItem) && (typeof this.onActivate === 'function')) {
      this.onActivate.call(this, activeItem.name, index);
    }

    this.setState({
      items: this.state.items
    });
  }
}