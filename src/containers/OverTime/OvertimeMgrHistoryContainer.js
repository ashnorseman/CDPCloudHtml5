/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import RecordList from '../../components/RecordList/RecordList.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeMgrHistory extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getHistoryList({
			page: 1
		});
	}

	loadMore() {
		OvertimeDataUtils.getHistoryList({
			page: this.state.otHistoryQuery.page + 1
		});
	}

	render() {
		const {
			otHistoryList = [],
			status = 'loading'
		} = this.state;

		return (
			<PullLoader className='side-gap gap-t pad-b'
									status={status}
									onLoad={::this.loadMore}>
				<RecordList recordList={otHistoryList} />
			</PullLoader>
		);
	}
}


export default Container.create(OvertimeMgrHistory);
