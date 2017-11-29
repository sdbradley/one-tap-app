import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function List({ className, ...props }) {
  let classes = classNames(
    'List',
    className
  );

  return (
    <SVGIcon type='list' className={classes} {...props}>
      <rect x="356.27" y="56.38" width="592.82" height="164.12"/>
      <rect x="356.27" y="399.94" width="592.82" height="164.12"/>
      <rect x="50.91" y="399.94" width="175.89" height="164.12"/>
      <rect x="50.91" y="56.38" width="175.89" height="164.12"/>
      <rect x="356.27" y="779.31" width="592.82" height="164.12"/>
      <rect x="50.91" y="779.31" width="175.89" height="164.12"/>
    </SVGIcon>
  )
}
