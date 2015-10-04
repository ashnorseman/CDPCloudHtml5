/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import './search.less';

import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Button from '../Button/Button.jsx';
import FormControl from '../FormControl/FormControl.jsx';
import TextInput from '../TextInput/TextInput.jsx';


export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidUpdate() {
    const search = React.findDOMNode(this.refs.search);
    const input = search && search.querySelector('input');

    if (input) {
      setTimeout(() => {
        input.focus();
      }, 0);
    }
  }

  render() {
    const { opened } = this.state,
          { placeholder } = this.props;

    return (
      <div className='search'>
        {
          !opened
            ? <Button className='search-toggle' icon='search'
                      onTouchTap={this.open}></Button>
            : null
        }
        <CSSTransitionGroup component='div' transitionName='search'>
          {
            opened
              ?
                <FormControl className='search-text'>
                  <TextInput ref='search' icon='search' placeholder={placeholder}
                             onBlur={this.search} />
                  <Button className='search-close' icon='times' onTouchTap={this.close}></Button>
                </FormControl>
              : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }


  /**
   * Toggle open status
   */
  open() {
    this.setState({
      opened: true
    });
  }


  /**
   * Close a search
   */
  close() {
    this.setState({
      opened:false
    });
  }


  /**
   * Search event
   * @param {Event} e
   */
  search(e) {
    if (!e.target.value) return;

    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch.call(this, e.target.value);
    }
  }
}