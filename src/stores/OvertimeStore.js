/**
 * Created by AshZhang on 2016-4-5.
 */


import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';


class OvertimeStore extends ReduceStore {
	
	getInitialState() {
		return {};
	}

	reduce(state, action) {
		switch (action.type) {
		case 'get-emp-ot-list':
			return {
				...state,
				empOtListQuery: action.data,
				status: 'loading'
			};
		case 'get-emp-ot-list-success':
			return {
				...state,
				empOtList: state.empOtListQuery.page === 1 ? action.data : state.empOtList.concat(action.data),
				status: 'loaded'
			};
		case 'get-emp-ot-record':
			return {
				...state,
				status: 'loading'
			};
		case 'get-emp-ot-record-success':
			return {
				...state,
				empOtRecord: action.data,
				status: 'loaded'
			};
		case 'get-emp-ot-summary':
			return {
				...state,
				status: 'loading'
			};
		case 'get-emp-ot-summary-success':
			return {
				...state,
				empOtSummary: action.data,
				status: 'loaded'
			};
		case 'get-ot-form':
			return {
				...state,
				status: 'loading'
			};
		case 'get-ot-form-success':
			return {
				...state,
				otForm: action.data.formConfig,
				status: 'loaded'
			};
		case 'insert-ot-form':
			return {
				...state,
				submitting: true
			};
		case 'insert-ot-form-success':
			return {
				...state,
				submitting: false,
				refreshList: true
			};
		default:
			return state;
		}
	}
}


export default new OvertimeStore(Dispatcher);
