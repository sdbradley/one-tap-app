import React, { Component } from 'react';
import classNames from 'classnames';
import TextField from 'components/field/types/TextField';

const includesUppercase = (password) => /[A-Z]/.test(password);
const includesLowercase = (password) => /[a-z]/.test(password);
const sixCharacters = (password) => password.length >= 6;

export default class PasswordField extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.value || ''
    };
  }

  handleChange(e) {
    this.setState({
      value: e
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render () {
    let requirements = this.props.errors.length ? null : (
      <ul className="Password-requirements">
        <li className={classNames('Password-requirement', includesUppercase(this.state.value) && 'Password-requirement--met')}>Uppercase</li>
        <li className={classNames('Password-requirement', includesLowercase(this.state.value) && 'Password-requirement--met')}>Lowercase</li>
        <li className={classNames('Password-requirement', sixCharacters(this.state.value) && 'Password-requirement--met')}>6 characters</li>
      </ul>
    );

    return (
      <div className="Password">
        <TextField
          obscured='toggle'
          {...this.props}
          onChange={this.handleChange} />
        {requirements}
      </div>
    );
  }
}
