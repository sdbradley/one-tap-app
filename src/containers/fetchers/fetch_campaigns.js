import { createFetcher } from './create_fetcher';
import { fetchCampaigns } from 'actions/campaigns';

export default createFetcher(
  (state, props) => state.campaigns.getMeta('fetched').includes(`partner:${props.partner_id}`) === false,
  props => fetchCampaigns(props.partner_id),
  { showLoader: true }
);
