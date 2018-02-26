import { createFetcher } from './create_fetcher';
import { fetchUsers } from 'actions/users';

export default createFetcher(
  (state, props) => state.users.getMeta('fetched').includes('*') === false,
  props => fetchUsers(),
  { showLoader: true }
);
