import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCH_OPPORTUNITIES_SUCCESS = 'FETCH_OPPORTUNITIES_SUCCESS';
export const FETCHING_OPPORTUNITIES = 'FETCHING_OPPORTUNITIES';

export function fetchOpportunities(partner, stage, start, end) {
  return (dispatch, getState) => {
    let key = `partner:${partner}-stage:${stage}`;
    dispatch(fetchingOpportunities(key));
    return API.get(`opportunities?partner_id=${partner}&stage_name=${stage}&start_date=${start}&end_date=${end}`)
      .then((res) => dispatch(receivedNormalAPIResponse(res)))
      .then(() => dispatch(fetchOpportunitiesSuccess(key)));
  }
}

export function fetchingOpportunities() {
  return {
    type: FETCHING_OPPORTUNITIES
  };
}

export function fetchOpportunitiesSuccess(key) {
  return {
    type: FETCH_OPPORTUNITIES_SUCCESS,
    key: key
  };
}
