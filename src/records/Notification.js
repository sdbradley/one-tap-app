import { Record } from 'immutable';

const Notification = Record({
  isNull: false,
  isValidated: false,
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  accountId: ''
});

Object.assign(
  Notification.prototype,
  {
    toApi() {
      return {
        id: this.id,
        notification_key: this.notificationKey,
        method: this.method,
        type: this.type,
        data: this.data,
        was_sent: this.wasSent,
        sent_on: this.sentOn,
        is_deleted: this.isDeleted,
        created_at: this.createdAt
      };
    }
  }
);

Notification.NULL = Notification({
  isNull: true
});

Notification.fromApi = function deserialize(data) {
  return Notification({
    id: data.id,
    notificationKey: data.notification_key,
    method: data.method,
    type: data.type,
    data: data.data,
    wasSent: data.was_sent,
    sentOn: data.sent_on,
    isDeleted: data.is_deleted,
    createdAt: data.created_at
  });
};

export default Notification;
