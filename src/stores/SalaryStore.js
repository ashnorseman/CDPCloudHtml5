/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import SalaryDataUtils from '../data-utils/SalaryDataUtils';


class SalaryStore extends ReduceStore {

  getInitialState() {
    return {
      basicInfo: {},
      status: 'loading',
      total: 0,
      infoList: [],
      chartData: []
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'get-salary':
      SalaryDataUtils.getSalary(action.data);
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-salary-success':
      const infoList = action.data.infoList,
            chartList = infoList.reduce((list, item) => {
              return list.concat(item.items);
            }, []),
            chartData = chartList.map((item) => {
              item.label = item.name;
              return item;
            });

      return assign({}, state, action.data, {
        chartData,
        status: 'loaded'
      });
    }
    return state;
  }
}


export default new SalaryStore(Dispatcher);