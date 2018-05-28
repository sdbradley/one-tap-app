import { createFetcher } from './create_fetcher';
import { fetchAccounts } from 'actions/accounts';

export default createFetcher(
  (state, props) => state.accounts.getMeta('fetched').includes('*') === false,
  props => fetchAccounts(false, true),
  { showLoader: true }
);
