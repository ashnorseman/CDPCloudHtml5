/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Loader from '../../components/Loader/Loader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeHistoryDetail extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getHistoryDetail(this.props.routeParams.id);
	}

	render() {
		const {
			otHistoryDetail = [],
			status = 'loading'
		} = this.state;

		return (
			<Loader className='side-gap'
							status={status}>
				<RecordList recordList={otHistoryDetail} />
			</Loader>
		);
	}
}


export default Container.create(OvertimeHistoryDetail);
