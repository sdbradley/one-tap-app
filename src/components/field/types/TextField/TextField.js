import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from 'components/icon';

export default class TextField extends Component {
  constructor({
    name,
    id,
    value,
    className,
    errors,
    placeholder,
    uneditable = false,
    obscured = false,
    center = false,
    large = false,
    passthroughEvent = false
  }) {
    super(arguments[0]);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.state = {
      obscured: !!obscured
    };
  }

  handleToggle() {
    this.setState({
      obscured: !this.state.obscured
    });
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(this.props.passthroughEvent ? e : e.currentTarget.value);
    }
  }

  handleRef(element) {
    this.element = element;
  }

  focus() {
    if (this.element) this.element.focus();
  }

  render () {
    let classes = classNames(
      'TextField',
      this.props.className,
      {
        'TextField--error': this.props.errors && this.props.errors.length,
        'TextField--readOnly': this.props.uneditable,
        'TextField--center': this.props.center,
        'TextField--large': this.props.large
      }
    );
    return (
      <div className={classes}>
        {this.renderInput()}
        {this.renderPlaceholder()}
        {this.renderObscurityToggle()}
      </div>
    );
  }

  renderInput() {
    return this.props.uneditable
      ? (
        <div className="TextField-input">
          <input type="hidden" name={this.props.name} value={this.props.value}/>
          {this.props.value}
        </div>
      )
      : (
        <input
          className="TextField-input"
          value={this.props.value || ''}
          type={this.state.obscured ? 'password' : 'text'}
          name={this.props.name}
          id={this.props.id}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onClick={this.props.onClick}
          onKeyDown={this.props.onKeyDown}
          ref={this.handleRef}
        />
      );
  }

  renderPlaceholder() {
    if (this.props.placeholder && !this.props.value) {
      return <label htmlFor={this.props.id} className="TextField-placeholder">{this.props.placeholder}</label>
    }
    return null;
  }

  renderObscurityToggle() {
    if (this.props.obscured === 'toggle') {
      return (
        <Icon type='eye' className='TextField-toggle' onClick={this.handleToggle} off={this.state.obscured}/>
      );
    }
    return null;
  }
}
