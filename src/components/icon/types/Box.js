import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Box({ className, ...props }) {
  let classes = classNames(
    'Box',
    className
  );

  return (
    <SVGIcon type='box' className={classes} {...props}>
      <path d="M500,374.76l382.7-172L517.2,39.36c-12.9-4.3-25.8-4.3-34.4,0L117.3,202.76Z"/>
      <path d="M543,447.86v516l361.2-159.1q25.8-12.9,25.8-38.7V275.86Z"/>
      <path d="M457,447.86l-387-172v490.2c0,17.2,8.6,34.4,25.8,38.7L457,963.86Z"/>
    </SVGIcon>
  )
}
