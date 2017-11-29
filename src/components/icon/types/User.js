import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function User({ className, ...props }) {
  let classes = classNames(
    'User',
    className
  );

  return (
    <SVGIcon type='user' className={classes} {...props}>
      <path d="M499.75,49c-248.93,0-451,202.1-451,451s202.1,451,451,451,451-202.1,451-451S748.68,49,499.75,49Zm0,186.74a117.16,117.16,0,0,1,117,117c0,61.38-50,130-117,130s-117-68.64-117-130A117.16,117.16,0,0,1,499.75,235.71Zm195,468.06a13,13,0,0,1-13,13h-364a13,13,0,0,1-13-13V643.63a90.68,90.68,0,0,1,56-84.09c39.71-16.45,86.47-24.79,139-24.79s99.29,8.35,139,24.79a90.68,90.68,0,0,1,56,84.09Z" />
    </SVGIcon>
  )
}

