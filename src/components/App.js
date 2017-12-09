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
  showNav = true,
  children
} = {}) {
  let header = minimal ? null : (
    <div className='App-header'>
      <div className='App-headerContent'>
        <Header content={headerContent}/>
      </div>
    </div>
  );

  let sidebar = !showNav ? null : (
    <Sidebar />
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
      {sidebar}
      <div className='App-body'>
        {header}
        {children}
      </div>
      <ModalMount />
    </div>
  );
}
