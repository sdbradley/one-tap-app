import { createFetcher } from './create_fetcher';
import { fetchStatistics } from 'actions/statistics';

export default createFetcher(
  (state, props) => state.statistics.getMeta('fetched').includes(`partner:${props.partner_id}:start_date:${props.start_date}`) === false,
  props => fetchStatistics(props.partner_id, props.start_date, props.end_date),
  { showLoader: true }
);
