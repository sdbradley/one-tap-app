import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Eye({ className, ...props }) {
  let classes = classNames(
    'Eye',
    className
  );

  return (
    <SVGIcon type='eye' className={classes} {...props}>
      <path className="Eye-lid" d="M944.08,473.75C937,461.65,766.89,177.27,500,177.27c-268.23,0-437.13,284.48-444.18,296.59a51.53,51.53,0,0,0,.11,52.44c7.11,12,177.19,296.42,444.07,296.42,265.53,0,436.84-284.21,444-296.26A51.62,51.62,0,0,0,944.08,473.75ZM500,715.15c-160.26,0-284.2-152.65-328.25-215.2C215.59,437.34,339,284.85,500,284.85c160.15,0,284.08,152.49,328.2,215.15C784,562.72,660,715.15,500,715.15Z"/>
      <ellipse className="Eye-pupil" cx="500" cy="500" rx="112.82" ry="107.58"/>
    </SVGIcon>
  )
}
