import { APITypes } from '@dmdata/api-types';
import { Client } from '../client';

export declare namespace GDEarthquakeService {
  export interface Option extends Client.ContextOption {
  }
}

export class GDEarthquakeService {
  constructor(private context: Client, private option: GDEarthquakeService.Option) {
  }


  list(params?: APITypes.GDEarthquakeList.QueryParams) {
    return this.context.request<APITypes.GDEarthquakeList.ResponseOk>({
      method: 'get',
      url: this.option.endpoint,
      params: params
    });
  }


  event(id: string) {
    return this.context.request<APITypes.GDEarthquakeEvent.ResponseOk>({
      method: 'get',
      baseURL: this.option.endpoint,
      url: id
    });
  }
}
