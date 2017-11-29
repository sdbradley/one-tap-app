import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from 'components/icon';

export default class Toggle extends Component {
  static defaultProps = {
    on: 'On',
    off: 'Off',
    value: false
  };

  constructor({
    name,
    id,
    className,
    on = 'On',
    off = 'Off',
    value = false,
  }) {
    super(arguments[0]);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(!this.props.value);
    }
  }

  render () {
    let classes = classNames(
      'ToggleField',
      {
        'ToggleField--toggled': this.props.value
      },
      this.props.className
    );
    return (
      <div className={classes}>
        <Icon type='toggle' onClick={this.handleChange} className='ToggleField-icon' toggled={this.props.value}/>
        <label className="ToggleField-label ToggleField-label--off">{this.props.off}</label>
        <label className="ToggleField-label ToggleField-label--on">{this.props.on}</label>
      </div>
    );
  }
}
