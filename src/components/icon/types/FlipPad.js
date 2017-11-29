import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function FlipPad({ className, ...props }) {
  let classes = classNames(
    'FlipPad',
    className
  );

  return (
    <SVGIcon type='flipPad' className={classes} {...props}>
      <path d="M862.5,862.5h-725V355h725Zm36.25-725h-145V65h-72.5v72.5h-145V65h-72.5v72.5h-145V65h-72.5v72.5h-145A36.26,36.26,0,0,0,65,173.75v725A36.26,36.26,0,0,0,101.25,935h797.5A36.26,36.26,0,0,0,935,898.75v-725A36.26,36.26,0,0,0,898.75,137.5Z" transform="translate(0, -50)"/>
    </SVGIcon>
  )
}
