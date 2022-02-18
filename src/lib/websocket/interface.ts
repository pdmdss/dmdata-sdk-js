import { WebSocketMessage } from './index';

export interface WebSocketInterface {

  get binaryType(): string;

  get protocol(): string;

  get readyState(): number;

  get url(): string;


  emit(event: 'message', data: WebSocketMessage): boolean;

  emit(event: 'open'): boolean;

  emit(event: 'close', code: number): boolean;

  emit(event: 'error', error: any): boolean;

  on(event: 'message', listener: (data: WebSocketMessage) => void): this;

  on(event: 'open', listener: () => void): this;

  on(event: 'close', listener: (code: number) => void): this;

  on(event: 'error', listener: (error: any) => void): this;

  once(event: 'message', listener: (data: WebSocketMessage) => void): this;

  once(event: 'open', listener: () => void): this;

  once(event: 'close', listener: (code: number) => void): this;

  once(event: 'error', listener: (error: any) => void): this;

  send(data: ArrayBuffer | string): void;

  close(code?: number): void;
}
