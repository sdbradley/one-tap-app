import React, { Component } from 'react';
import classNames from 'classnames';
import Options from '../Options';
import Icon from 'components/icon';

export default class Radio extends Component {
  // @todo: This needs to be reconfigured for a11y
  constructor(props) {
    super(props);
    this.renderRadio = this.renderRadio.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  render() {
    return <Options {...this.props} render={this.renderRadio} renderOption={this.renderOption} uneditable={this.props.uneditable}/>;
  }

  renderRadio({ selected, renderOptions }) {
    return (
      <div className='Radio'>
        <input type="hidden" name={this.props.name} value={selected.value} id={this.props.id} onFocus={this.focus}/>
        {renderOptions()}
      </div>
    );
  }

  renderOption({
    id,
    label,
    isSelected,
    isLabel,
    metadata,
    handleClick,
    disabled,
    className,
    icon = 'check',
    color
  }) {
    return (
      <div key={id}>
        <div
          className={classNames(
            'Radio-option',
            {
              'Radio-option--selected': isSelected,
              'Radio-option--disabled': disabled,
              'Radio-option--withMetadata': metadata
            },
            className
          )}
          onClick={handleClick}
        >
          {this.renderMetadata(metadata)}
          {this.renderIcon(isSelected, icon, color)}
          {label}
        </div>
      </div>
    );
  }

  renderMetadata(metadata) {
    if (!metadata) return null;
    return (
      <span className="Radio-metadata">{metadata}</span>
    );
  }

  renderIcon(selected, icon, color) {
    return (
      <div className="Radio-icon">
        { selected ? <Icon type={icon} interactive={false} encircled/> : null}
      </div>
    );
  }
}
