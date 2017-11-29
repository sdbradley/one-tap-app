import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Graph({ className, ...props }) {
  let classes = classNames(
    'Graph',
    className
  );

  return (
    <SVGIcon type='graph' className={classes} {...props}>
      <rect x="69.36" y="356.91" width="247.79" height="548.19" rx="15.61" ry="15.61"/>
      <rect x="376.08" y="94.9" width="247.79" height="810.2" rx="15.61" ry="15.61"/>
      <rect x="682.8" y="245.75" width="247.79" height="659.35" rx="15.61" ry="15.61"/>
    </SVGIcon>
  )
}
