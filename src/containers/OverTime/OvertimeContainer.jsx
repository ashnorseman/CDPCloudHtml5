/**
 * Overtime
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';

import Button from '../../components/Button/Button.jsx';
import Form from '../../components/Form/Form.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import PageOpener from '../../components/PageOpener/PageOpener.jsx';
import Tab from '../../components/Tab/Tab.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


const tabSettings = [
  {
    text: getLang('MY_APPLY'),
    name: 'my-ot/list',
    icon: 'clock-o'
  },
  {
    text: getLang('OT_SUMMARY'),
    name: 'my-ot/summary',
    icon: 'pie-chart'
  }
];


class Overtime extends Component {

  static getStores() {
    return [OvertimeStore];
  }

  static calculateState() {
    return OvertimeStore.getState();
  }


	/**
	 * 打开申请框
	 * @param e
	 */
  openApply(e) {
    this.refs.apply.open(e);

    if (!this.state.otForm || !this.state.otForm.length) {
      OvertimeDataUtils.getOtForm();
    }
  }


	/**
	 * 新增表单
	 * - save: { submit: false}
	 * - submit: { submit: true }
	 * @param submitValue
	 */
	insert(submitValue) {
		const formData = this.collectFormData(submitValue);

		if (!formData) return;

		OvertimeDataUtils.insertOt(formData);
  }


	/**
	 * 若表单合法, 返回 formData
	 * 若不合法, 返回 false
	 * @param {boolean} submitValue
	 * @returns {boolean|*}
	 */
	collectFormData(submitValue) {
		const form = this.refs.applyForm,
					valid = form.isValid() && window.leaveValidation && window.leaveValidation(),
					formData = new FormData(React.findDOMNode(form));

		formData.append('submit', submitValue);

		return valid && formData;
	}


	/**
	 * 关闭申请框, 并清除数据
	 */
	closeFormAndRefreshList() {
		const inputs = React.findDOMNode(this.refs.applyForm).querySelectorAll('input, select, textarea');

		for (let i = 0; i < inputs.length; i += 1) {
			inputs[i].value = '';
		}

		this.refs.apply.close();
	}


  render() {
    const {
			otForm,
			refreshList,
      status,
			submitting
    } = this.state;

		if (refreshList) {
			this.closeFormAndRefreshList();
		}

    return (
      <div className='bottom-gap'>
        {this.props.children}

        <Tab items={tabSettings} bottom />

        <Button icon='pencil' action onClick={::this.openApply} />

        <PageOpener ref='apply'>
          <Loader status={status}>
            <Form className='side-gap pad-b'
                  controls={otForm}
                  ref='applyForm' />

            <div className="row">
              <div className="col-1-2">
                <Button type='button'
												disabled={submitting}
                        text={getLang('SAVE')}
                        onClick={this.insert.bind(this, false)} />
              </div>
              <div className="col-1-2">
                <Button type='button'
												disabled={submitting}
												text={getLang('SUBMIT')}
                        onClick={this.insert.bind(this, true)} />
              </div>
            </div>
          </Loader>
        </PageOpener>
      </div>
    );
  }
}


export default Container.create(Overtime);
