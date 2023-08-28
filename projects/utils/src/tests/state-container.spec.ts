import { Subject } from 'rxjs';
import { count, takeUntil } from 'rxjs/operators';
import { StateContainer } from '../';


describe('State container', () => {
  let stateContainer: StateContainer<number[]> ;

  beforeEach(() => {
    stateContainer = new StateContainer([1, 2, 3, 4, 5]);
  });

  it('should be initialized', () => {
    expect(stateContainer).toBeInstanceOf(StateContainer);
  });

  it('shoud emit state value for given new state', done => {
    const newState = [1, 2, 3];

    stateContainer.changed
      .subscribe(x => {
        expect(x).toEqual(newState);
        done();
      });
    stateContainer.set(newState);
  });

  it('shoud emit state once for given new state', done => {
    const asd = new Subject();
    stateContainer.changed
      .pipe(takeUntil(asd))
      .pipe(count())
      .subscribe(x => {
        expect(x).toEqual(2);
        done();
      });
    
    const firstState = [1, 2, 3];
    stateContainer.set(firstState);
    stateContainer.set(firstState)

    const secondState = [4, 5];
    stateContainer.set(secondState);
    stateContainer.set(secondState);

    asd.next();
  });
});



describe('predefined state container', () => {
  enum STATE { First, Second };
  let stateContainer: StateContainer<STATE> ;
  
  beforeEach(() => {
    stateContainer = new StateContainer(STATE.First, [STATE.First, STATE.Second]);
  });

  it('should be initialized', () => {
    expect(stateContainer).toBeInstanceOf(StateContainer);
  });

  it('shoud emit state value for given new state', done => {
    stateContainer.changed
      .subscribe(x => {
        expect(x).toEqual(STATE.Second);
        done();
      });
    stateContainer.set(STATE.Second);
  });

  it('shoud emit state once for given new state', done => {
    const asd = new Subject();
    stateContainer.changed
      .pipe(takeUntil(asd))
      .pipe(count())
      .subscribe(x => {
        expect(x).toEqual(2);
        done();
      });
    
    stateContainer.set(STATE.Second);
    stateContainer.set(STATE.Second);
    stateContainer.set(STATE.First);
    stateContainer.set(STATE.First);

    asd.next();
  });
});

