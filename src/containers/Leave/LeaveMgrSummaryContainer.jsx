/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { getItem as getLang } from '../../common/lang';

import Form from '../../components/Form/Form.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import UserList from '../../components/UserList/UserList.jsx';

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

  querySummary() {
    LeaveDataUtils.getLeaveSummary(null, new FormData(React.findDOMNode(this.refs.query)));

    this.refs.query.setState({
      submitting: false,
      disabled: false
    });
  }

  getTeamMembers(query = {}) {
    query.page = 1;
    query.pageSize = 16;
    query.loadMore = false;

    LeaveDataUtils.getLeaveSummaryEmpList(query);
  }


  loadMore({ page = 1, ...props } = {}) {
    LeaveDataUtils.getLeaveSummaryEmpList({
      page: page + 1,
      ...props,
      loadMore: true
    });
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

        <PullLoader className='pad-b'
                    status={status}
                    onLoad={this.loadMore}>
          <UserList userList={leaveEmpList} />
        </PullLoader>
      </div>
    );
  }
}


export default Container.create(LeaveMgrQuota);
