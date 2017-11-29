export const MODAL_VIEW = 'MODAL_VIEW';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const MODAL_SET_CLOSE_ACTION = 'MODAL_SET_CLOSE_ACTION';

export function setCloseAction(action) {
  return {
    type: MODAL_SET_CLOSE_ACTION,
    action
  }
}

export function closeModal() {
  return {
    type: MODAL_CLOSE
  };
}

export function viewModal(name, payload) {
  return {
    type: MODAL_VIEW,
    name,
    payload
  };
}
