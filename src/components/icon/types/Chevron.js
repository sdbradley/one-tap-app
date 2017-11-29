import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Chevron({ className, up, right, left, down, ...props }) {
  let classes = classNames(
    'Chevron',
    className
  );

  let transform = up
    ? "rotate(180, 500, 500)"
    : right
    ? "rotate(270, 500, 500)"
    : left
    ? "rotate(90, 500, 500)"
    : ""; // down by default

  return (
    <SVGIcon type='chevron' className={classes} {...props}>
      <polygon transform={transform} points="49.08 318.09 495.75 769.05 951 318.09 865.1 232.19 495.75 597.25 134.98 232.19 49.08 318.09"/>
    </SVGIcon>
  )
}
