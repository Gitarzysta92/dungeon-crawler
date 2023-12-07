import { IDictionary } from "../../extensions/types";
import { Outlet } from "../actors/actors.constants";
import { BoardField } from "./board-field";
import { IBoardCoordinates, IBoardObject, IBoardSelector, IField, IBoard, IBoardObjectRotation, IBoardSelectorOrigin, IUnassignedBoardObject, IBoardSelectorDeterminant, IVectorAndDistanceEntry } from "./board.interface";
import { CoordsHelper } from "./coords.helper";
import { RotationHelper } from "./rotation.helper";

export class Board<K = {}> implements IBoard<K> {

  public fields: IDictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, BoardField>;
  public objects: IDictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, K & IBoardObject>;

  public get objectList() { return Object.values(this.objects) }

  constructor(data: IBoard<K>) {
    this.fields = Object.fromEntries(Object
      .entries(data.fields)
      .map(f => [f[0], new BoardField(f[1], () => this.isFieldOccupied(f[1]))]));
    this.objects = data.objects;
  }


  public getObjectsAsArray<T>(): (K & T & IBoardObject)[] {
    return Object.values(this.objects) as (K & T & IBoardObject)[];
  }


  public isFieldOccupied(field: IField): boolean {
    return !!this.objects[CoordsHelper.createKeyFromCoordinates(field.position)];
  }


  public getObjectById<T extends { id: string }>(id: string): (K & T & IBoardObject) | undefined {
    return Object.values(this.objects).find(o => o.id === id) as (K & T & IBoardObject);
  }


  public getFieldByAssignedObjectId(id: string): BoardField | undefined {
    const object = this.getObjectById(id);
    return this.fields[CoordsHelper.createKeyFromCoordinates(object.position)]
  }

  public getFieldByPosition(position: IBoardCoordinates): BoardField | undefined {
    return this.fields[CoordsHelper.createKeyFromCoordinates(position)]
  }


  public getObjectByPosition(position: IBoardCoordinates): (K & IBoardObject) {
    return this.objects[CoordsHelper.createKeyFromCoordinates(position)];
  }


  public getObjectFromField<T>(coords: IBoardCoordinates): (K & T & IBoardObject) | undefined {
    return this.objects[CoordsHelper.createKeyFromCoordinates(coords)] as (K & T & IBoardObject)
  }


  public moveObject(actorId: string, field: IField, rotation: IBoardObjectRotation): void {
    const object = this.getObjectById(actorId);
    if (!object) {
      throw new Error("Cannot find object for move operation");
    }

    object.rotation = rotation;

    this.unassignObject(object);
    this.assignObject(object, field, object.rotation);
  }


  public assignObject<T extends IUnassignedBoardObject & K>(object: T, field: IField, rotation: IBoardObjectRotation): void {
    const boardField = this.fields[CoordsHelper.createKeyFromCoordinates(field.position)];
    
    if (boardField.isOccupied()) {
      throw new Error("Cannot assign object to given field, because it is occupied")
    }

    this.objects[CoordsHelper.createKeyFromCoordinates(field.position)] = Object.assign(object, {
      position: field.position,
      rotation: rotation,
    });
  }


  public unassignObject(object: IBoardObject) {
    if (!object.position) {
      throw new Error("Object is already unassigned from the board")
    }
    delete this.objects[CoordsHelper.createKeyFromCoordinates(object.position)];
    delete (object as Partial<IBoardObject>).position;
  }


  public getObjectsBySelector<T>(selector: IBoardSelector): (K & T & IBoardObject)[] {
    return this.getFieldsBySelector(selector)
      .map(f => this.objects[CoordsHelper.createKeyFromCoordinates(f.position)])
      .filter(o => !!o) as (K & T & IBoardObject)[]
  }


  public getNonOccupiedFieldsBySelector(selector: IBoardSelector): BoardField[] {
    return this.getFieldsBySelector(selector).filter(f => !f.isOccupied())
  }


