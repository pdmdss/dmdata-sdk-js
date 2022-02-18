import { Events } from '../events';
import { WebSocketInterface } from './interface';

export interface WebSocketMessage {
  data: string | ArrayBuffer | ArrayBuffer[];
}

export class WebSocketClient extends Events implements WebSocketInterface {
  static readonly CONNECTING: 0;
  static readonly OPEN: 1;
  static readonly CLOSING: 2;
  static readonly CLOSED: 3;

  private constructor(private ws: WebSocket) {
    super();
    this.ws.addEventListener('message', data => {
      this.emit('message', { data: data.data });
    });
    this.ws.addEventListener('open', () => this.emit('open'));
    this.ws.addEventListener('close', close => this.emit('close', close.code));
  }

  get binaryType() {
    return this.ws.binaryType;
  }

  get protocol() {
    return this.ws.protocol;
  }

  get readyState() {
    return this.ws.readyState;
  }

  get url() {
    return this.ws.url;
  }

  static async open(url: string, protocols?: string | string[]) {
    return new WebSocketClient(new WebSocket(url, protocols));
  }

  emit(event: 'message', data: WebSocketMessage): boolean;
  emit(event: 'open'): boolean;
  emit(event: 'close', code: number): boolean;
  emit(event: 'error', error: any): boolean;
  emit(event: string, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }

  on(event: 'message', listener: (data: WebSocketMessage) => void): this;
  on(event: 'open', listener: () => void): this;
  on(event: 'close', listener: (code: number) => void): this;
  on(event: 'error', listener: (error: any) => void): this;
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  once(event: 'message', listener: (data: WebSocketMessage) => void): this;
  once(event: 'open', listener: () => void): this;
  once(event: 'close', listener: (code: number) => void): this;
  once(event: 'error', listener: (error: any) => void): this;
  once(event: string, listener: (...args: any[]) => void): this {
    return super.once(event, listener);
  }

  send(data: ArrayBuffer | string) {
    return this.ws.send(data);
  }

  close(code?: number) {
    return this.ws.close(code);
  }
}
