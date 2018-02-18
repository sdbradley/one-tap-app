import { createFetcher } from './create_fetcher';
import { fetchOpportunity } from 'actions/opportunities';

export default createFetcher(
  (state, props) => state.opportunities.getMeta('fetched').includes(`id:${props.opportunityId}`) === false,
  props => fetchOpportunity(props.opportunityId),
  { showLoader: true }
);
