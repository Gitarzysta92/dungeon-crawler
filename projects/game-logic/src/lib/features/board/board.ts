import { IDictionary } from "../../extensions/types";
import { ActorType } from "../actors/actors.constants";
import { IActor } from "../actors/actors.interface";
import { IEffect } from "../effects/effect-commons.interface";
import { IBoardCoordinates, IBoardObject, IBoardSelector, IField, IBoard, IBoardObjectRotation } from "./board.interface";
import { CoordsHelper } from "./coords.helper";


type IBoardField = IField & { isOccupied: () => boolean }
type IBoardActor = IBoardObject & IActor;

export class Board implements IBoard {

  id: string;
  actorType: ActorType.Board = ActorType.Board;
  effects: IEffect[] = [];

  fields: IDictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, IBoardField>;
  objects: IDictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, IBoardActor>;


  constructor(data: IBoard) {
    this.id = data.id;
    this.effects = data.effects;
    this.fields = data.fields as IDictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, IBoardField>;
    Object.values(this.fields).map(f => Object.assign(f, { isOccupied: () => this.objects[CoordsHelper.createKeyFromCoordinates(f.coords)] }));
    this.objects = data.objects;
  }

  public getObjectById(id: string): IBoardActor | undefined {
    return Object.values(this.objects).find(o => o.id === id);
  }
  
  public getObjectFromField(coords: IBoardCoordinates): IBoardActor | undefined {
    return this.objects[CoordsHelper.createKeyFromCoordinates(coords)]
  }

  public moveObject(actorId: string, field: IBoardField, rotation: IBoardObjectRotation): void {
    const object = this.getObjectById(actorId);
    if (!object) {
      throw new Error("Cannot find object for move operation");
    }

    object.rotation = rotation;

    this.unassignObject(object);
    this.assignObject(object, field);
  }

  public assignObject(object: (IActor & IBoardActor) | string, field: IBoardField | IBoardCoordinates) {
    if (typeof object === "string") {
      object = this.getObjectById(object)!; 
    }

    if ('coords' in field) {
      field = this.fields[CoordsHelper.createKeyFromCoordinates(field.coords)];
    } else {
      field = this.fields[CoordsHelper.createKeyFromCoordinates(field)];
    }
    
    if (field.isOccupied()) {
      throw new Error("Cannot move object to given field, because it is occupied")
    }
    this.objects[CoordsHelper.createKeyFromCoordinates(field.coords)] = object;
    object.position = field.coords;
  }

  public unassignObject(object: IBoardActor) {
    if (!object.position) {
      throw new Error("Object is already unassigned from the board")
    }
    delete this.objects[CoordsHelper.createKeyFromCoordinates(object.position)];
    object.position = null;
  }

  public getSelectedObjects<T extends IBoardActor>(selector: IBoardSelector, predefinedTargets?: IBoardActor[]): T[] {
    return this.getSelectedFields(selector)
      .map(f => this.objects[CoordsHelper.createKeyFromCoordinates(f.coords)])
      .filter(o => !!o && (!predefinedTargets || predefinedTargets.some(t => t.id === o.id))) as T[]
  }

  public getNotOccupiedSelectedFields(selector: IBoardSelector, predefinedTargets?: IBoardField[]): IBoardField[] {
    return this.getSelectedFields(selector, predefinedTargets).filter(f => !f.isOccupied())
  }

  public getSelectedFields(selector: IBoardSelector, predefinedTargets?: IBoardField[]): IBoardField[] {
    let fields: IBoardField[] = [];

    if (selector.selectorType !== "global" && !selector.selectorOrigin) {
      throw new Error("Selector origin must be provided for given selector type");
    }  

    if (selector.selectorOrigin && selector.selectorType !== 'global') {
      if (selector.selectorType === "line") {
        fields = CoordsHelper.getLineOfCoordinates(selector.selectorOrigin!, CoordsHelper.mapHexSideToBoardObjectRotation(selector.selectorDirection!), selector.selectorRange!)
          .map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)])
      }
  
      if (selector.selectorType === "cone") {
        fields = CoordsHelper.getConeOfCoordinates(selector.selectorOrigin!, CoordsHelper.mapHexSideToBoardObjectRotation(selector.selectorDirection!), selector.selectorRange!)
          .map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)])
      } 
  
      if (selector.selectorType === "radius") {
        fields = CoordsHelper.getCircleOfCoordinates(selector.selectorOrigin!, selector.selectorRange!)
          .map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)])
      }
    } else {
      fields = Object.values(this.fields);
    }

    return fields.filter(o => !!o && (!predefinedTargets || predefinedTargets.some(t => o.id === t.id)));
  }

  
  public getSelectedNonOccupiedFields(selector: IBoardSelector, predefinedTargets?: IBoardField[]): IBoardField[] {
    return this.getSelectedFields(selector, predefinedTargets).filter(f => !f.isOccupied())
  }


  public checkIfObjectsAreAdjacent(main: IBoardActor, adjacent: IBoardActor): boolean {
    const adjacentObjects = this.getSelectedObjects({
      selectorType: "radius",
      selectorOrigin: main.position!,
      selectorRange: 1,
    });

    return adjacentObjects.some(o => o.id === adjacent.id)
  }

  public getAdjencedObjects<T extends IBoardActor>(position: IBoardCoordinates): T[] {
    return CoordsHelper.getCircleOfCoordinates(position, 1)
      .map(c => this.objects[CoordsHelper.createKeyFromCoordinates(c)])
      .filter(o => !!o) as T[]
  }
}