import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Sort({ className, ascending, ...props }) {
  let classes = classNames(
    'Sort',
    {
      'Sort--ascending': ascending === true,
      'Sort--descending': ascending === false,
      'Sort--none': ascending === undefined
    },
    className
  );

  return (
    <SVGIcon type='sort' className={classes} {...props}>
      <polygon className="Sort-descending" points="500 46 267.9 448 732.1 448 500 46"/>
      <polygon className="Sort-ascending" points="500 955 732.1 553 267.9 553 500 955"/>
    </SVGIcon>
  )
}
