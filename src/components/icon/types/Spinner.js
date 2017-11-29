import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Spinner({ className, ...props }) {
  let classes = classNames(
    'Spinner',
    className
  );

  return (
    <SVGIcon type='spinner' width='400' height='400' className={classes} {...props}>
      <circle className="Spinner-stroke" r="159.15" cx="200" cy="200"/>
    </SVGIcon>
  )
}
