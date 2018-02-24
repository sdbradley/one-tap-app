import React from 'react';
import classNames from 'classnames';
import './button.scss';

export default function SGButton({
  classOverride,
  buttonText,
  onClick,
  full = false,
  small = false,
  large = false,
  submit = false,
  inverse = false,
  className = classOverride,
  children = buttonText
} = {}) {
  let classes = classNames(
    'SGButton',
    className,
    {
      'SGButton--fullWidth': full,
      'SGButton--small': small,
      'SGButton--large': large,
      'SGButton--inverse': inverse
    }
  );

  return(
    <button
      className={classes}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
