import { createFetcher } from './create_fetcher';
import { fetchCampaignNews } from 'actions/campaigns';

export default createFetcher(
  (state, props) => state.campaign_news.getMeta('fetched').includes(`partner:${props.partner_id}`) === false,
  props => fetchCampaignNews(props.partner_id, props.start_date, props.end_date),
  { showLoader: true }
);
