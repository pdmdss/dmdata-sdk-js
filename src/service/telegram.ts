import { APITypes } from '@dmdata/api-types';
import { Client } from '../client';

export declare namespace TelegramService {
  export interface Option extends Client.ContextOption {

  }
}

export class TelegramService {
  constructor(private context: Client, private option: TelegramService.Option) {
  }


  list(params?: APITypes.TelegramList.QueryParams) {
    return this.context.request<APITypes.TelegramList.ResponseOk>({
      method: 'get',
      url: this.option.endpoint,
      params: params
    });
  }
}

export class TelegramBodyService {
  constructor(private context: Client, private option: TelegramService.Option) {
  }


  get(id: string) {
    return this.context.request<APITypes.TelegramList.ResponseOk>({
      method: 'get',
      baseURL: this.option.endpoint,
      url: id
    });
  }
}
