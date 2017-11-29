import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Download({ className, ...props }) {
  let classes = classNames(
    'Download',
    className
  );

  return (
    <SVGIcon type='download' className={classes} {...props}>
      <polygon points="887.26 905.1 887.26 739.96 815.26 739.96 815.26 833.1 184.74 833.1 184.74 739.96 112.74 739.96 112.74 905.1 887.26 905.1"/>
      <polygon points="665.02 503.05 536 632.07 536 126.86 464 126.86 464 632.07 334.98 503.05 284.07 553.96 500 769.89 715.93 553.96 665.02 503.05"/>
    </SVGIcon>
  )
}
