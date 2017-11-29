import React from 'react';
import Icon from 'components/icon';

export default function Loader({title, children}) {
  return (
    <div className='Loader'>
      <Icon className='Loader-spinner' type='spinner' interactive={false}/>
      <div className='Loader-title'>{title}</div>
      <div className='Loader-content'>{children}</div>
    </div>
  );
}
