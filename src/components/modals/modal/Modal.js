import React from 'react';
import Icon from 'components/icon';

export default function Modal({
  children,
  onClose = null,
  onMouseDown = null,
  className
} = {}) {
  let closeIcon = onClose ? <Icon grey type="x" className="Modal-close" onClick={onClose}/> : null;
  return (
    <div className={`Modal ${className}`} onMouseDown={onMouseDown}>
      {closeIcon}
      <div className="Modal-content">
        {children}
      </div>
    </div>
  );
}
