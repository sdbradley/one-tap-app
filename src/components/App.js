import React from 'react';
import classNames from 'classnames';
import Header from 'components/header';
import Interrupter from 'components/shared/interrupter';
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
  let compatible = (
                    (!!window.chrome && !!window.chrome.webstore) ||
                    navigator.userAgent.indexOf("Safari") > -1 ||
                    typeof InstallTrigger !== 'undefined'
                   ) &&
                   !(
                     !!window.StyleMedia ||
                     !!document.documentMode ||
                     /*@cc_on!@*/false
                   );
  let browserWarning =
    <Interrupter  className='Interrupter--alert'
                  name='compatibilityMessage'
                  position={Interrupter.POSITION_TOP}
                  animateOut={true}
                  animateIn={false}
                  delay={0}
    >
      <div className='App-alert'>
        <div className='App-alertMessage'>
          <span className="bold">Oops!</span> The browser you are currently using may not work properly with FoundationsDigital. For the best experience, please consider using the most recent version of Google Chrome, Mozilla Firefox, or Apple Safari
        </div>
        <div className='App-alertButton Interrupter-dismiss'>
          Dismiss
        </div>
      </div>
    </Interrupter>

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
      {!compatible && browserWarning}
      {header}
      <div className='App-body'>
        {children}
      </div>
      <ModalMount />
    </div>
  );
}
