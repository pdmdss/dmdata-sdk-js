import { SERVICES } from './sercices';

export const API_ENDPOINT = 'https://api.dmdata.jp/v2';
export const BODY_ENDPOINT = 'https://data.api.dmdata.jp/v1';

export const ENDPOINTS: Map<typeof SERVICES[number], string> =
  new Map(SERVICES.map(serviceName => [serviceName, `${API_ENDPOINT}/${serviceName}`]));

ENDPOINTS.set('telegram/body', BODY_ENDPOINT);
