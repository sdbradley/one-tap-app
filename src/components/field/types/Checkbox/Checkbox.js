import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from 'components/icon';

export default class Checkbox extends Component {
  static defaultProps = {
    on: true,
    off: false,
    large: false,
    small: false
  };

  constructor(props) {
    super(props);
    this.toggleValue = this.toggleValue.bind(this);
  }

  isChecked() {
    return this.props.value === this.props.on;
  }

  toggleValue() {
    this.props.onChange(this.isChecked() ? this.props.off : this.props.on);
  }

  render() {
    return (
      <div className={classNames('Checkbox', {'Checkbox--checked': this.isChecked(), 'Checkbox--large': this.props.large})} onClick={this.toggleValue}>
        <input type='hidden' name={this.props.name} value={this.props.value || this.props.off} id={this.props.id} onFocus={this.focus}/>
        <div className={classNames('Checkbox-control', {'Checkbox-control--small': this.props.small})}>{this.isChecked() ? <Icon className='Checkbox-check' type='check' interactive={false}/> : null}</div>
        <div className='Checkbox-label'>{this.props.label || this.props.children}</div>
      </div>
    );
  }
}
