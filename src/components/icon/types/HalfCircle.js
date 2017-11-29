import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function HalfCircle({ className, ...props }) {
  let classes = classNames(
    'HalfCircle',
    className
  );

  return (
    <SVGIcon type='halfCircle' className={classes} {...props}>
      <path d="M500,35.43c-256.57,0-464.57,208-464.57,464.57S243.43,964.57,500,964.57,964.57,756.57,964.57,500,756.57,35.43,500,35.43Zm0,832.84V131.73c203.39,0,368.27,164.88,368.27,368.27S703.39,868.27,500,868.27Z" />
    </SVGIcon>
  )
}
