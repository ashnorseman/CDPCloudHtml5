/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Form from '../../components/Form/Form.jsx';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

import Loader from '../../components/Loader/Loader.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';


class LeaveQuota extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);
    this.querySummary = this.querySummary.bind(this);
  }

  componentDidMount() {
    // LeaveDataUtils.getLeaveSummary();
    // LeaveDataUtils.getLeaveTypes();
    LeaveDataUtils.getSummaryFilters({
      type: 'FILTER_LV_SUMMARY'
    });
  }

  querySummary() {
    LeaveDataUtils.getLeaveSummary(null, new FormData(React.findDOMNode(this.refs.query)));
    this.refs.query.setState({
      submitting: false,
      disabled: false
    });
  }

  render() {
    const {leaveSummary, status, leaveSummaryConfig = []} = this.state;

    return (
      <div>
        <Form className="side-gap"
              ref="query"
              action="/ess-lv-summary"
              controls={leaveSummaryConfig}
              submitButton={{ text: getLang('SUBMIT') }}
              onSubmit={this.querySummary.bind(this)}>
        </Form>

        <div style={{minHeight: '100vh'}}>
          <Loader status={status} className='side-gap gap-t-lg pad-b'>
            {
              Array.isArray(leaveSummary) && leaveSummary.map((item, index) => {
                return <InfoCard title={item.title} items={item.items} key={index}/>;
              })
            }
          </Loader>
        </div>
      </div>
    );
  }
}


export default Container.create(LeaveQuota);
