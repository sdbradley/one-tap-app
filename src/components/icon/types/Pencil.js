import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Pencil({ className, ...props }) {
  let classes = classNames(
    'Pencil',
    className
  );

  return (
    <SVGIcon type='pencil' className={classes} {...props}>
      <path d="M549.81,793.62H455.56l-152.25-174,87-65.25,87,87c14.5,14.5,36.25,14.5,50.75,0l87-87,87,65.25ZM756.43,104.88H647.68v290c0,21.75-14.5,36.25-36.25,36.25s-36.25-14.5-36.25-36.25v-290h-145v290c0,21.75-14.5,36.25-36.25,36.25s-36.25-14.5-36.25-36.25v-290H248.93c-21.75,0-36.25,14.5-36.25,36.25V623.25c0,3.63,3.62,3.63,3.62,7.25v3.62l253.75,290c7.25,7.25,18.13,10.88,29,10.88s21.75-3.63,29-10.88l253.75-290V630.5c0-3.63,3.62-3.63,3.62-7.25V141.13C792.68,119.38,778.18,104.88,756.43,104.88Z"/>
    </SVGIcon>
  )
}
