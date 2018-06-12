import { createFetcher } from './create_fetcher';
import { fetchCampaigns } from 'actions/campaigns';

export default createFetcher(
  (state, props) => state.campaigns.getMeta('fetched').includes(`partner:${props.partner_id}:start_date:${props.start_date}`) === false,
  props => fetchCampaigns(props.partner_id, props.start_date, props.end_date),
  { showLoader: true }
);
