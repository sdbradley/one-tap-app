import { createFetcher } from './create_fetcher';
import { fetchOpportunities } from 'actions/opportunities';

export default createFetcher(
  (state, props) => state.opportunities.getMeta('fetched').includes(`partner:${props.partner_id}-stage:${props.stage}`) === false,
  props => fetchOpportunities(props.partner_id, props.stage, props.start_date, props.end_date),
  { showLoader: true }
);
