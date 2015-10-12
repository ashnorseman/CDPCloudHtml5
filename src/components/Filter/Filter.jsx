/**
 * Created by AshZhang on 15/10/10.
 */


'use strict';

import './filter.less';

import React, { Component } from 'react';


export default class Filter extends Component {


  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items
    };

    this.openFilter = this.openFilter.bind(this);
  }

  render() {
    const { items } = this.state,
          filterItems = items.map((item, index) => {
            const filterClass = 'filter-item'
                                  + (item.opened ? ' opened' : '')
                                  + (item.active ? ' active' : '');

            return (
              <li className={filterClass} key={index}>
                <a className='filter-text'
                   onTouchTap={this.openFilter.bind(this, index)}>{item.text}</a>

                <ul className='filter-choice-list'>
                  {
                    item.choices.map((choice, choiceIndex) => {
                      return <li className={'filter-choice ' + (choice.active ? 'active' : '')}
                                 key={choiceIndex}
                                 onTouchTap={this.filter.bind(this, index, choiceIndex)}>{choice.text}</li>;
                    })
                  }
                </ul>
              </li>
            );
          });

    return (
      <ul className='filter'>
        {filterItems}
      </ul>
    );
  }


  /**
   * Open a filter by index
   * @param {number} index
   */
  openFilter(index) {
    const items = this.state.items;

    items.forEach((item, i) => {
      item.opened = (!item.opened && (i === index));
    });

    this.setState({ items });
  }


  /**
   * Filter callback
   * @param {number} itemIndex
   * @param {number} choiceIndex
   */
  filter(itemIndex, choiceIndex) {
    const items = this.state.items;

    items.forEach((item, ii) => {
      item.opened = false;

      item.choices.forEach((choice, ci) => {
        const active = ((itemIndex === ii) && (choiceIndex === ci));

        item.active = (itemIndex === ii);
        choice.active = active;

        if (active && (typeof this.props.onFilter === 'function')) {
          this.props.onFilter.call(this, items[itemIndex].name, items[itemIndex].choices[choiceIndex].name);
        }
      });
    });

    this.setState({ items });
  }
}