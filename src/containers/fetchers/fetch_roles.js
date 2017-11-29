import { createFetcher } from './create_fetcher';
import { fetchRoles } from 'actions/roles';

export default createFetcher(
  state => state.roles.getMeta('needsToFetch', true),
  fetchRoles
)
