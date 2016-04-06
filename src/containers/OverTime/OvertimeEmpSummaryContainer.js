/**
 * Created by AshZhang on 2016-4-5.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeEmpSummary extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getEmpOtSummary(this.props.routeParams.id);
	}

	render() {
		const {
			empOtSummary = [],
			status = 'loading'
		} = this.state;

		return (
			<Loader status={status} className='side-gap gap-t pad-b'>
				{
					empOtSummary.map((item, index) => {
						return (
							<div key={index}>
								<h2 className="info-card-heading gap-b">{item.title}</h2>
								<InfoCard items={item.items} />
							</div>
						);
					})
				}
			</Loader>
		);
	}
}


export default Container.create(OvertimeEmpSummary);
