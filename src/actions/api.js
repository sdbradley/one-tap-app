export const RECEIVED_NORMAL_API_RESPONSE = 'RECEIVED_NORMAL_API_RESPONSE';

export function receivedNormalAPIResponse(payload) {
  return {
    type: RECEIVED_NORMAL_API_RESPONSE,
    payload
  }
}
