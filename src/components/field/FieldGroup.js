import React, { Component } from 'react';
import Errors from 'components/errors';
import classNames from 'classnames';

export default class FieldGroup extends Component {
  _hasErrors() {
    return this.props.errors.length > 0;
  }

  render() {
    let classes = classNames(
      'FieldGroup',
      `FieldGroup--${this.props.type}`,
      this.props.className,
      {
        'FieldGroup--error': this._hasErrors(),
        'FieldGroup--inline': this.props.inline
      }
    );
    return (
      <div className={classes}>
        {this.renderLabel()}
        <div className="FieldGroup-field">
          {this.props.children}
        </div>
        <Errors messages={this.props.errors.map(message => `${this.props.label || this.props.name} ${message}`)} />
      </div>
    );
  }

  renderLabel() {
    return (this.props.label || this.props.info) && (
      <label className='FieldGroup-label' htmlFor={this.props.id}>{this.props.label} {this.renderInfo()}</label>
    )
  }

  renderInfo() {
    return this.props.info && (
      <span className="FieldGroup-info">{this.props.info}</span>
    );
  }
}
