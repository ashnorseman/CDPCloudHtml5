/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { getItem as getLang } from '../../common/lang';

import Form from '../../components/Form/Form.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';

import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveMgrQuota extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  componentDidMount() {
    LeaveDataUtils.getSummaryFilters({
      type: 'FILTER_LV_SUMMARY'
    });
  }

  querySummary(page) {
    const form = new FormData(React.findDOMNode(this.refs.query));

    if (typeof page !== 'number') page = 1;

    form.append('page', page);

    this.page = page;

    LeaveDataUtils.getLeaveSummaryEmpList(form, page);

    this.refs.query.setState({
      submitting: false,
      disabled: false
    });
  }


  loadMore() {
    this.querySummary(this.page + 1);
  }


  render() {
    const { leaveEmpList, status, leaveSummaryConfig = []} = this.state;

    return (
      <div>
        <Form className="side-gap gap-t"
              ref="query"
              action="/lv-team-summary"
              controls={leaveSummaryConfig}
              submitButton={{ text: getLang('SUBMIT') }}
              onSubmit={::this.querySummary}>
        </Form>

        <PullLoader className='pad-b gap-t-lg pad-t-lg side-gap'
                    status={status}
                    style={{paddingBottom: 80}}
                    onLoad={::this.loadMore}>
          {
            Array.isArray(leaveEmpList) && leaveEmpList.map((item, index) => {
              return <div key={index}>
                <div className="summary-user-info">
                  <span>{item.userInfo.items[0].firField}</span>
                  <span className="summary-user-pos">{item.userInfo.items[0].secField}</span>
                </div>
                {
                  item.summaryInfo.items.map((item, index) => {
                    return <InfoCard title={item.title} items={item.items} key={index} />;
                  })
                }
              </div>;
            })
          }
        </PullLoader>
      </div>
    );
  }
}


export default Container.create(LeaveMgrQuota);
