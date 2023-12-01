
import { NgModule, ModuleWithProviders } from '@angular/core';

import { SOCKET_CONFIG_TOKEN, WrappedSocket } from './ng-web-sockets.service';

export interface SocketIoConfig {
  url: string;
  options?: any;
};


/** Socket factory */
export function SocketFactory(config: SocketIoConfig) {
  return new WrappedSocket(config);
}



@NgModule({})
export class SocketIoModule {
  static config(config: SocketIoConfig): ModuleWithProviders<SocketIoModule> {

    return {
      ngModule: SocketIoModule,
      providers: [
        WrappedSocket,
        { provide: SOCKET_CONFIG_TOKEN, useValue: config },
     
      ]
    };
  }
}