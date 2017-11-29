import React, { Component } from 'react';
import Errors from 'components/errors';
import classNames from 'classnames';

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.catchError = this.catchError.bind(this);
    this.state = {
      errors: props.errors
    };
  }

  componentWillUpdate(props) {
    if (props.errors !== this.props.errors) {
      this.setState({
        errors: props.errors
      })
    }
  }

  values() {
    // Get the values as an object<fieldName => fieldValue>
    return Array.prototype.slice.call(this.refs.form.elements).filter(
      field => field.name && !field.disabled
    ).reduce(
      (vals, field) => {
        vals[field.name] = field.value;
        return vals;
      },
      {}
    );
  }

  catchError(e) {
    this.setState({
      errors: [e.message || 'An error occurred']
    })
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.currentTarget.name, e.currentTarget.value);
    }
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ errors: [] })

    if (this.props.onSubmit) {
      try {
        let t = this.props.onSubmit(this.values());
        if (t && t.then && this.props.onSuccess) {
          t.then(this.props.onSuccess)
        }
        if (t && t.catch) {
          t.catch(this.catchError);
        }
      } catch (e) {
        this.catchError(e);
      }
    }
  }

  render() {
    return (
      <form
        className={classNames('Form', this.props.className)}
        onSubmit={this.handleSubmit}
        ref='form'
      >
        {this.renderTopErrors()}
        {this.props.children}
        {this.renderBottomErrors()}
      </form>
    );
  }

  renderErrors() {
    return (
      <Errors className='Form-errors' messages={this.state.errors} />
    );
  }

  renderTopErrors() {
    if (this.props.errorsOnTop) {
      return this.renderErrors();
    }
  }

  renderBottomErrors() {
    if (!this.props.errorsOnTop) {
      return this.renderErrors();
    }
  }
}
