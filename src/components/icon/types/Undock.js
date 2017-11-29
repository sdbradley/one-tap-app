import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Undock({ className, ...props }) {
  let classes = classNames(
    'Undock',
    className
  );

  return (
    <SVGIcon type='undock' className={classes} {...props}>
      <polygon points="486.46 544.11 766.63 263.94 766.63 463.97 809.87 463.97 809.87 190.13 536.03 190.13 536.03 233.37 736.06 233.37 455.89 513.54 486.46 544.11"/>
      <path d="M46,46V954H954V46ZM910.76,910.76H89.24V89.24H910.76Z"/>
    </SVGIcon>
  )
}
