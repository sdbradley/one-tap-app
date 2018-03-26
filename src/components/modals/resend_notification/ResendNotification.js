import React from 'react';
import { connect } from 'react-redux';
import Modal from 'containers/modal';
import Field from 'components/field';
import Button from 'components/shared/button';
import Form from 'components/Form';

import {
  resendNotification,
  RESEND_NOTIFICATION_SUCCESS
} from 'actions/notifications';

function ResendNotification({
  notification,
  resendNotification
} = {}) {
  return (
    <Modal closeAction={RESEND_NOTIFICATION_SUCCESS}>
        <div className='ResendNotification'>
        <Form className='ResendNotification-form' onSubmit={resendNotification}>
            <h1 className='ResendNotification-title'>Resend Notification</h1>
            <h3 className="ResendNotification-confirm">Re-send notification for {notification.opportunity}?</h3>
            <Field type='hidden' name='notification_id' value={notification.id} />
            <Button full submit>Re-Send</Button>
        </Form>
        </div>
    </Modal>
  );
}

export default connect(
  // Map state to props
  (state, props) => {
    let notification = state.notifications.find(props.notificationId, null);
    return {
      notification
    };
  },
  // Map dispatch to props
  { resendNotification }
)(ResendNotification);
