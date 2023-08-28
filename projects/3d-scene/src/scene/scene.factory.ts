import { connectable, fromEvent, merge, Observable, ReplaySubject } from "rxjs";
import { TextureLoader } from "three";
import { ActorsManager } from "../lib/actors/actors-manager";
import { AnimationDispatcher } from "../lib/behaviours/animations/animation.dispatcher";
import { CollisionDispatcher } from "../lib/behaviours/collision/collision.dispatcher";
import { DragDispatcher } from "../lib/behaviours/drag/drag.dispatcher";
import { HoverDispatcher } from "../lib/behaviours/hover/hover.dispatcher";
import { BoardComponent } from "../lib/components/functional/board.component";
import { DialogComponent } from "../lib/components/functional/dialog.component";
import { RotateTileControlComponent } from "../lib/components/functional/rotate-control.component";
import { StagingComponent } from "../lib/components/functional/staging.component";
import { TilesRowComponent } from "../lib/components/functional/tiles-row.component";
import { TextureHelper } from "../lib/helpers/texture-helper";
import { PointerHandler } from "../lib/interactions/pointer/pointer-handler";
import { MainLoop } from "../lib/internals/rendering/main-loop";
import { Renderer } from "../lib/internals/rendering/renderer";
import { View } from "../lib/internals/scene/view";
import { TasksQueue } from "../lib/internals/tasks/tasks-queue";
import { SceneComposer } from "./scene-composer";
import { SceneManager } from "./scene-manager";


export interface ISceneInputs {
  pointerEvent$: Observable<PointerEvent>
}

export function bootstrapScene(inputs: any) {
  const events = merge(
    fromEvent<PointerEvent>(window, 'mousemove'),
    fromEvent<PointerEvent>(window, 'click')
  );
  inputs = { pointerEvent$: connectable(events, { connector: () => new ReplaySubject() })}
  inputs.pointerEvent$.connect();




  const mainLoop = new MainLoop(window);
  const textureLoader = new TextureLoader();
  const tasksQueue = new TasksQueue();
  const renderer = new Renderer();
  const view = new View();

  const actorsManager = new ActorsManager(view, renderer);
  const pointerHandler = new PointerHandler(actorsManager, view);

  const animationDispatcher = new AnimationDispatcher(tasksQueue);
  const dragDispatcher =  new DragDispatcher(view, tasksQueue, pointerHandler, inputs.pointerEvent$);
  const collisionsDispatcher = new CollisionDispatcher(actorsManager, tasksQueue);
  //const selectionDispatcher = new SelectionDispatcher(tasksQueue);
  const hoverDispatcher = new HoverDispatcher(tasksQueue);

  const dialogComponent = new DialogComponent(actorsManager, pointerHandler, new TilesRowComponent());
  const stagingComponent = new StagingComponent(actorsManager, pointerHandler, animationDispatcher, dragDispatcher, collisionsDispatcher, hoverDispatcher, new TilesRowComponent());
  const boardComponent = new BoardComponent(actorsManager, pointerHandler, dragDispatcher, collisionsDispatcher, animationDispatcher);
  const rotateMenuComponent = new RotateTileControlComponent(actorsManager, pointerHandler, hoverDispatcher, animationDispatcher);


  const textureHelper = new TextureHelper(renderer, textureLoader);
  const sceneComposer = new SceneComposer(
    textureHelper,
    actorsManager,
    pointerHandler,
    animationDispatcher,
    boardComponent,
    dialogComponent,
    stagingComponent,
    inputs.pointerEvent$
  );

  const sceneManager = new SceneManager(
    view,
    renderer,
    tasksQueue,
    mainLoop,
    dialogComponent,
    stagingComponent,
    boardComponent,
    sceneComposer
  );
  return {
    sceneManager,
    dialogComponent,
    stagingComponent,
    boardComponent,
    rotateMenuComponent,
  };
}