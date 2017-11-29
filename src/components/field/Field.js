import React, { Component } from 'react';
import * as types from './types';
import FieldGroup from './FieldGroup';

let _MAX_ID = 0;
const genId = () => `field_${++_MAX_ID}`;

export default class Field extends Component {
  constructor({
    type,
    label,
    info,
    onFocus,
    onChange,
    value,
    id,
    name,
    errors,
    validation,
    uneditable,
    ...props
  } = {}) {
    super(arguments[0]);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    id = id || genId();
    this.state = {
      id,
      value,
      errors: [],
      name: name || id
    };
  }

  _errors() {
    return this.state.errors.concat(this.props.errors || []);
  }

  componentWillUpdate(newProps, newState) {
    if (newProps.value !== this.props.value) {
      this.handleChange(newProps.value)
    } else if (newState.value !== this.state.value && this.props.onChange) {
      this.props.onChange({
        name: this.state.name,
        id: this.state.id,
        value: newState.value,
        isValid: this._errors().length = 0,
        oldValue: this.state.value
      });
    }
  }

  handleChange(newValue) {
    if (this.props.uneditable) {
      return this.state.value;
    }

    let errors = [];
    if (this.props.validation) {
      try {
        this.props.validation(newValue);
      } catch (e) {
        errors.push(e);
      }
    }

    this.setState({
      value: newValue,
      errors
    });

    return newValue;
  }

  handleFocus(...args) {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  }

  handleBlur(...args) {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(...args);
    }
  }

  render() {
    let Type = types[this.props.type];

    if (!Type) {
      throw new Error(`Missing Field: No field with type ${this.props.type}`);
    }

    if (Type.omitFieldGroup) {
      return <Type {...this.props}/>;
    }

    let {
      className,
      onFocus, // eslint-disable-line
      onBlur, // eslint-disable-line
      ...props
    } = this.props;

    let errors = this.state.focused ? [] : this._errors();
    return (
      <FieldGroup
        className={className}
        type={this.props.type}
        label={this.props.label}
        info={this.props.info}
        id={this.state.id}
        name={this.state.name}
        inline={this.props.inline}
        errors={errors}
      >
        <Type
          {...props}
          id={this.state.id}
          name={this.state.name}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={this.state.value}
          errors={errors}
          uneditable={this.props.uneditable}
        />
      </FieldGroup>
    );
  }
}
