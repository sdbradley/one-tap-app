import { createFetcher } from './create_fetcher';
import { fetchCampaigns } from 'actions/campaigns';

export default createFetcher(
  (state, props) => state.campaigns.getMeta('fetched').includes(`partner:${props.id}`) === false,
  props => fetchCampaigns(props.id, props.role),
  { showLoader: true }
);
