import React from 'react';
import classNames from 'classnames';

export default function Image({ image, title, className } = {}) {
  return (
    <div className={classNames('Image', className)}>{
      // Only render if curriculum is not null
      image
        ? <div aria-label={title} className="Image-img" style={{ backgroundImage: `url(${image})` }}/>
        : <div className="Image-title">{title}</div>
    }</div>
  );
}
