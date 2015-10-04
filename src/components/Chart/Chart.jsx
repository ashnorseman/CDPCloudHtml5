/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import './chart.less';

import React, { Component } from 'react';
import ChartJs from '../../../bower_components/Chart.js/Chart.min.js';


export default class Chart extends Component {

  componentDidMount() {
    const ctx = React.findDOMNode(this.refs.chart).getContext('2d');

    const myNewChart = new ChartJs(ctx).Pie(this.props.data, {
      legendTemplate : '<ul class="chart-legend">' +
          '<% for (var i = 0; i < segments.length; i+=1) { %>' +
            '<li>' +
              '<span class="chart-label" style="background-color: <%= segments[i].fillColor %>"></span>' +
              '<% if (segments[i].label) { %><%= segments[i].label + ": " + segments[i].value %><% } %>' +
            '</li>' +
          '<% } %>' +
        '</ul>'
    });

    const legend = document.createElement('div');

    legend.innerHTML = myNewChart.generateLegend();

    React.findDOMNode(this.refs.legend).appendChild(legend.firstChild);
  }

  render() {
    const { height } = this.props;

    return (
      <div className='row'>
        <div className='col-3-5'>
          <canvas ref='chart' style={{ width: '100%', height: height }}></canvas>
        </div>
        <div className='col-2-5' ref='legend'></div>
      </div>
    );
  }
}