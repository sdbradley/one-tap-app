import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Plus({ className, ...props }) {
  let classes = classNames(
    'Plus',
    className
  );

  return (
    <SVGIcon type='plus' className={classes} {...props}>
      <path d="M819,181.09c-176-176-461.86-176-637.89,0s-176,461.86,0,637.89S642.95,995,819,819,995,357.12,819,181.09ZM725.56,520.54h-205v205h-41v-205h-205v-41h205v-205h41v205h205Z"/>
    </SVGIcon>
  )
}
