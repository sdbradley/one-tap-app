import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Dock({ className, ...props }) {
  let classes = classNames(
    'Dock',
    className
  );

  return (
    <SVGIcon type='dock' className={classes} {...props}>
      <polygon points="513.54 455.89 233.37 736.06 233.37 536.03 190.13 536.03 190.13 809.87 463.97 809.87 463.97 766.63 263.94 766.63 544.11 486.46 513.54 455.89"/>
      <path d="M954,954V46H46V954ZM89.24,89.24H910.76V910.76H89.24Z"/>
    </SVGIcon>
  )
}
