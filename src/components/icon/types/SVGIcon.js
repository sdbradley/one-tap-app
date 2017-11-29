import React from 'react';
import classNames from 'classnames';

export default function SVGIcon ({
  className,
  type,
  children,
  title,
  width = 1000,
  height = 1000,
  encircled = false,
  inline = false,
  inverse = false,
  interactive = true,
  white = false,
  grey = false,
  green = false,
  blue = false,
  red = false,
  black = false,
  off = false,
  ...props
}) {
  return (
    <div
      title={title}
      className={classNames(
        'Icon',
        `Icon--${type}`,
        {
          'Icon--interactive': interactive,
          'Icon--off': off,
          'Icon--white': white,
          'Icon--grey': grey,
          'Icon--blue': blue,
          'Icon--green': green,
          'Icon--black': black,
          'Icon--red': red,
          'Icon--encircled': encircled,
          'Icon--inline': inline,
          'Icon--inverse': inverse
        },
        className
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox={`0 0 ${width} ${height}`}
        className='Icon-svg'
        preserveAspectRatio='xMinYMin'
        {...props}
      >
        {children}
      </svg>
    </div>
    
  );
}
