import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router';
import { connect } from 'react-redux';
import { viewModal } from 'actions/modal';
import classNames from 'classnames';
import Icon from 'components/icon';
import { join } from 'util/path';

function resolveTo(to) {
  // Naive relative support
  if (to && to[0] !== '/') {
    to = join(window.location.hash.replace(/^#/, ''), to);
  }
  return to;
}

class Link extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(...args) {
    let {
      onClick,
      modal,
      viewModal,
      subRouteActivated, // eslint-disable-line
      icon, // eslint-disable-line
      children, // eslint-disable-line
      className, // eslint-disable-line
      ...payload
    } = this.props;

    if (onClick) {
      onClick(...args);
    }

    if (modal) {
      viewModal(modal, payload);
    }
  }

  isActive() {
    let check = `#${this.props.to}`;
    return this.props.subRouteActivated ? (window.location.hash.substring(0, check.length) === check) : (window.location.hash === check);
  }

  getLinkClass() {
    return (
      classNames(
        'Link',
        this.props.className,
        {
          'Link--classic': this.props.classic,
          'Link--blue': this.props.blue,
          'Link--black': this.props.black,
          'Link--icon': this.props.icon,
          'Link--full': this.props.full,
          'Link--active': this.isActive()
        },
      )
    );
  }

  render() {
    if (this.props.hard || this.props.download) {
      return this.renderHardLink();
    }
    return this.renderRouterLink();
  }

  renderHardLink() {
    let {
      to,
      title,
      id,
      download,
      ...props
    } = this.props;

    return (
      <a
        className={this.getLinkClass()}
        href={to}
        title={title}
        id={id}
        download={download}
      >
        {this.renderIcon()}
        <span className="Link-label">
          {props.children}
        </span>
      </a>
    );
  }

  renderRouterLink() {
    let {
      to,
      activeClassName,
      activeStyle,
      onlyActiveOnIndex,
      title,
      id,
      ...props
    } = this.props;

    to = resolveTo(to);
    return (
      <RouterLink
        className={this.getLinkClass()}
        onClick={this.handleClick}
        to={to}
        activeClassName={activeClassName}
        activeStyle={activeStyle}
        onlyActiveOnIndex={onlyActiveOnIndex}
        title={title}
        id={id}
      >
        {this.renderIcon()}
        <span className="Link-label">
          {props.children}
        </span>
      </RouterLink>
    );
  }

  renderIcon() {
    if (this.props.icon) {
      return (
        <Icon
          className='Link-icon'
          type={this.props.icon}
          inline
          interactive={false}
        />
      );
    }
    return null;
  }
}

export default connect(null, { viewModal})(Link)
