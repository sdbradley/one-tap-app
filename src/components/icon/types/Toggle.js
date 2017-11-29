import React from 'react';
import SVGIcon from './SVGIcon';
import classNames from 'classnames';

export default function Toggle({ className, toggled, ...props }) {
  let classes = classNames(
    'Toggle',
    {
      'Toggle--toggled': toggled
    },
    className
  );

  return (
    <SVGIcon type='toggle' height="600" className={classes} {...props}>
      <path className='Toggle-track' d="M951,300C951,148.7,828.16,25.86,676.86,25.86H323.14C171.84,25.86,49,148.7,49,300S171.84,574.14,323.14,574.14H676.86C828.16,574.14,951,451.3,951,300Z"/>
      <g className='Toggle-knob'>
        <circle className='Toggle-border' cx="676.86" cy="300" r="247.61"/>
        <circle className='Toggle-knobColor' cx="676.86" cy="300" r="227.14"/>
      </g>
    </SVGIcon>
  )
}
