import { APITypes } from '@dmdata/api-types';
import { Client } from '../client';

export declare namespace ContractService {
  export interface Option extends Client.ContextOption {
  }
}

export class ContractService {
  constructor(private context: Client, private option: ContractService.Option) {
  }


  list(params: APITypes.ContractList.QueryParams) {
    return this.context.request<APITypes.ContractList.ResponseOk>({
      method: 'get',
      url: this.option.endpoint,
      params: params
    });
  }
}
