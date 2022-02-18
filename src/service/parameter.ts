import { APITypes } from '@dmdata/api-types';
import { Client } from '../client';

export declare namespace ParameterService {
  export interface Option extends Client.ContextOption {
  }
}

export class ParameterService {
  constructor(private context: Client, private option: ParameterService.Option) {
  }


  earthquake() {
    return this.context.request<APITypes.ParameterEarthquakeStation.ResponseOk>({
      method: 'get',
      baseURL: this.option.endpoint,
      url: 'earthquake/station'
    });
  }

  tsunami() {
    return this.context.request<APITypes.ParameterTsunamiStation.ResponseOk>({
      method: 'get',
      baseURL: this.option.endpoint,
      url: 'tsunami/station'
    });
  }
}
