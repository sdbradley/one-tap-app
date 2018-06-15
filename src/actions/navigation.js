/* eslint-disable import/prefer-default-export */

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const CHANGE_ACTIVE_SIDEBAR_ITEM = 'CHANGE_ACTIVE_SIDEBAR_ITEM';
export const CHANGE_START_DATE = 'CHANGE_START_DATE';
export const CHANGE_END_DATE = 'CHANGE_END_DATE';
export const SET_PARTNER_ID = 'SET_PARTNER_ID';
export const SET_CAMPAIGN_ID = 'SET_CAMPAIGN_ID';

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR,
  };
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR,
  };
}

export function changeActiveSidebarItem(activeItem) {
  return {
    type: CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}

export function changeStartDate(value) {
  return {
    type: CHANGE_START_DATE,
    value: value
  };
}

export function changeEndDate(value) {
  return {
    type: CHANGE_END_DATE,
    value: value
  };
}

export function setPartner(id) {
  return {
    type: SET_PARTNER_ID,
    key: id
  };
}

export function setCampaign(id) {
  return {
    type: SET_CAMPAIGN_ID,
    key: id
  };
}
