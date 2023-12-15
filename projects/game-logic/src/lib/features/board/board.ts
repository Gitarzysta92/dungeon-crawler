import { IDictionary } from "../../extensions/types";
import { BoardField } from "./board-field";
import { Size } from "./board.constants";
import { IBoardCoordinates, IAassignedBoardObject, IBoardSelector, IField, IBoard, IBoardObjectRotation, IBoardSelectorOrigin, IBoardObject, IBoardSelectorDeterminant, IVectorAndDistanceEntry } from "./board.interface";
import { CoordsHelper } from "./coords.helper";
import { RotationHelper } from "./rotation.helper";

export class Board<K = {}> implements IBoard<K> {

  public fields: IDictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, BoardField>;
  public objects: IDictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, K & IAassignedBoardObject>;

  public get objectList() { return Object.values(this.objects) }

  constructor(data: IBoard<K>) {
    this.fields = Object.fromEntries(Object
      .entries(data.fields)
      .map(f => [f[0], new BoardField(f[1], () => this.isFieldOccupied(f[1]))]));
    this.objects = data.objects;
  }


  public getObjectsAsArray<T>(): (K & T & IAassignedBoardObject)[] {
    return Object.values(this.objects) as (K & T & IAassignedBoardObject)[];
  }


  public isFieldOccupied(field: IField): boolean {
    return !!this.objects[CoordsHelper.createKeyFromCoordinates(field.position)];
  }


  public getObjectById<T extends { id: string }>(id: string): (K & T & IAassignedBoardObject) | undefined {
    return Object.values(this.objects).find(o => o.id === id) as (K & T & IAassignedBoardObject);
  }


  public getFieldByAssignedObjectId(id: string): BoardField | undefined {
    const object = this.getObjectById(id);
    return this.fields[CoordsHelper.createKeyFromCoordinates(object.position)]
  }

  public getFieldByPosition(position: IBoardCoordinates): BoardField | undefined {
    return this.fields[CoordsHelper.createKeyFromCoordinates(position)]
  }


  public getObjectByPosition(position: IBoardCoordinates): (K & IAassignedBoardObject) {
    return this.objects[CoordsHelper.createKeyFromCoordinates(position)];
  }


  public getObjectFromField<T>(coords: IBoardCoordinates): (K & T & IAassignedBoardObject) | undefined {
    return this.objects[CoordsHelper.createKeyFromCoordinates(coords)] as (K & T & IAassignedBoardObject)
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


  public assignObject<T extends IBoardObject & K>(object: T, field: IField, rotation: IBoardObjectRotation): void {
    const boardField = this.fields[CoordsHelper.createKeyFromCoordinates(field.position)];
    
    if (boardField.isOccupied()) {
      throw new Error("Cannot assign object to given field, because it is occupied")
    }

    this.objects[CoordsHelper.createKeyFromCoordinates(field.position)] = Object.assign(object, {
      position: field.position,
      rotation: rotation,
    });
  }


  public unassignObject(object: IAassignedBoardObject) {
    if (!object.position) {
      throw new Error("Object is already unassigned from the board")
    }
    delete this.objects[CoordsHelper.createKeyFromCoordinates(object.position)];
    delete (object as Partial<IAassignedBoardObject>).position;
  }


  public getObjectsBySelector<T>(selector: IBoardSelector): (K & T & IAassignedBoardObject)[] {
    return this.getFieldsBySelector(selector)
      .map(f => this.objects[CoordsHelper.createKeyFromCoordinates(f.position)])
      .filter(o => !!o) as (K & T & IAassignedBoardObject)[]
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

      if (selector.selectorType === "line") {
        boardFields = this._selectFieldsByLine(selector);
      }

      if (selector.selectorType === "cone") {
        boardFields = this.selectFieldsByCone(selector);
      }

      if (selector.selectorType === "radius") {
        boardFields = this.selectFieldsByRadius(selector);
      }
    }

    return boardFields;
  }


  private selectFieldsByRadius(selector: IBoardSelector): BoardField[] {
    return CoordsHelper.getCircleOfCoordinates(
      selector.selectorOrigin.position,
      selector.selectorRange,
      (coords) => {
        const field = this.getFieldByPosition(coords);
        const object = this.getObjectByPosition(coords);
        return field.isOccupied() && selector.traversableSize <= object?.size;
      }
    ).map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)])
  }

  
  private selectFieldsByCone(selector: IBoardSelector): BoardField[] {
    if (!selector.selectorOrigin.outlets) {
      throw new Error("Selector origin outlets must be provided for CONE selector type");
    }
    const actualOutlets = RotationHelper.calculateActualOutlets(selector.selectorOrigin.outlets, selector.selectorOrigin.rotation!);
    return actualOutlets.flatMap(direction => {
      return CoordsHelper.getConeOfCoordinates(
        selector.selectorOrigin.position,
        direction,
        selector.selectorRange,
        (coords) => {
          const field = this.getFieldByPosition(coords);
          const object = this.getObjectByPosition(coords);
          return field.isOccupied() && selector.traversableSize <= object?.size;
        }
      );
    }).map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)]);

  }

  private _selectFieldsByLine(selector: IBoardSelector): BoardField[] {
    if (!selector.selectorOrigin?.outlets) {
      throw new Error("Selector origin outlets must be provided for LINE selector type");
    }
    const actualOutlets = RotationHelper.calculateActualOutlets(selector.selectorOrigin.outlets, selector.selectorOrigin.rotation!);
    return actualOutlets.flatMap(direction => {
      return CoordsHelper.getLineOfCoordinates(
        selector.selectorOrigin.position,
        direction,
        selector.selectorRange,
        (coords) => {
          const field = this.getFieldByPosition(coords);
          const object = this.getObjectByPosition(coords);
          return field && ( !field.isOccupied() || field?.isOccupied() && selector.traversableSize >= object?.size);
        }
      ).map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)])
    })
  }


  public checkIfObjectsAreAdjacent(origin: IBoardSelectorOrigin, adjacent: IAassignedBoardObject): boolean {
    const adjacentObjects = this.getObjectsBySelector({
      selectorType: "radius",
      selectorOrigin: origin,
      selectorRange: 1,
      traversableSize: 3
    });

    return adjacentObjects.some(o => o.id === adjacent.id)
  }


  public getAdjencedObjects<T>(position: IBoardCoordinates): (K & T & IAassignedBoardObject)[] {
    return CoordsHelper.getCircleOfCoordinates(position, 1)
      .map(c => this.objects[CoordsHelper.createKeyFromCoordinates(c)])
      .filter(o => !!o) as (K & T & IAassignedBoardObject)[]
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
    origin: Partial<IAassignedBoardObject>,
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
        
    return CoordsHelper.createVectorDistanceMap(from, occupiedCoords, allCoords);
  }


  private _validateSelectorOriginAgainstBoardSelector(
    origin: Partial<IAassignedBoardObject>,
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



// private _select(): void {
//   const fields = coordinates.map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)]);
//   const objects = fields.filter(f => f.isOccupied()).map(f => this.objects[f.id]).filter(o => !selector.traversableSizes.includes(o.size));
  
//   const vectorMap = CoordsHelper.createVectorDistanceMap(selector.selectorOrigin.position, [], coordinates);
//   const coordinatesToSubstract = Array.from(vectorMap.values())
//     .filter(entry => objects.some(o => CoordsHelper.isCoordsEqual(entry.coords, o.position)))
//     .flatMap(entry => CoordsHelper.getLineOfCoordinates(entry.coords, entry.vector + 3 as IBoardObjectRotation, selector.selectorRange));
  
//   return coordinates.map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)])
// }