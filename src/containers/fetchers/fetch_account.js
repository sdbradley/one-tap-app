import { createFetcher } from './create_fetcher';
import { fetchAccount } from 'actions/accounts';

export default createFetcher(
  (state, props) => state.accounts.getMeta('fetched').includes(`id:${props.accountId}`) === false,
  props => fetchAccount(props.accountId),
  { showLoader: true }
);
