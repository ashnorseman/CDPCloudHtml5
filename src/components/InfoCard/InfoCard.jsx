/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import './infoCard.less';

import React, { Component } from 'react';


export default class InfoCard extends Component {

  render() {
    const { title, items = [] } = this.props;

    return (
      <section className='info-card'>
        {
          title ? <h1 className='info-card-title'>{title}</h1> : null
        }
        <ul>
          {
            items.map((item, index) => {
              return (
                <li className='info-card-item clearfix' key={index}>
                  <span className='info-card-name'>{item.name}</span>
                  <span className='info-card-value'>{item.value}</span>
                </li>
              );
            })
          }
        </ul>
      </section>
    );
  }
}