/**
 * Created by AshZhang on 15/10/10.
 */


'use strict';

import './record-list.less';

import React, { Component } from 'react';

import lang, { getItem as getLang } from '../../common/lang';


const statusText = [getLang('REJECTED'), getLang('APPROVED'), getLang('PENDING')];


export default class RecordList extends Component {

  render() {
    const { url, recordList = [], selectable } = this.props;

    return (
      <ul className={'record-list' + (selectable ? ' record-list-selectable' : '')}>
        {
          recordList.map((record, index) => {
            return (
              <li key={index}>
                {
                  selectable && selectable(record)
                    ? <label className='record-item-select'><input type='checkbox' onChange={this.toggleSelect.bind(this, record)} /></label>
                    : null
                }
                <a className='record-item' href={`#/${url}/${record.id}`}>
                  <span className='record-item-name'>{record.name}</span>
                  <span className='record-item-time'>{record.time}</span>
                  <span className={'record-item-status record-item-status-' + record.status}>
                    {statusText[record.status]}
                  </span>
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }


  /**
   * When an item's select status changes
   * @param {Object} record
   * @param {Event} e
   */
  toggleSelect(record, e) {

    if (typeof this.props.toggleSelect === 'function') {
      this.props.toggleSelect(record, e.target.checked);
    }
  }
}