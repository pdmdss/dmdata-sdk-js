import { APITypes } from '@dmdata/api-types';
import { Client } from '../client';
import { WebSocketService } from './websocket';

export declare namespace SocketService {
  export interface Option extends Client.ContextOption {
  }
}

export class SocketService {
  constructor(private context: Client, private option: SocketService.Option) {
  }

  start(params: APITypes.SocketStart.RequestBodyJSON) {
    return this.context.request<APITypes.SocketStart.ResponseOk>({
      method: 'post',
      url: this.option.endpoint,
      data: params,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(({ data }) =>
        WebSocketService.open(data.websocket.url, data.websocket.protocol[0])
      );
  }

  list(params?: APITypes.SocketList.QueryParams) {
    return this.context.request<APITypes.SocketList.ResponseOk>({
      method: 'get',
      url: this.option.endpoint,
      params: params
    });
  }

  close(id: number) {
    return this.context.request<APITypes.SocketClose.ResponseOk>({
      method: 'delete',
      url: `${this.option.endpoint}/${id}`
    });
  }
}
