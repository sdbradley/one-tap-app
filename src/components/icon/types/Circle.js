import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Circle({ className, ...props }) {
  let classes = classNames(
    'Circle',
    className
  );

  return (
    <SVGIcon type='circle' className={classes} {...props}>
      <path d="M500,35.43c-256.57,0-464.57,208-464.57,464.57S243.43,964.57,500,964.57,964.57,756.57,964.57,500,756.57,35.43,500,35.43Zm0,832.84c-203.39,0-368.27-164.88-368.27-368.27S296.61,131.73,500,131.73,868.27,296.61,868.27,500,703.39,868.27,500,868.27Z"/>
    </SVGIcon>
  )
}
