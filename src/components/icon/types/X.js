import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function X({ className, ...props }) {
  let classes = classNames(
    'X',
    className
  );

  return (
    <SVGIcon type='x' className={classes} {...props}>
      <polygon points="950 128.02 871.98 50 500 421.98 128.02 50 50 128.02 421.98 500 50 871.98 128.02 950 500 578.02 871.98 950 950 871.98 578.02 500 950 128.02"/>
    </SVGIcon>
  )
}
