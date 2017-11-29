import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Notebook({ className, ...props }) {
  let classes = classNames(
    'Notebook',
    className
  );

  return (
    <SVGIcon type='notebook' className={classes} {...props}>
      <path d="M386.5,310.83,273,386.5V121.67H500V386.5ZM651.33,46H159.5a37.8,37.8,0,0,0-37.83,37.83V916.17A37.8,37.8,0,0,0,159.5,954H651.33Z"/>
      <path d="M764.83,46H727V954h37.83a113.64,113.64,0,0,0,113.5-113.5v-681A113.64,113.64,0,0,0,764.83,46Z"/>
    </SVGIcon>
  )
}
