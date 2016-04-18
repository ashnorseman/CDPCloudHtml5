/**
 * Home page
 */


import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import ajax, { ajaxDispatch } from '.././../common/utils/ajax';
import { getItem as getLang } from '../../common/lang';

import Button from '../../components/Button/Button.jsx';
import Header from '../../components/Header/Header.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveListContainer extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);

    this.getPendingRecords();
  }


	/**
   * Approve all entries
   */
  approve(agreeOrNot) {
    const inputs = [].slice.call(document.querySelectorAll('[type=checkbox]'))
      .filter(check => check.checked)
      .map(check => check.value);

    ajax.post('/mss-approve-app', {
        idList: inputs.join(),
        agreeOrNot
      })
      .then(() => {
        location.reload();
      });
  }


  /**
   * Get employees' leave records (parameters)
   * @param params
   */
  getPendingRecords(params = {}) {
    params.page = 1;
    params.loadMore = false;

    LeaveDataUtils.getPendingRecords(params);
  }


  /**
   * Load next page
   */
  loadMore() {
    LeaveDataUtils.getPendingRecords({
      loadMore: true
    });
  }


  /**
   * Test if an item is selectable
   * @param {Object} item
   */
  select(item) {
    return true;
  }


	/**
   * Make records selectable / unselectable
   */
  toggleSelectMode() {
    dispatch({
      type: 'toggle-leave-record-selectable'
    });
  }


  render() {
    const { pendingRecords, selectable, status } = this.state;

    return (
      <div>
        <PullLoader status={status} className='side-gap' onLoad={this.loadMore}>
          <RecordList recordList={pendingRecords}
                      selectable={selectable && this.select}
                      url='leave-record-mgr' />
        </PullLoader>

        <Button icon='pencil' action onClick={this.toggleSelectMode} />

        <CSSTransitionGroup component='div' transitionName='bottom-up'>
          {
            selectable ?
              <nav className='tab tab-bottom leave-mgr-bottom'>
                <label className='leave-mgr-select-all' />
                <div className='row'>
                  <div className='col-1-2'>
                    <Button text={getLang('APPROVE_ALL')}
                            onTouchTap={this.approve.bind(null, true)} />
                  </div>
                  <div className='col-1-2'>
                    <Button text={getLang('REJECT_ALL')}
                            hollow
                            className='text-primary'
                            onTouchTap={this.approve.bind(null, false)} />
                  </div>
                </div>
              </nav> : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}


export default Container.create(LeaveListContainer);
