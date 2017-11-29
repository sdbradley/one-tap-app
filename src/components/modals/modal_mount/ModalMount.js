import React from 'react';
import ReactModal from 'react-modal';
import * as Modals from 'components/modals';
import { ROOT_ELEMENT } from 'constants';

ReactModal.setAppElement(ROOT_ELEMENT);
ReactModal.defaultStyles = {};

const NULL_MODAL = () => null;

export default function ModalMount({
  modal,
  payload,
  onClose
} = {}) {
  let Modal = Modals[modal] ? Modals[modal] : NULL_MODAL;
  return (
    <ReactModal
      isOpen={!!Modals[modal]}
      contentLabel=""
      onRequestClose={onClose}
      portalClassName="ModalMount"
      overlayClassName="ModalMount-overlay"
      className="ModalMount-content"
      ariaHideApp={true}
    >
      <Modal
        key={`${modal}:${JSON.stringify(payload)}`}
        onClose={onClose}
        {...payload}
      />
    </ReactModal>
  );
}
