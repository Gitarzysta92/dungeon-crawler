
import { TasksQueue } from "../../internals/tasks/tasks-queue";


export class SelectionDispatcher {
  
  //mousemove$: ConnectableObservable<MouseEvent>;
  
  public selections: { [key: symbol]: any } = {};


  constructor(
    private _tasksQueue: TasksQueue
  ) { }

  select(x: any): void {

  }
}





// class SelectTask<T extends Selectable> implements ContinousTask {

//   public continue: boolean = true;
//   public object: T;

//   private x!: number;
//   private y!: number;

//   private _coordsProvider: (x: number, y: number) => Vector3 | false;

//   private destroy$ = new Subject<void>();

//   constructor(
//     object: T, 
//     coordsProvider: (x: number, y: number) => Vector3 | false,
//     mousemove$: Observable<MouseEvent>
//   ) {
//     this.object = object;
//     this._coordsProvider = coordsProvider;

//     mousemove$
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(e => {
//         this.x = (e.clientX / window.innerWidth) * 2 - 1;
//         this.y = -(e.clientY / window.innerHeight) * 2 + 1;
//       });
//   }

//   public perform = () => {
//     const coords = this._coordsProvider(this.x, this.y);
//     if (!coords) return;
//     coords.y = this.object.coords.y;
//     this.object.setCoords(coords)
//   }


//   public finish(): void {
//     this.continue = false;
//     this.destroy$.next();
//   }
// }