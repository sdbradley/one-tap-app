import React from 'react';
import Button from 'components/shared/button/button';
import Link from 'components/link';
import Icon from 'components/icon';

export default function Dashboard({header, addCopy, addModal, children}) {
  return (
    <div className="Dashboard">
      <div className="Dashboard-header">
        {header}
        <Link modal={addModal}>
          <Button className="Dashboard-add" inverse>
            <Icon className="Dashboard-addIcon" type='plus'/>
            <span className='Dashboard-addLabel'>{addCopy}</span>
          </Button>
        </Link>
      </div>
      <div className="Dashboard-body">
        {children}
      </div>
    </div>
  )
}
