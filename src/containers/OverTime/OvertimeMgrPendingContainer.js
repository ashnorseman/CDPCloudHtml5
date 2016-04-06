/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeMgrPending extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getPendingRecords({
			page: 1
		});
	}

	loadMore() {
		OvertimeDataUtils.getPendingRecords({
			page: this.state.pendingQuery.page + 1
		});
	}

	render() {
		const {
			pendingRecords = [],
			status = 'loading'
		} = this.state;

		return (
			<PullLoader className='side-gap'
									status={status}
									onLoad={::this.loadMore}>
				<RecordList recordList={pendingRecords}
										url='ot-record-mgr' />
			</PullLoader>
		);
	}
}


export default Container.create(OvertimeMgrPending);
