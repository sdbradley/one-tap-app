import React from 'react';
import classNames from 'classnames';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import ModalMount from 'containers/modal_mount';
import './app.scss';

export default function App({
  headerContent = null,
  minimal = false,
  edgeless = false,
  className,
  page,
  slug,
  children
} = {}) {
  let header = minimal ? null : (
    <div className='App-header'>
      <div className='App-headerContent'>
        <Header content={headerContent}/>
      </div>
    </div>
  );

  return (
    <div className={classNames(
      'App',
      page && `App--${page}`,
      page && slug && `App--${page}-${slug}`,
      className,
      {
        'App--minimal': minimal,
        'App--edgeless': edgeless
      }
    )}>
      <Sidebar />
      {header}
      <div className='App-body'>
        {children}
      </div>
      <ModalMount />
    </div>
  );
}
