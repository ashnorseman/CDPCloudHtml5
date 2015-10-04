/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';


class SalaryStore extends ReduceStore {

  getInitialState() {
    return {};
  }

  reduce(state, action) {
    return state;
  }
}


export default new SalaryStore(Dispatcher);