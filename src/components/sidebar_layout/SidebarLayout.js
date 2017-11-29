import React from 'react';
import classNames from 'classnames';
import Image from 'components/image';
import Sponsor from 'components/sponsor';

export default function SidebarLayout({image, sponsor, imageTitle, sidebar, children, mobileMenu = false, open = false}) {
  return (
    <div className={classNames('SidebarLayout', {
      'SidebarLayout--mobileMenu': mobileMenu,
      'SidebarLayout--open': open
    })}>
      <aside className="SidebarLayout-left">
        {image || imageTitle ? <Image className="SidebarLayout-image" image={image} title={imageTitle}/> : null}
        {sponsor && <Sponsor sponsor={sponsor}/>}
        {sidebar}
      </aside>
      <main className="SidebarLayout-main">
        {children}
      </main>
    </div>
  );
}
