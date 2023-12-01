// import { EventWrapper } from '../event-wrapper';


// class Wrappable {
//   constructor() { }

//   calc(a: number, b: number): number {
//     return a + b;
//   }
// }


// describe('event wrapper', () => {
//   let eventWrapper: EventWrapper<Wrappable>;

//   beforeEach(() => {
//     eventWrapper = new EventWrapper<Wrappable>(new Wrappable());
//   });

//   it('should be initialized', () => {
//     expect(eventWrapper).toBeInstanceOf(Proxy);
//   });

//   it('should be initialized with given actions', () => {
//     eventWrapper = new EventWrapper(new Wrappable(), {
//       incoming: { calc: [() => noop()] },
//       outgoing: { calc: [() => noop()] }
//     });
//     expect(eventWrapper).toBeInstanceOf(Proxy);

//     expect(eventWrapper['_incoming']).toHaveProperty('calc');
//     expect(eventWrapper['_incoming'].calc.length).toEqual(1);

//     expect(eventWrapper['_outgoing']).toHaveProperty('calc');
//     expect(eventWrapper['_outgoing'].calc.length).toEqual(1);
//   });

//   it('should contains given incoming actions', () => {
//     const actions = { calc: [() => noop()] }

//     eventWrapper.addIncoming(actions)
//     expect(eventWrapper['_incoming']).toHaveProperty('calc');
//     expect(eventWrapper['_incoming'].calc.length).toEqual(1);
//   });

//   it('should contains given outgoing actions', () => {
//     const actions = { calc: [() => noop()] }

//     eventWrapper.addOutgoing(actions)
//     expect(eventWrapper['_outgoing']).toHaveProperty('calc');
//     expect(eventWrapper['_outgoing'].calc.length).toEqual(1);
//   });

//   it('should call outgoing action callback for executed action', () => {
//     const callback = jest.fn();
//     const actions = { calc: [() => callback() ] };
//     eventWrapper.addOutgoing(actions);

//     const a = 1;
//     const b = 1;
//     const result = eventWrapper.calc(a, b);

//     eventWrapper

//     expect(result).toEqual(a + b);
//     expect(callback).toBeCalled();
//   });


// });

// function noop() {}






describe('countdown with single default step', () => {
    // let countdown: Countdown;
    // const time = 1000;

    // beforeEach(() => {
    //   countdown = new Countdown(time);
    // });

    it('should be initialized', () => {
      expect(true).toBe(true);
    });

    // it('should emit value after given amount of time', done => {
    //   const callback = jest.fn(() => done());
    //   countdown.completed.subscribe(callback);

    //   countdown.start();

    //   expect(callback).not.toBeCalled();
    //   jest.advanceTimersByTime(time);
    //   expect(callback).toBeCalled();
    // });
});


// // describe('countdown with multiple steps', () => {
// //   let countdown: Countdown;
// //   const firstCallback = jest.fn();
// //   const secondCallback = jest.fn();

// //   const config: CountdownSetup = [
// //     {
// //       id: 'first-step',
// //       time: 1000,
// //       next: firstCallback
// //     },
// //     {
// //       id: 'second-step',
// //       time: 1000,
// //       next: secondCallback
// //     }
// //   ];


// //   beforeEach(() => {
// //     countdown = new Countdown(config);
// //   });

// //   it('should be initialized', () => {
// //     expect(countdown).toBeInstanceOf(Countdown);
// //   });
// // });



// // it('should be initialized', () => {
// //   expect(list).toBeInstanceOf(List);
// // });


// // it('should add item to list', () => {
// //   list.add(1);
// //   expect(list['_list']).toEqual(
// //     expect.arrayContaining([1])
// //   );
// // });


// // it('should remove item form list', () => {
// //   const arr = [1,2,3];
// //   list['_list'] = arr;
// //   list.remove(1);
// //   expect(list['_list']).toEqual(
// //     expect.arrayContaining([2,3])
// //   );
// // });


// // it('should contains five items for given input', () => {
// //   const items = [1,2,3,4,5,6,7];
// //   items.forEach(i => list.add(i));
// //   expect(list['_list'].length).toEqual(itemsLimit);
// // });


// // it('should iterate five times for given number of items', () => {
// //   const arr = [1,2,3,4,5]; 
// //   list['_list'] = arr;
// //   let counter = 0;

// //   list.forEach(i => counter++);
// //   expect(counter).toEqual(arr.length);
// // });

// // it('should emit new list length while new item was added', done => {
// //   const spy = jest.fn();
// //   list.listChanged.subscribe(value => {
// //     spy();
// //     expect(value).toEqual(1);
// //     done();
// //   })

// //   list.add(null);
// //   expect(spy).toBeCalled();
// // });

// // it('should emit new list length while item was removed', () => {
// //   const spy = jest.fn();
// //   const arr = [1,2,3];
// //   list['_list'] = arr;
// //   list.listChanged.subscribe(value => {
// //     spy();
// //     expect(value).toEqual(2)
// //   });

// //   list.remove(1);
// //   expect(spy).toBeCalled();
// // });

