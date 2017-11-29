import React, { Component, Children } from 'react';
import Icon from 'components/icon';
import classNames from 'classnames';

export default class NestedListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandable: !!Children.count(this.props.children),
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.expandable) {
      this.setState({open: !this.state.open});
    } else if (this.props.onSelect) {
      this.props.onSelect();
    }
  }

  render() {
    let open = this.props.open || this.state.open;
    return(
      <div className={classNames(
        'NestedListItem',
        this.props.className,
        {
          'NestedListItem--expandable': this.state.expandable,
          'NestedListItem--open': open,
          'NestedListItem--active': this.props.active
        }
      )}>
        <div className="NestedListItem-label" onClick={this.handleClick}>
          <div className="NestedListItem-left">{this.props.left}</div>
          <div className="NestedListItem-title">
            {this.props.titleIcon && <Icon type={this.props.titleIcon}/>}
            {this.props.label}
          </div>
          {this.state.expandable && <Icon className="NestedListItem-right" black type='chevron' right={!open}/>}
        </div>
        {open && <div className="NestedListItem-content">{this.props.children}</div>}
      </div>
    );
  }
}
