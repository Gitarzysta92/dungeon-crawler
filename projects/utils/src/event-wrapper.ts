// type actionsCfg2<T> = { [P in keyof T]?: Function[] }


// type actionsCfg = { [k: string]: Function[] };
// type actionsSetter = (setup: actionsCfg) => void;

// interface EventWrapperSetup<T> {
//   incoming: actionsCfg2<T>;
//   outgoing: actionsCfg2<T>;
// }

// interface ActionsSetters {
//   incoming: (setup: actionsCfg) => void;
//   outgoing: (setup: actionsCfg) => void;
// }

// type TargetMethods<T> = { [P in keyof T]: T[P] }


// export class EventWrapper<T> {

//   private _incoming: actionsCfg2<T>;
//   private _outgoing: actionsCfg2<T>;

//   constructor(target: T, setup?: EventWrapperSetup<T>): EventWrapper<T> & T {
//     this._incoming = {};
//     this._outgoing = {};

//     return this._decorate(target);
//   }

//   public addIncoming(actions: actionsCfg2<T>) {
//    this._register(this._incoming, actions); 
//   }

//   public addOutgoing(actions: actionsCfg) {
//     this._register(this._outgoing, actions);
//   }


//   public destroy() {
    
//   }

//   private _register(actions: actionsCfg, type: actionsCfg): void {
//     Object.keys(actions).forEach(key => {
//       const isExists = type.hasOwnProperty(key);
//       if (isExists) {
//         type[key] = [...type[key], ...actions[key]]
//       } else {
//         type[key] = actions[key];
//       }
//     });
//   }

//   private _decorate(object: T): EventWrapper<T> & keyof T {
//     const proxy = new Proxy(object, {
//       get: function(target, thisArg, argumentsList) {
//         if (typeof target === "function") {
//           return (...args) => {
//             target.call(args);
//             this._incoming[name].forEach(func => func());
//           }
//         } else {
//           return target;
//         }
//       }
//     });
//     return proxy;
//   }


//   private _listen(action: actionsCfg) {
//     action.
//   }
// }






































// @SubscribeMessage('message')
// handleMessage(client: Socket, payload: any): string {
//   console.log('web socket');
//   console.log(this.socket === client);

//   this.socket = client;
//   return 'Hello world!';
// }

// @SubscribeMessage('create')
// handleCreate(client: Socket, payload: any) {

//   console.log('create');
//   client.join('room');
// }

// @SubscribeMessage('leave')
// handleLeave(client: Socket) {
//   console.log('leave');
//   client.leave('room');
// }

// emitMessage(roomName: string, payload: string): void {
//   console.log('emit', roomName);
//   this.server.to(roomName).emit('message', payload);
// }