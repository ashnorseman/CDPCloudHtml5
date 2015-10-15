/**
 * Home page
 */


'use strict';

import './leave-mgr.less';

import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import LeaveList from './LeaveList.jsx';
import LeaveStore from '../../stores/LeaveStore';


class LeaveMgr extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    const state = LeaveStore.getState();

    return {
      leaveTypes: state.leaveTypes,
      leaveRecords: state.leaveRecords,
      status: state.status,
      selectable: state.selectable
    };
  }

  render() {
    const { selectable } = this.state;

    return (
      <div className='bottom-gap'>
        <Header back title={getLang('LEAVE_MGR')} iconRight={selectable ? 'check' : 'edit'}
                onTapRight={this.toggleEnterMode} />
        <LeaveList {...this.state}
                   defaultFilter={{ type: 'status', choice: 'pending' }}
                   toggleSelect={this.toggleSelect}></LeaveList>

        <CSSTransitionGroup component='div' transitionName='bottom-up'>
          {
            selectable ?
              <nav className='tab tab-bottom leave-mgr-bottom'>
                <label className='leave-mgr-select-all'><input type='checkbox' /></label>
                <div className='row'>
                  <div className='col-1-2'><button>全部通过</button></div>
                  <div className='col-1-2'><button>全部拒绝</button></div>
                </div>
              </nav> : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }


  /**
   * Make leave records selectable
   */
  toggleEnterMode() {
    dispatch({
      type: 'toggle-leave-record-selectable'
    });
  }


  /**
   * Toggle an item's select status
   * @param {Object} item
   * @param {boolean} isSelected
   */
  toggleSelect(item, isSelected) {
    dispatch({
      type: 'toggle-leave-record-select-status',
      data: {
        id: item.id,
        isSelected
      }
    });
  }
}


export default Container.create(LeaveMgr);