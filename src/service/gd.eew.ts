import { APITypes } from '@dmdata/api-types';
import { Client } from '../client';

export declare namespace GDEewService {
  export interface Option extends Client.ContextOption {
  }
}

export class GDEewService {
  constructor(private context: Client, private option: GDEewService.Option) {
  }


  list(params: APITypes.GDEewList.QueryParams = {}) {
    return this.context.request<APITypes.GDEewList.ResponseOk>({
      method: 'get',
      url: this.option.endpoint,
      params: params
    });
  }


  event(id: string) {
    return this.context.request<APITypes.GDEewEvent.ResponseOk>({
      method: 'get',
      url: `${this.option.endpoint}/${id}`
    });
  }
}
