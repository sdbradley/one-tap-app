import {
  MODAL_VIEW,
  MODAL_CLOSE,
  MODAL_SET_CLOSE_ACTION
} from 'actions/modal';
import { Map } from 'immutable';

const INITIAL_STATE = Map({
  name: null,
  payload: null,
  closeAction: null
});

export default (
  modal = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case MODAL_VIEW:
      return modal.merge({
        name: action.name,
        payload: action.payload,
        closeAction: action.closeAction || null
      });
    case MODAL_SET_CLOSE_ACTION:
      return modal.set('closeAction', action.action);
    case MODAL_CLOSE:
      return INITIAL_STATE;
    case modal.get('closeAction'):
      return INITIAL_STATE;
    default:
      return modal;
  }
}
