import { APITypes } from '@dmdata/api-types';
import { Client } from '../client';
import { WebSocketService } from './websocket';
import { AxiosResponse } from 'axios';

export declare namespace SocketService {
  export interface Option extends Client.ContextOption {
  }
}

export class SocketService {
  constructor(private context: Client, private option: SocketService.Option) {
  }


  start(params: APITypes.SocketStart.RequestBodyJSON,
        returnMode: 'response'): Promise<AxiosResponse<APITypes.SocketStart.ResponseOk>>;
  start(params: APITypes.SocketStart.RequestBodyJSON, returnMode?: 'websocket'): Promise<WebSocketService>;
  async start(params: APITypes.SocketStart.RequestBodyJSON, returnMode: 'websocket' | 'response' = 'websocket') {
    const res = await this.context.request<APITypes.SocketStart.ResponseOk>({
      method: 'post',
      url: this.option.endpoint,
      data: params,
      headers: {
        'content-type': 'application/json'
      }
    });

    if (returnMode === 'response') {
      return res;
    }

    return WebSocketService.open(res.data.websocket.url, res.data.websocket.protocol[0]);
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
