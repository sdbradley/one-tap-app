import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TextField from './TextField';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class DateField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    date = date && date.isValid && date.isValid() ? date.format('MM/DD/YYYY') : date;
    this.props.onChange(date);
  }

  render() {
    return (
      <DatePicker
        customInput={<TextField {...this.props} passthroughEvent/>}
        selected={this.props.value && moment(this.props.value)}
        id={this.props.id}
        name={this.props.name}
        placeholderText={this.props.placeholder}
        onChange={this.handleChange}
        onChangeRaw={this.handleChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        value={this.props.value}
      />
    );
  }
}
