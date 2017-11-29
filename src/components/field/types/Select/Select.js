import React, { Component } from 'react';
import classNames from 'classnames';
import Options from '../Options';
import Icon from 'components/icon';

export default class Select extends Component {
  // @todo: This needs to be reconfigured for a11y
  constructor(props) {
    super(props);
    this.renderSelect = this.renderSelect.bind(this);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.state = {
      open: false
    };
  }

  toggle(e) {
    e.preventDefault();
    if (this.state.open) {
      this.blur();
    } else {
      this.focus();
    }
  }

  focus() {
    this.setState({
      open: true
    });
  }

  blur() {
    if (this.focusable) {
      this.focusable.blur();
    } 
    this.setState({
      open: false
    });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.open !== this.state.open) {
      if (nextState.open) {
        window.addEventListener('mousedown', this.blur);
      } else {
        window.removeEventListener('mousedown', this.blur);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.blur);
  }

  handleChange(...args) {
    this.props.onChange(...args);
    this.blur();
  }

  handleRef(focusable) {
    this.focusable = focusable;
  }

  render() {
    return <Options {...this.props} render={this.renderSelect} renderOption={this.renderOption} onChange={this.handleChange}/>;
  }

  renderSelect({ selected, renderOptions }) {
    return (
      <div
        className={classNames('Select', {'Select--open': this.state.open, 'Select--dropLink': this.props.dropLink})}
        tabIndex="0"
        onMouseDown={this.stopPropagation}
        onFocus={this.focus}
        ref={this.handleRef}
      >
        <input type="hidden" name={this.props.name} value={selected.value} id={this.props.id} onFocus={this.focus}/>
        {this.renderOption({ ...selected, handleClick: this.focus, isLabel: true })}
        {this.renderDropDown(renderOptions)}
        {this.renderToggle()}
      </div>
    );
  }

  renderSelected(selected) {
    return <span>
      {selected.label}
    </span>;
  }

  renderDropDown(renderOptions) {
    return this.state.open
      ? (
        <ul className="Select-options Select-options--teachers">{renderOptions()}</ul>
      )
      : null;
  }

  renderToggle() {
    let direction = {
      [this.props.dropLink ? 'right' : 'down']: !this.state.open,
      [this.props.dropLink ? 'down'  : 'up']: this.state.open
    };

    return (
      <div className="Select-toggle" onMouseDown={this.toggle}><Icon className="Select-chevron" type="chevron" {...direction} /></div>
    );
  }

  renderOption({
    id,
    label,
    isSelected,
    isLabel,
    handleClick
  }) {
    return (
      <li
        key={id}
        className={classNames(
          'Select-option',
          {
            'Select-option--selected': isSelected,
            'Select-option--label': isLabel
          }
        )}
        onClick={handleClick}
      >
        {label}
      </li>
    );
  }
}
