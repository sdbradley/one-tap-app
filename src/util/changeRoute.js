import { hashHistory } from 'react-router';

// The idea here is to abstract us one level away from
// hashHistory so that if we ever wanted to migrate off,
// we'd need to change this file.
// Use this instead of importing hashHistory directly.
export default function changeRoute(newRoute) {
  if (hashHistory.getCurrentLocation().pathname !== newRoute) {
    hashHistory.push(newRoute);
  }
}
