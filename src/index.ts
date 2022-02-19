import { Client } from './client';

import { ContractService } from './service/contract';
import { GDEarthquakeService } from './service/gd.earthquake';
import { GDEewService } from './service/gd.eew';
import { ParameterService } from './service/parameter';
import { SocketService } from './service/socket';
import { TelegramBodyService, TelegramService } from './service/telegram';
import { WebSocketService } from './service/websocket';

import { WebSocketClient } from './lib/websocket';
import { Events } from './lib/events';

import { SERVICES } from './sercices';
import { ENDPOINTS } from './endpoints';


export namespace DMDATA {
  export  type Services = typeof SERVICES[number];

  export interface Option extends Client.Option {
    endpoints?: {
      [key in Services]: string;
    };
  }
}

export class DMDATA extends Client {
  constructor(protected option: DMDATA.Option = {}) {
    super(option);
  }

  get contract() {
    return new ContractService(
      this,
      {
        endpoint: this.getEndpoint('contract')
      }
    );
  }

  get socket() {
    return new SocketService(
      this,
      {
        endpoint: this.getEndpoint('socket')
      }
    );
  }

  get telegram() {
    return new TelegramService(
      this,
      {
        endpoint: this.getEndpoint('telegram')
      }
    );
  }

  get telegramBody() {
    return new TelegramBodyService(
      this,
      {
        endpoint: this.getEndpoint('telegram/body')
      }
    );
  }

  get parameter() {
    return new ParameterService(
      this,
      {
        endpoint: this.getEndpoint('parameter')
      }
    );
  }

  get gdEarthquake() {
    return new GDEarthquakeService(
      this,
      {
        endpoint: this.getEndpoint('gd/earthquake')
      }
    );
  }

  get gdEew() {
    return new GDEewService(
      this,
      {
        endpoint: this.getEndpoint('gd/eew')
      }
    );
  }

  getEndpoint(serverName: DMDATA.Services) {
    return this.option.endpoints?.[serverName] ?? ENDPOINTS.get(serverName)!;
  }
}

export {
  Client,
  ContractService,
  GDEarthquakeService,
  GDEewService,
  ParameterService,
  SocketService,
  TelegramBodyService,
  TelegramService,
  WebSocketService,
  WebSocketClient,
  Events,
  SERVICES,
  ENDPOINTS
};
