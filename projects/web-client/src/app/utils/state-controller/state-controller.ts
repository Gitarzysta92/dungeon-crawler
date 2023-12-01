import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

export class State {
  name: string;
  isFocused: boolean = false;
  submitted: boolean = false;
  validationError: boolean = null;
  submitSuccess: boolean = null;
  nextStates: string[] = [];

  stateChanger: (stateName: string) => void = () => null;

  constructor(data: Partial<State>) {
    this._setProperties(data);
  }

  public setName(value: string): void {
    this.name = value;
  }

  public is(name: string): boolean {
    return this.name === name;
  }

  public next(stateName?: string): void {
    if (this.nextStates.length === 1) {
      stateName = this.nextStates[0];
    }
    this.stateChanger(stateName);
  }


  private _setProperties(data: Partial<State>): void {
    Object.keys(data).forEach(key => {
      if (key in this) this[key] = data[key];    
    });
  }


}

export class StateController<T extends State> {

  public get onChange() { 
    return this._state.pipe(map(s => Object.freeze(s))) 
  }

  public get currentState() {
    return this._state.value;
  }
  private _state: BehaviorSubject<T>;
  private _predefinedStates: { [key: string]: T } = {};
  
  constructor(
    stateName: string, 
    states: { [key: string]: T }, 
  ) {
    this._initializePredefinedStates(states);
    this._state = new BehaviorSubject(this._predefinedStates[stateName]);
  }


  public next(stateName: string): void {
    if (!this._isNextStateIsAvailable(stateName)) return;
    this.set(stateName);
  }

  public set(stateName: string): void {
    if (this._state.value.name === stateName) return;
    this._state.next(this._predefinedStates[stateName]);
  }

  public is(stateName: string): boolean {
    return this._state.value.is(stateName);
  }

  private _isNextStateIsAvailable(stateName: string): boolean {
    return this._state.value.nextStates.includes(stateName);
  }

  private _initializePredefinedStates(states: { [key: string]: any }): void {
    Object.keys(states).forEach(key => {
      const state = states[key];
      state.name = key;
      state.stateChanger = value => this.next(value);
      this._predefinedStates[key] = states[key];
    })
  }
}

