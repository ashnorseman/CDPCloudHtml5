/**
 * Leave List
 */


'use strict';

import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import ajax, { ajaxDispatch } from '.././../common/utils/ajax';

import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { getItem as getLang } from '../../common/lang';
import Filter from '../../components/Filter/Filter.jsx';
import Button from '../../components/Button/Button.jsx';
import Form from '../../components/Form/Form.jsx';
import Header from '../../components/Header/Header.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Tab from '../../components/Tab/Tab.jsx';
import PageOpener from '../../components/PageOpener/PageOpener.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import UserList from '../../components/UserList/UserList.jsx';

import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


export default class LeaveList extends Component {

  constructor(props) {
    super(props);
    this.checkEdit = this.checkEdit.bind(this);
    this.filter = this.filter.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.openApply = this.openApply.bind(this);
    this.applyResponse = this.applyResponse.bind(this);
    this.save = this.save.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { defaultFilter, mgr } = this.props;

    if (mgr) {
      this._type = 'get-mgr-leave-history';
    } else {
      this._type = 'get-emp-leave-records';
    }

    this.getEmpLeaveRecords(defaultFilter);
    LeaveDataUtils.getFilter(JSON.parse(localStorage.getItem('companyCode')));
  }


  checkEdit(item, e) {
    if (item.state === 'edit') {
      e.preventDefault();

      LeaveDataUtils.getLeaveRecord(item.id);
      this.openApply(e);
    }
  }


  save() {
    const form = this.refs.applyForm;

    if (!form.isValid() || window.leaveValidation && !window.leaveValidation()) return;

    const formData = new FormData(React.findDOMNode(form));

    formData.append('submit', false);

    ajax.post('/ess-insert-lv', formData)
      .then((res) => {
        this.applyResponse(res);
      });
  }


  submit() {
    if (!this.refs.applyForm.isValid() || window.leaveValidation && !window.leaveValidation()) return;

    const formData = new FormData(React.findDOMNode(this.refs.applyForm));

    formData.append('submit', true);

    ajax.post('/ess-insert-lv', formData)
      .then((res) => {
        this.applyResponse(res);
      });
  }


  /**
   * Apply response
   * @param res
   */
  applyResponse(res) {
    const inputs = React.findDOMNode(this.refs.applyForm).querySelectorAll('input, select, textarea');

    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].value = '';
    }

    if (res) {
      alert(res);
    }

    this.refs.apply.close();
  }


  /**
   * Open apply form
   * @param e
   */
  openApply(e) {
    this.refs.apply.open(e);

    if (!LeaveStore.getState().leaveForm || !LeaveStore.getState().leaveForm.length) {
      LeaveDataUtils.getLeaveForm();
    }
  }


  /**
   * Select / unselect all
   */
  toggleSelectAll(e) {
    const selected = e.target.checked;

    [].slice.call(document.querySelectorAll('[type=checkbox]')).forEach(checkbox => {
      checkbox.checked = selected;
    });
  }

  render() {
    const { leaveRecords, status, leaveTypes, mgr, selectable, toggleSelect, filter, leaveForm, formIsSubmitting } = this.props;

    if (filter) {
      filter.onClickItem = (state) => {
        this.getEmpLeaveRecords({
          state
        });
      };
    }

    return (
      <div>
        <Header
          back
          title={getLang('MY_APPLY')}
          dropdown={filter}
        />

        {/*<Filter items={filter} onFilter={this.filter}></Filter>*/}

        <PullLoader status={status} onLoad={this.loadMore}>
          {
            mgr
              ? <div className="gap-t-lg">
                  <UserList userList={leaveRecords} onSelectUser={this.selectUser} />
                </div>
              : <RecordList recordList={leaveRecords}
                            url={'leave-record' + (mgr ? '-mgr' : '')}
                            onClickItem={this.checkEdit}
                            selectable={selectable && this.select}
                            toggleSelect={this.toggleSelect} />
          }
        </PullLoader>

        <Button icon='plus' action onClick={this.openApply} />

        <Button icon='pencil' action onClick={this.toggleEnterMode} style={{bottom: '10rem'}} />

        <PageOpener ref='apply'>
          <Loader status={status}>
            <Form className='side-gap pad-b' action='/leave-apply' ref='applyForm'
                  controls={leaveForm} />

            <div className="row">
              <div className="col-1-2"><Button type='button' text={getLang('SAVE')} onClick={this.save} /></div>
              <div className="col-1-2"><Button type='button' text={getLang('SUBMIT')} onClick={this.submit} /></div>
            </div>
          </Loader>
        </PageOpener>

        <CSSTransitionGroup component='div' transitionName='bottom-up'>
          {
            selectable ?
              <nav className='tab tab-bottom leave-mgr-bottom'>
                <label className='leave-mgr-select-all'>
                  <input type="checkbox" value="" onChange={this.toggleSelectAll} />
                </label>
                <div className='row'>
                  <div className='col-1-2'>
                    <Button text={getLang('SUBMIT')} onTouchTap={this.submit} />
                  </div>
                  <div className='col-1-2'>
                    <Button text={getLang('DROP')} hollow className='text-primary' onTouchTap={this.drop} />
                  </div>
                </div>
              </nav> : null
          }
        </CSSTransitionGroup>

        {!selectable && <Tab items={[
          {
            text: getLang('LEAVE_QUOTA'),
            name: 'my-leave/leave-quota',
            icon: 'calendar'
          },
          {
            text: getLang('MY_APPLY'),
            name: 'my-leave/leave-list',
            icon: 'plane'
          },
          {
            text: getLang('LEAVE_SUMMARY'),
            name: 'my-leave/leave-summary',
            icon: 'pie-chart'
          }
        ]} bottom />}
      </div>
    );
  }


  /**
   * Get employees' leave records (parameters)
   * @param params
   */
  getEmpLeaveRecords(params = {}) {
    params.page = 1;
    params.loadMore = false;
    params.state || (params.state = 'edit');

    dispatch({
      type: this._type,
      data: params
    });
  }


  /**
   * Load next page
   */
  loadMore() {
    dispatch({
      type: this._type,
      data: {
        loadMore: true
      }
    });
  }


  /**
   * Update filter
   * @param type
   * @param choice
   */
  filter(type, choice) {
    this.getEmpLeaveRecords({ type, choice });
  }

  /**
   * Test if an item is selectable
   * @param {Object} item
   */
  select(item) {
    return true;
  }

  toggleSelect(record) {
    console.log(record);
  }

  toggleEnterMode() {
    dispatch({
      type: 'toggle-leave-record-selectable'
    });
  }

  submit() {
    const inputs = [].slice.call(document.querySelectorAll('[type=checkbox]'))
      .filter(check => check.checked)
      .map(check => check.value);

    ajax.post('/ess-submit-lv', {
      idList: inputs.join()
    })
      .then(() => {
        location.reload();
      });
  }

  drop() {
    const inputs = [].slice.call(document.querySelectorAll('[type=checkbox]'))
      .filter(check => check.checked)
      .map(check => check.value);

    ajax.post('/ess-drop-lv', {
      idList: inputs.join()
    })
      .then(() => {
        location.reload();
      });
  }

  selectUser(id) {
    location.hash = 'my-leave/leave-list/' + id;
  }
}
