/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import UserList from '../../components/UserList/UserList.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeMgrSummary extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getSummaryMembers({
			page: 1
		});
	}

	loadMore() {
		OvertimeDataUtils.getSummaryMembers({
			page: this.state.summaryQuery.page + 1
		});
	}

	selectUser(id) {
		location.hash = '/ot-summary-mgr/' + id;
	}

	render() {
		const {
			summaryList = [],
			status = 'loading'
		} = this.state;

		return (
			<PullLoader className='pad-b'
									status={status}
									onLoad={::this.loadMore}>
				<UserList userList={summaryList}
									onSelectUser={this.selectUser} />
			</PullLoader>
		);
	}
}


export default Container.create(OvertimeMgrSummary);
