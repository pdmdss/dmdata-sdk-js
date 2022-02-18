import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Events } from './lib/events';

export declare namespace Request {
  export interface Authorization {
    getAuthorization(): Promise<string>;

    getDPoPProofJWT?(method: string, uri: string, nonce?: string | null): Promise<string | null | undefined>;
  }

  export interface Apikey {
    apikey: string;
  }

  export interface Option {
    timeout?: number;
    credentials?: Authorization | Apikey;
  }
}

export class Request extends Events {
  private dpopNonce?: string;
  private authContext?: Request.Authorization;
  private instance: AxiosInstance;

  constructor(protected option: Request.Option) {
    super();

    if (
      this.option.credentials !== null &&
      typeof this.option.credentials === 'object' &&
      'getAuthorization' in this.option.credentials &&
      typeof this.option.credentials.getAuthorization === 'function'
    ) {
      this.setAuthorizationContext(this.option.credentials);
    }

    this.instance = axios.create({
      validateStatus: status => status < 400,
      timeout: this.option.timeout
    });

    this.instance.interceptors.request.use(
      config => this.configUse(config)
    );
    this.instance.interceptors.response.use(
      response => this.responseUse(response, false),
      response => this.responseUse(response, true)
    );
  }

  setAuthorizationContext(context: Request.Authorization) {
    this.authContext = context;

    axios.interceptors.request.use();
  }

  /**+
   * @internal
   * @param config
   */
  request<T = any, D = any>(config: AxiosRequestConfig<D>) {
    const request = this.instance.request<T>(config);

    return request
      .then(res => res.data)
      .catch(error => this.errorHandling<T, D>(error));
  }

  private async configUse(config: AxiosRequestConfig) {
    const headers = config.headers ??= {};
    const queryParams = config.params ??= {};

    config.url ??= config.baseURL;

    if (this.authContext) {
      headers.authorization = await this.authContext.getAuthorization();

      if (typeof this.authContext.getDPoPProofJWT === 'function') {
        const dpop = await this.authContext.getDPoPProofJWT(
          config.method?.toUpperCase() ?? 'GET',
          config.url ?? config.baseURL ?? '',
          this.dpopNonce
        );

        if (typeof dpop === 'string') {
          headers.dpop = dpop;
        }
      }
    } else if (this.option.credentials !== null && typeof this.option.credentials === 'object' && 'apikey' in this.option.credentials) {
      const apikey = this.option.credentials.apikey;

      if (queryParams instanceof URLSearchParams) {
        queryParams.set('key', apikey);
      } else {
        Reflect.set(queryParams, 'key', apikey);
      }
    }

    return config;
  }

  private async responseUse(response: AxiosResponse, isError: boolean) {
    const headers = response.headers ?? {};

    if (typeof headers['dpop-nonce'] === 'string') {
      this.dpopNonce = headers['dpop-nonce'];
    }

    if (isError) {
      return Promise.reject(response);
    }

    return response;
  }

  private errorHandling<T = any, D = any>(error: AxiosError<T, D>): Promise<T> {
    if (typeof error.response === 'object') {
      const { headers, status } = error.response;

      if (status === 401 && headers['dpop-nonce']) {
        return this.request<T, D>(error.config);
      }
    }

    return Promise.reject(error);
  }
}