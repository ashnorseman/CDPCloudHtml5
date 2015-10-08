/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import { getItem as getLang } from '../common/lang';
import Loader from '../components/Loader/Loader.jsx';
import Header from '../components/Header/Header.jsx';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import FormControl from '../components/FormControl/FormControl.jsx';
import Select from '../components/Select/Select.jsx';
import InfoCard from '../components/InfoCard/InfoCard.jsx';
import SalaryStore from '../stores/SalaryStore';


const defaultYear = new Date().getFullYear(),
      defaultMonth = new Date().getMonth() + 1,
      yearList = (function (year) {
        let list = [];

        for (let y = year - 4; y <= year; y += 1) {
          list.push({
            text: y,
            value: y
          });
        }

        return list;
      }(defaultYear)),
      monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
        return {
          text: month,
          value: month
        };
      });


class Salary extends Component {

  constructor(props) {
    super(props);
    this.getSalary = this.getSalary.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.getSalary(defaultYear, defaultMonth);
  }

  static getStores() {
    return [SalaryStore];
  }

  static calculateState() {
    return SalaryStore.getState();
  }

  render() {
    const { total, infoList, basicInfo, status } = this.state;

    return (
      <div>
        <Header back title={getLang('MY_SALARY')} />

        <UserInfo className='gap-t-lg gap-b-lg side-gap' userInfo={basicInfo} />

        <div className='row gap-t'>
          <div className='col-1-2'>
            <FormControl label={getLang('YEAR')}>
              <Select className='text-primary' defaultValue={defaultYear} options={yearList}
                      ref='year' onChange={this.onDateChange} />
            </FormControl>
          </div>
          <div className='col-1-2'>
            <FormControl label={getLang('MONTH')}>
              <Select className='text-primary' defaultValue={defaultMonth} options={monthList}
                      ref='month' onChange={this.onDateChange} />
            </FormControl>
          </div>
        </div>

        <Loader status={status} className='side-gap'>
          <div className='gap-t-lg gap-b'>
            {getLang('ACTUAL_SALARY') + getLang('COLON')}
            <span className='text-xl text-primary'>{total}</span>
          </div>

          {
            infoList.map((card, index) => {
              return <InfoCard title={card.title} items={card.items} key={index} />;
            })
          }
        </Loader>
      </div>
    );
  }


  /**
   * Get salary information
   * @param {number} year
   * @param {number} month
   */
  getSalary(year, month) {
    dispatch({
      type: 'get-salary',
      data: {
        year, month
      }
    });
  }


  /**
   * Re-fetch salary info when year and month changes
   */
  onDateChange() {
    dispatch({
      type: 'get-salary',
      data: {
        year: React.findDOMNode(this.refs.year).value,
        month: React.findDOMNode(this.refs.month).value
      }
    });
  }
}


export default Container.create(Salary);