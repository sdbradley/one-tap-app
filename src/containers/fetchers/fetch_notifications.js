import { createFetcher } from './create_fetcher';
import { fetchNotifications } from 'actions/notifications';

export default createFetcher(
  (state, props) => state.notifications.getMeta('fetched').includes('*') === false,
  props => fetchNotifications(),
  { showLoader: true }
);
