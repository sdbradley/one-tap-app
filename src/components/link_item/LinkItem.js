import React, { Component } from 'react';
import Link from 'components/link';
import { connect } from 'react-redux';
import classNames from 'classnames';

class LinkItem extends Component {

  render() {
    return (
        <li className='headerLink-item'>
        <Link hard={this.props.hard} to={this.props.headerLink} className={this.getLinkClass()}>
            <span className='icon'>
            <i className={`fa ${this.props.iconName}`} />
            </span>
            {this.props.title}
        </Link>
        </li>
    );
  }

  isActive() {
    let check = `#${this.props.to}`;
    return (window.location.hash === check);
  }

  getLinkClass() {
    return (
      classNames(
        'headerLink',
        this.props.className,
        {
          'headerLink--Active': this.isActive()
        },
      )
    );
  }
}

export default connect(null, null)(LinkItem)
