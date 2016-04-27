/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Button from '../../components/Button/Button.jsx';
import FormControl from '../../components/FormControl/FormControl.jsx';
import Select from '../../components/Select/Select.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

import Loader from '../../components/Loader/Loader.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';


class LeaveQuota extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);
    this.querySummary = this.querySummary.bind(this);
  }

  componentDidMount() {
    LeaveDataUtils.getLeaveSummary();
    LeaveDataUtils.getLeaveTypes();
  }

  querySummary() {
    LeaveDataUtils.getLeaveSummary(null, new FormData(React.findDOMNode(this.refs.query)));
  }

  render() {
    const { leaveSummary, leaveTypes, status } = this.state;

    if (leaveTypes[0] && leaveTypes[0].text) {
      leaveTypes.unshift({
        text: '',
        value: ''
      });
    }

    return (
      <div>
        <form ref="query">
          <div className="row">
            <div className='col-1-2'>
              <FormControl label={getLang('TYPE')}>
                <Select options={leaveTypes}
                        name='type'
                        id='type'
                        onChange={this.onDateChange} />
              </FormControl>
            </div>
            <div className='col-1-2'>
              <FormControl label={getLang('STATUS')}>
                <Select options={[
                          {
                            text: '编辑中',
                            name: 'edit'
                          },
                          {
                            text: '审批中',
                            name: 'approving'
                          },
                          {
                            text: '已审批',
                            name: 'approved'
                          },
                          {
                            text: '已拒绝',
                            name: 'rejected'
                          }
                        ]}
                        name='status'
                        id='status'
                        onChange={this.onDateChange} />
              </FormControl>
            </div>
          </div>

          <div className="row">
            <div className="col-1-4">
              <label className="form-label-static">{getLang('APP_DATE')}</label>
            </div>
            <div className='col-3-8'>
              <TextInput name="appDateStart"
                         id="appDateStart"
                         type='date' />
            </div>
            <div className='col-3-8'>
              <TextInput name="appDateEnd"
                         id="appDateEnd"
                         type='date' />
            </div>
          </div>

          <div className="row">
            <div className="col-1-4">
              <label className="form-label-static">{getLang('START_DATE')}</label>
            </div>
            <div className='col-3-8'>
              <TextInput name="startDateStart"
                         id="startDateStart"
                         type='date' />
            </div>
            <div className='col-3-8'>
              <TextInput name="startDateEnd"
                         id="startDateEnd"
                         type='date' />
            </div>
          </div>

          <div className="row">
            <div className="col-1-4">
              <label className="form-label-static">{getLang('END_DATE')}</label>
            </div>
            <div className='col-3-8'>
              <TextInput name="endDateStart"
                         id="endDateStart"
                         type='date' />
            </div>
            <div className='col-3-8'>
              <TextInput name="endDateEnd"
                         id="endDateEnd"
                         type='date' />
            </div>
          </div>

          <div className="gap-t side-gap">
            <Button type='button'
                    text={getLang('SUBMIT')}
                    onTouchTap={this.querySummary} />
          </div>
        </form>

        <Loader status={status} className='side-gap gap-t-lg pad-b'>
          {
            Array.isArray(leaveSummary) && leaveSummary.map((item, index) => {
              return <InfoCard title={item.title} items={item.items} key={index} />;
            })
          }
        </Loader>
      </div>
    );
  }
}


export default Container.create(LeaveQuota);