  public getFieldsBySelector(selector: IBoardSelector): BoardField[] {
    let boardFields: BoardField[] = [];
    if (selector.selectorType !== "global" && !selector.selectorOrigin) {
      throw new Error("Selector origin must be provided for given selector type");
    }

    if (selector.selectorType === "global") {
      boardFields = Object.values(this.fields);
    } else if (!!selector.selectorOrigin) {
      if (selector.selectorRange == null) {
        throw new Error("Selector range must be provided for LINE, CONE and RADIUS selector type")
      }

      if (!selector.selectorOrigin.position) {
        throw new Error("Selector origin must have provided position for LINE, CONE and RADIUS selector type")
      }

      let coordinates: IBoardCoordinates[] = [];
      if (selector.selectorType === "line") {
        if (!selector.selectorOrigin?.outlets) {
          throw new Error("Selector origin outlets must be provided for LINE selector type");
        }
        const actualOutlets = RotationHelper.calculateActualOutlets(selector.selectorOrigin.outlets, selector.selectorOrigin.rotation!);
        for (let direction of actualOutlets) {
          coordinates = CoordsHelper.getLineOfCoordinates(selector.selectorOrigin.position, direction, selector.selectorRange);
        }
      }

      if (selector.selectorType === "cone") {
        if (!selector.selectorOrigin.outlets) {
          throw new Error("Selector origin outlets must be provided for CONE selector type");
        }
        const actualOutlets = RotationHelper.calculateActualOutlets(selector.selectorOrigin.outlets, selector.selectorOrigin.rotation!);
        for (let direction of actualOutlets) {
          coordinates = CoordsHelper.getConeOfCoordinates(selector.selectorOrigin.position, direction, selector.selectorRange);
        }
      }

      if (selector.selectorType === "radius") {
        coordinates = CoordsHelper.getCircleOfCoordinates(selector.selectorOrigin.position, selector.selectorRange);
      }
      boardFields = boardFields.concat(coordinates.map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)]))
    }
    return boardFields.filter(o => !!o);
  }


  public checkIfObjectsAreAdjacent(origin: IBoardSelectorOrigin, adjacent: IBoardObject): boolean {
    const adjacentObjects = this.getObjectsBySelector({
      selectorType: "radius",
      selectorOrigin: origin,
      selectorRange: 1,
    });

    return adjacentObjects.some(o => o.id === adjacent.id)
  }


  public getAdjencedObjects<T>(position: IBoardCoordinates): (K & T & IBoardObject)[] {
    return CoordsHelper.getCircleOfCoordinates(position, 1)
      .map(c => this.objects[CoordsHelper.createKeyFromCoordinates(c)])
      .filter(o => !!o) as (K & T & IBoardObject)[]
  }


  public determineValidOriginsForSelector(selector: IBoardSelectorDeterminant & { isCaster: false }): (K & IBoardSelectorOrigin)[] {
    if (selector.selectorType === 'global') {
      return (Object.values(this.fields) as unknown as (K & IBoardSelectorOrigin)[])
        .concat(Object.values(this.objects) as (K & IBoardSelectorOrigin)[])
        .filter(s => selector.requireOutlets ? Array.isArray(s.outlets) : true);
    }

    const fields = this.getFieldsBySelector(selector) as unknown as (K & IBoardSelectorOrigin)[];
    if (selector.selectorType === 'radius') {
      return fields;
    }
    return fields.concat(this.getObjectsBySelector<IBoardSelectorOrigin>(selector))
      .filter(s => selector.requireOutlets ? Array.isArray(s.outlets) : true);
  }


  public validateSelectorOriginAgainstBoardSelector(
    origin: Partial<IBoardObject>,
    selector: Omit<IBoardSelector, 'selectorOriginDeterminant'>
  ): IBoardSelectorOrigin {
    const result = this._validateSelectorOriginAgainstBoardSelector(origin, selector);
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    return origin as IBoardSelectorOrigin
  }

  public findShortestPathBetweenCoordinates(
    from: IBoardCoordinates,
    to: IBoardCoordinates,
    vectorMap: Map<string, IVectorAndDistanceEntry>
  ): IVectorAndDistanceEntry[] {
    return CoordsHelper.findShortestPathBetweenCoordinates(from, to, vectorMap);
  }


  public generateBoardCoordinatesVectorMap(
    from: IBoardCoordinates,
    occupiedCoords?: IBoardCoordinates[]
  ): Map<string, IVectorAndDistanceEntry> {

    if (!occupiedCoords) {
      occupiedCoords = Object.values(this.fields)
      .filter(f => f.isOccupied())
      .map(f => f.position);
    }

    const allCoords = Object.values(this.fields)
      .map(f => f.position);
        
    return CoordsHelper.createVectorAndDistanceMap(from, occupiedCoords, allCoords);
  }


  private _validateSelectorOriginAgainstBoardSelector(
    origin: Partial<IBoardObject>,
    selector: Omit<IBoardSelector, 'selectorOriginDeterminant'>
  ): { valid: boolean, errorMessage?: string } {
    const hasNotDeclaredPosition = (
      selector.selectorType === 'cone' ||
      selector.selectorType === 'line' ||
      selector.selectorType === 'radius'
    ) && !origin.position;
    if (hasNotDeclaredPosition) {
      return {
        valid: false,
        errorMessage: "LINE, CONE and RADIUS selector must have provided position"
      }
    }

    const hasNotDeclaredOutlets = (
      selector.selectorType === 'cone' ||
      selector.selectorType === 'line'
    ) && !Array.isArray(origin.outlets);
    if (hasNotDeclaredOutlets) {
      return {
        valid: false,
        errorMessage: "LINE and CONE selector must have provided position"
      }
    }

    return { valid: true }
  }
}