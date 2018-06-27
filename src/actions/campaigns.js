import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';
import { download } from 'util/funcs'

export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
export const FETCHING_CAMPAIGN = 'FETCHING_CAMPAIGN';
export const FETCH_CAMPAIGNS_SUCCESS = 'FETCH_CAMPAIGNS_SUCCESS';
export const FETCHING_CAMPAIGNS = 'FETCHING_CAMPAIGNS';
export const FETCH_CAMPAIGN_NEWS_SUCCESS = 'FETCH_CAMPAIGN_NEWS_SUCCESS';
export const FETCHING_CAMPAIGN_NEWS = 'FETCHING_CAMPAIGN_NEWS';

export function fetchCampaigns(partner, role) {
  return (dispatch, getState) => {
    let key = `partner:${partner}`;
    if(partner) {
      dispatch(fetchingCampaigns(key));
      let url = `campaigns?account_id=${partner}&role=${role}`;
      return API.get(url)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchCampaignsSuccess(key)));
    }
  }
}

export function fetchCampaignNews(partner, start, end) {
  return (dispatch, getState) => {
    let key = `partner:${partner}:start_date:${start}`;
    if(partner) {
        dispatch(fetchingCampaignNews(key));
        return API.get(`notes?partner__c=${partner}&start_date=${start}&end_date=${end}`)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchCampaignNewsSuccess(key)));
    }
  }
}

export function fetchCampaign(id) {
  return (dispatch, getState) => {
    let key = `id:${id}`;
    if(id) {
      dispatch(fetchingCampaign(key));
      return API.get(`campaigns/${id}`)
        .then((res) => dispatch(receivedNormalAPIResponse(res)))
        .then(() => dispatch(fetchCampaignSuccess(key)));
    }
  }
}
export function downloadCSV(id) {
  return (dispatch, getState) => {
    return API.get(`campaigns/${id}/opportunities/export`, {
        accept: 'text/plain'
      })
      .then(body => download('opportunities.csv', 'text/csv', body))
  }
}

export function fetchingCampaign() {
  return {
    type: FETCHING_CAMPAIGN
  };
}

export function fetchCampaignSuccess(key) {
  return {
    type: FETCH_CAMPAIGN_SUCCESS,
    key: key
  };
}

export function fetchingCampaigns() {
  return {
    type: FETCHING_CAMPAIGNS
  };
}

export function fetchCampaignsSuccess(key) {
  return {
    type: FETCH_CAMPAIGNS_SUCCESS,
    key: key
  };
}

export function fetchingCampaignNews() {
  return {
    type: FETCHING_CAMPAIGN_NEWS
  };
}

export function fetchCampaignNewsSuccess(key) {
  return {
    type: FETCH_CAMPAIGN_NEWS_SUCCESS,
    key: key
  };
}
