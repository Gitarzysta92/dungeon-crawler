import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private _bus: Subject<Event> = new Subject();
  public get listen(): Subject<Event> { return this._bus; }

  constructor() { }

  dispatch(name: any, payload?: any): any {
    this._bus.next(new Event({ name, payload }))
  }
}


export class Event {
  public name: any;
  public payload: any;
  constructor(data: Event) {
    this.name = data.name;
    this.payload = data.payload;
  }
}