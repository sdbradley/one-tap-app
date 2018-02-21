import API from 'util/API';
import { receivedNormalAPIResponse } from 'actions/api';

export function downloadRecording(id) {
  return (dispatch, getState) => {
    let url = `attachments/${id}/download`;
    return API.get(url)
    .then((res) => dispatch(receivedNormalAPIResponse(res)));
  }
}
