import { Request } from './request';

export declare namespace Client {
  export interface Option extends Request.Option {
  }

  export interface ContextOption {
    endpoint: string;
  }
}

export class Client extends Request {
  constructor(protected option: Client.Option) {
    super(option);
  }
}
