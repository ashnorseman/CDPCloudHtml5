/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import UserList from '../../components/UserList/UserList.jsx';
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

		OvertimeDataUtils.getTeamMembers({
			page: 1
		});
	}

	loadMore() {
		OvertimeDataUtils.getTeamMembers({
			page: this.state.otHistoryQuery.page + 1
		});
	}

	selectUser(id) {
		location.hash = '/ot-mgr/history/' + id;
	}

	render() {
		const {
			otHistoryEmpList = [],
			status = 'loading'
		} = this.state;

		return (
			<PullLoader className='side-gap gap-t pad-b'
									status={status}
									onLoad={::this.loadMore}>
				<UserList userList={otHistoryEmpList}
									onSelectUser={this.selectUser} />
			</PullLoader>
		);
	}
}


export default Container.create(OvertimeMgrHistory);
