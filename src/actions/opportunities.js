import API from "util/API";
import { receivedNormalAPIResponse } from "actions/api";

export const FETCH_OPPORTUNITIES_SUCCESS = "FETCH_OPPORTUNITIES_SUCCESS";
export const FETCHING_OPPORTUNITIES = "FETCHING_OPPORTUNITIES";
export const FETCH_OPPORTUNITY_SUCCESS = "FETCH_OPPORTUNITY_SUCCESS";
export const FETCHING_OPPORTUNITY = "FETCHING_OPPORTUNITY";
export const LEAVE_FEEDBACK_SUCCESS = "LEAVE_FEEDBACK_SUCCESS";
export const LEAVE_FEEDBACK_FAILED = "LEAVE_FEEDBACK_FAILED";

export function fetchOpportunities(campaign) {
  return (dispatch, getState) => {
    let key = `campaign:${campaign}`;
    if (campaign) {
      dispatch(fetchingOpportunities(key));
      let url = `opportunities?campaign_id=${campaign}`;
      //url += (stage && `&stage_name=${stage}`) || '';
      //url += (start && `&start_date=${start}`) || '';
      //url += (end && `&end_date=${end}`) || '';
      return API.get(url).then(data =>
        dispatch(fetchOpportunitiesSuccess(key, data))
      );
    }
  };
}

export function fetchAccountOpportunities(accountId, campaignId, stage) {
  return (dispatch, getState) => {
    let key = `accountId:${accountId}`;
    if (accountId) {
      dispatch(fetchingOpportunities(key));
      let url = `opportunities?account_id=${accountId}`;
      if (campaignId) {
        url += `&campaign_id=${campaignId}`;
      }
      if (stage) {
        url += `&stage_name=${stage}`;
      }
      return API.get(url).then(data =>
        dispatch(fetchOpportunitiesSuccess(key, data))
      );
    }
  };
}

export function fetchingOpportunities(key) {
  return {
    type: FETCHING_OPPORTUNITIES,
    key: key
  };
}

export function fetchOpportunitiesSuccess(key, data) {
  return {
    type: FETCH_OPPORTUNITIES_SUCCESS,
    key: key,
    payload: data
  };
}

export function fetchOpportunity(id) {
  return (dispatch, getState) => {
    let key = `id:${id}`;
    if (id) {
      dispatch(fetchingOpportunity(key));
      return API.get(`opportunities/${id}`)
        .then(res => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchOpportunitySuccess(key)));
    }
  };
}

export function fetchingOpportunity() {
  return {
    type: FETCHING_OPPORTUNITY
  };
}

export function fetchOpportunitySuccess(key) {
  return {
    type: FETCH_OPPORTUNITY_SUCCESS,
    key: key
  };
}

export function leaveFeedback({ opportunity_id, feedback, feedback_type }) {
  return dispatch =>
    API.post(`opportunities/${opportunity_id}/feedback`, {
      opportunity_id,
      feedback,
      feedback_type
    })
      .then(res => dispatch(receivedNormalAPIResponse(res)))
      .then(res => dispatch(leaveFeedbackSuccess(res)))
      .catch(response =>
        dispatch(leaveFeedbackFailed(new Error("An unknown error occured")))
      );
}

export function leaveFeedbackSuccess(data) {
  return {
    type: LEAVE_FEEDBACK_SUCCESS,
    data: data
  };
}

function leaveFeedbackFailed(error) {
  return {
    type: LEAVE_FEEDBACK_FAILED,
    error
  };
}
