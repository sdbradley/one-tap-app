import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Check({ className, ...props }) {
  let classes = classNames(
    'Check',
    className
  );

  return (
    <SVGIcon type='check' className={classes} {...props}>
      <path d="M373.85,824.79,103.8,554.74l49.09-49.11L373.79,726.52,910.45,190l49.09,49.09Z"/>
    </SVGIcon>
  )
}
