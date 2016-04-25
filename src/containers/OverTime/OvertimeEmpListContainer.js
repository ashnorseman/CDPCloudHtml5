/**
 * Overtime Employee List
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


const stateDropdown = {
	items: [
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
	]
};


class OvertimeEmpList extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getEmpOtList({
			page: 1,
			state: 'edit'
		});

		stateDropdown.onClickItem = (state) => {
			OvertimeDataUtils.getEmpOtList({
				page: 1,
				state
			});
		};
	}


	/**
	 * 加载更多
	 */
	loadMore() {
		const currentQuery = this.state.empOtListQuery;

		OvertimeDataUtils.getEmpOtList({
			...currentQuery,
			page: currentQuery.page + 1
		});
	}

	select() {

	}

	toggleSelect() {

	}

	render() {
		const {
			empOtList = [],
			selectable,
			status = 'loading'
		} = this.state;

		return (
			<div>
				<Header
					back
					title={getLang('MY_OT')}
					dropdown={stateDropdown}
				/>

				<PullLoader className='side-gap'
										status={status}
										onLoad={::this.loadMore}>
					<RecordList recordList={empOtList}
											url={'/my-ot/record'}
											selectable={selectable && ::this.select}
											toggleSelect={::this.toggleSelect} />
				</PullLoader>
			</div>
		);
	}
}


export default Container.create(OvertimeEmpList);
