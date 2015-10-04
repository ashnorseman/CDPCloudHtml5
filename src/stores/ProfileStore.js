/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';


class ProfileStore extends ReduceStore {

  getInitialState() {
    return {};
  }

  reduce(state, action) {
    return state;
  }
}


export default new ProfileStore(Dispatcher);