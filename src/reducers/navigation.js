import {
  TOGGLE_SIDEBAR, 
  OPEN_SIDEBAR, 
  CLOSE_SIDEBAR,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CHANGE_ACTIVE_SIDEBAR_ITEM } from 'actions/navigation';

const initialState = {
  sidebarOpened: false,
  sidebarStatic: false,
  activeItem: null,
  startDate: (setStartDate().getTime() / 1000),
  endDate: (new Date().getTime() / 1000)
};

function setStartDate() {
  var d = new Date();
  d.setDate(d.getDate()-90);
  return d;
}

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarStatic: !state.sidebarStatic,
      };
    case OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: true,
      });
    case CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: false,
      });
    case CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.activeItem,
      };
    case CHANGE_START_DATE:
      if(action.value) {
        var d = new Date(action.value);
        if (!isNaN(d.getTime())) {
          var t = Math.round(d.getTime() / 1000);
          return Object.assign({}, state, {
            startDate: t,
          });
        }
      }
      break;
    case CHANGE_END_DATE:
      if(action.value) {
        var de = new Date(action.value);
        if (!isNaN(de.getTime())) {
          var te = Math.round(de.getTime() / 1000);
          return Object.assign({}, state, {
            endDate: te,
          });
        }
      }
      break;
    default:
      return state;
  }
}
