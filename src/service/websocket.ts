import { APITypes } from '@dmdata/api-types';
import { Events } from '../lib/events';
import { WebSocketClient } from '../lib/websocket';

export class WebSocketService extends Events {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  private constructor(private websocket: WebSocketClient) {
    super();

    this.websocket.on('message', ({ data }) => this.onMessage(data));
    this.websocket.on('close', code => this.emit('close', code));

    this.on('ping', ({ pingId }) => this.send({ type: 'pong', pingId }));
  }

  static async open(url: string, protocol: string) {
    return new WebSocketService(await WebSocketClient.open(url, protocol));
  }

  on(event: 'data', listener: (data: APITypes.WebSocketV2.Event.Data) => void): this;
  on(event: 'ping', listener: (data: APITypes.WebSocketV2.Event.Ping) => void): this;
  on(event: 'pong', listener: (data: APITypes.WebSocketV2.Event.Pong) => void): this;
  on(event: 'start', listener: (data: APITypes.WebSocketV2.Event.Start) => void): this;
  on(event: 'change.classification', listener: (data: APITypes.WebSocketV2.Event.ChangeClassification) => void): this;
  on(event: 'error', listener: (data: APITypes.WebSocketV2.Event.Error) => void): this;
  on(event: 'close', listener: (code: number) => void): this;
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  once(event: 'data', listener: (data: APITypes.WebSocketV2.Event.Data) => void): this;
  once(event: 'ping', listener: (data: APITypes.WebSocketV2.Event.Ping) => void): this;
  once(event: 'pong', listener: (data: APITypes.WebSocketV2.Event.Pong) => void): this;
  once(event: 'start', listener: (data: APITypes.WebSocketV2.Event.Start) => void): this;
  once(event: 'change.classification', listener: (data: APITypes.WebSocketV2.Event.ChangeClassification) => void): this;
  once(event: 'error', listener: (data: APITypes.WebSocketV2.Event.Error) => void): this;
  once(event: 'close', listener: (code: number) => void): this;
  once(event: string, listener: (...args: any[]) => void): this {
    return super.once(event, listener);
  }

  get binaryType() {
    return this.websocket.binaryType;
  }

  get protocol() {
    return this.websocket.protocol;
  }

  get readyState() {
    return this.websocket.readyState;
  }

  get url() {
    return this.websocket.url;
  }

  close(code?: number) {
    return this.websocket.close(code);
  }

  private send(msg: APITypes.WebSocketV2.Event.All) {
    return this.websocket.send(JSON.stringify(msg));
  }


  private onMessage(buffer: ArrayBuffer[] | ArrayBuffer | string) {
    if (Array.isArray(buffer)) {
      return;
    }

    const object = json2object<APITypes.WebSocketV2.Event.All>(buffer);

    if (!object) {
      return;
    }

    this.emit(object.type, object);
  }
}


function json2object<T>(data: string | ArrayBuffer) {
  if (data instanceof ArrayBuffer) {
    data = new TextDecoder().decode(data);
  }

  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}
