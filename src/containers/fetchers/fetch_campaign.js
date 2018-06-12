import { createFetcher } from './create_fetcher';
import { fetchCampaign } from 'actions/campaigns';

export default createFetcher(
  (state, props) => state.campaigns.getMeta('fetched').includes(`id:${props.campaignId}`) === false,
  props => fetchCampaign(props.campaignId),
  { showLoader: true }
);
