/**
 * Overtime Employee List
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


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
			page: 1
		});
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
