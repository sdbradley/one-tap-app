import React from 'react';
import Modal from 'components/modals/modal_mount';
import { connect } from 'react-redux';
import { closeModal } from 'actions/modal';

function ModalMount({
  name,
  payload,
  closeModal
}) {
  return (
    <Modal
      payload={payload && payload.toJS()}
      modal={name}
      onClose={closeModal}
    />
  );
}

export default connect(
  (state) => ({
    name: state.modal.get('name'),
    payload: state.modal.get('payload')
  }),
  { closeModal }
)(ModalMount);
