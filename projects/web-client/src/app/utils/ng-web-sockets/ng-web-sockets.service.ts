import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';

export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SOCKET_IO_CONFIG__');

export interface SocketIoConfig {
  url: string;
  options?: any;
};

@Injectable()
export class WrappedSocket {
  subscribersCounter = 0;
  ioSocket: Socket;
  url: string;
  options: any;

  constructor(
    @Inject(SOCKET_CONFIG_TOKEN) config: SocketIoConfig 
  ) {
    this.url = config?.url || '';
    this.options = config?.options || {};
  }

  connect(options) {
    if (this.url.length === 0)
      throw new Error('Invalid websocket url')

    this.ioSocket = io(this.url, Object.assign(this.options, options));
    return this.ioSocket.connect();
  }

  connectAsync(options): Observable<void> {
    return new Observable(o => {
      if (this.url.length === 0) {
        o.error('Invalid websocket url')
      }

      this.ioSocket = io(this.url, Object.assign(this.options, options));
      this.ioSocket.on("connect", () => {
        o.next();
        o.complete();
      });
      this.ioSocket.on("connect_error", e => {
        o.error(e);
      })
      this.ioSocket.connect();
    })
  }

  disconnect(): void {
    this.ioSocket?.disconnect();
  }

  on(eventName: string, callback: () => any) {
    this.ioSocket.on(eventName, callback);
  }

  once(eventName: string, callback: (...args: any[]) => void) {
    this.ioSocket.once(eventName, callback);
  }

  emit(eventName: string, data?: any, callback?: Function) {
    return this.ioSocket.emit.apply(this.ioSocket, arguments);
  }

  removeListener(eventName: string, callback?: Function) {
    return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
  }

  removeAllListeners(eventName?: string) {
    return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
  }

  /** create an Observable from an event */
  fromEvent<T>(eventName: string): Observable<T> {
    this.subscribersCounter++;
    return new Observable<T>((observer: any) => {
      this.ioSocket.on(eventName, (data: T) => {
        observer.next(data);
      });
      return () => {
        if (this.subscribersCounter === 1)
          this.ioSocket.removeListener(eventName);
      };
    }).pipe(share())
  }

  /* Creates a Promise for a one-time event */
  fromEventOnce<T>(eventName: string): Promise<T> {
    return new Promise<T>(resolve => this.once(eventName, resolve));
  }

  changeRoom(name: string) {
    console.log('socket-name', name);
    return this.ioSocket.on('connection', socket => {
      console.log(socket);
      socket.join(name);
    });
  }
}