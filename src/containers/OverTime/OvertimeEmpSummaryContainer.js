/**
 * Created by AshZhang on 2016-4-5.
 */


import React, {Component} from 'react';
import {Container} from 'flux/utils';
import {getItem as getLang} from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Button from '../../components/Button/Button.jsx';
import FormControl from '../../components/FormControl/FormControl.jsx';
import Select from '../../components/Select/Select.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeEmpSummary extends Component {

  static getStores() {
    return [OvertimeStore];
  }

  static calculateState() {
    return OvertimeStore.getState();
  }

  constructor(props) {
    super(props);

    OvertimeDataUtils.getEmpOtSummary(this.props.routeParams.id);
  }

  render() {
    const {
        empOtSummary = [],
        status = 'loading'
    } = this.state;

    return (
        <div>
          <Header back title={getLang('MY_OT')}/>

          <form ref="query">
            <div className="row">
              <div className='col-1-2'>
                <FormControl label={getLang('TYPE')}>
                  <Select options={[]}
                          name='type'
                          id='type'/>
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
                          id='status'/>
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
                           type='date'/>
              </div>
              <div className='col-3-8'>
                <TextInput name="appDateEnd"
                           id="appDateEnd"
                           type='date'/>
              </div>
            </div>

            <div className="row">
              <div className="col-1-4">
                <label className="form-label-static">{getLang('START_DATE')}</label>
              </div>
              <div className='col-3-8'>
                <TextInput name="startDateStart"
                           id="startDateStart"
                           type='date'/>
              </div>
              <div className='col-3-8'>
                <TextInput name="startDateEnd"
                           id="startDateEnd"
                           type='date'/>
              </div>
            </div>

            <div className="row">
              <div className="col-1-4">
                <label className="form-label-static">{getLang('END_DATE')}</label>
              </div>
              <div className='col-3-8'>
                <TextInput name="endDateStart"
                           id="endDateStart"
                           type='date'/>
              </div>
              <div className='col-3-8'>
                <TextInput name="endDateEnd"
                           id="endDateEnd"
                           type='date'/>
              </div>
            </div>

            <div className="gap-t side-gap">
              <Button type='button'
                      text={getLang('SUBMIT')}
                      onTouchTap={this.querySummary}/>
            </div>
          </form>

          <Loader status={status} className='side-gap gap-t pad-b'>
            {
              empOtSummary.map((item, index) => {
                return (
                    <div key={index}>
                      <h2 className="info-card-heading gap-b">{item.title}</h2>
                      <InfoCard items={item.items}/>
                    </div>
                );
              })
            }
          </Loader>
        </div>
    );
  }
}


export default Container.create(OvertimeEmpSummary);
