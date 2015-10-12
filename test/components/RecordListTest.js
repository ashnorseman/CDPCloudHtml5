/**
 * Created by AshZhang on 15/10/10.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import RecordList from '../../src/components/RecordList/RecordList.jsx';


describe('Record list', () => {
  const recordList = [
    {
      id: 1,
      name: '张阿十',
      time: '2015/08/05 10:30 – 2015/08/05 18:00',
      status: 2
    },
    {
      id: 2,
      name: '张阿廿',
      time: '2015/08/05 10:30 – 2015/08/05 18:00',
      status: 3
    }
  ];

  it('renders a record list', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <RecordList recordList={recordList} url='leave-record'></RecordList>
          ),
          records = React.findDOMNode(instance);

    expect(records.nodeName).toEqual('UL');
    expect(records.querySelectorAll('.record-item').length).toEqual(2);
    expect(records.querySelectorAll('.record-item')[0].href).toEqual(document.baseURI + '#/leave-record/1');
  });
});