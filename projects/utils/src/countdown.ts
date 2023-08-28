import { Subject } from "rxjs";

export type CountdownSetup = ICountdownStep[] | Countdown | number;

export interface ICountdownStep {
  id?: any;
  time: number;
  next: (this: CountdownStep, ...args: any) => boolean
}

export class Countdown {
  public completed: Subject<void> = new Subject();
  private _steps: CountdownStep[] = [];

  constructor(setup: CountdownSetup) {
    if (typeof setup === 'number') {
      const step = new CountdownStep({
        time: setup,
        next: () => {
          this.completed.next();
          return true;
        }
      });
      this._steps.push(step);
    } else if (Array.isArray(setup)) {

    } else {

    }
  }

  public start(): void {
    const step = this._steps.shift();
    step && step.start();
  }

}

class CountdownStep implements ICountdownStep {
  public id: any = '';
  public time: number = 0;
  public next: ICountdownStep['next'];

  constructor(step: ICountdownStep) {
    this.id = step.id;
    this.time = step.time;
    this.next = step.next;
  };

  public start() {
    setTimeout(this.next, this.time);
  }

}



// start => x amount of time => callback => resolved/rejected => y amount of time => resolved/rejected => completed

// const countdown = new Countdown([
//   {
//     time: 1000,
//     callback: 
//   }
// ]);

// countdown.start();
// countdown.restart();
// countdown.complete();
// countdown.next();

// countdown.restarted.subscribe();
// countdown.completed.subscribe();
// countdown.stepReached.subscribe();


