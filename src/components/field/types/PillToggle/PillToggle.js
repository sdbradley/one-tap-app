import React, { Component } from 'react';
import classNames from 'classnames';
import Options from '../Options'

export default class PillToggle extends Component {
  // @todo: This needs to be reconfigured for a11y
  render() {
    return <Options {...this.props} render={this.renderToggle} renderOption={this.renderOption} />;
  }

  renderToggle({ renderOptions }) {
    return <ul className='PillToggle'>{renderOptions()}</ul>;
  }

  renderOption({
    id,
    label,
    isSelected,
    handleClick
  }) {
    return (
      <li
        key={id}
        className={classNames('PillToggle-option', { 'PillToggle-option--selected': isSelected })}
        onClick={handleClick}
      >
        {label}
      </li>
    );
  }
}
