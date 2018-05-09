  import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export const FETCH_CAMPAIGN_NEWS_SUCCESS = 'FETCH_CAMPAIGN_NEWS_SUCCESS';
export const FETCHING_CAMPAIGN_NEWS = 'FETCHING_CAMPAIGN_NEWS';

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
