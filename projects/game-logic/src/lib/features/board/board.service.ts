import { BoardField } from "./board-field";
import { BoardHelper } from "./board.helper";
import { IBoardCoordinates, IAassignedBoardObject, IBoardSelector, IBoardState, IBoardObjectRotation, IBoardSelectorOrigin, IBoardObject, IBoardSelectorDeterminant, IVectorAndDistanceEntry, IBoardField } from "./board.interface";
import { CoordsHelper } from "./coords.helper";
import { RotationHelper } from "./rotation.helper";


export class BoardService implements IBoardState {

  constructor(
    public fields: IBoardField[],
    public objects: IBoardObject[],
  ) {
    // Object.fromEntries(Object.entries(data.fields)
    // .map(f => [f[0], new BoardField(f[1], () => this.isFieldOccupied(f[1]))]));
  }


  public getObjectById<T extends { id: string }>(id: string): (O & T & IAassignedBoardObject) | undefined {
    return Object.values(this.objects).find(o => o.id === id) as (O & T & IAassignedBoardObject);
  }


  public getFieldByAssignedObjectId(id: string): BoardField | undefined {
    const object = this.getObjectById(id);
    return this.fields[CoordsHelper.createKeyFromCoordinates(object.position)]
  }

  public getFieldByPosition(position: IBoardCoordinates): BoardField | undefined {
    return this.fields[CoordsHelper.createKeyFromCoordinates(position)]
  }


  public getObjectByPosition(position: IBoardCoordinates): (O & IAassignedBoardObject) {
    return this.objects[CoordsHelper.createKeyFromCoordinates(position)];
  }


  public getObjectFromField<T>(coords: IBoardCoordinates): (O & T & IAassignedBoardObject) | undefined {
    return this.objects[CoordsHelper.createKeyFromCoordinates(coords)] as (O & T & IAassignedBoardObject)
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


  public assignObject<T extends IBoardObject & O>(object: T, field: IField, rotation: IBoardObjectRotation): void {
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


  public getObjectsBySelector<T>(selector: IBoardSelector): (O & T & IAassignedBoardObject)[] {
    return this.getFieldsBySelector(selector)
      .map<O & T & IAassignedBoardObject>(f => this.objects[CoordsHelper.createKeyFromCoordinates(f.position)])
      .filter(o => !!o)
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
    ).reduce((acc, c) => {
      const field = this.fields[CoordsHelper.createKeyFromCoordinates(c)]
      return field ? [...acc, field] : acc;
    }, [])
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
          if (!field) {
            return;
          }
          const object = this.getObjectByPosition(coords);
          return !object || selector.traversableSize <= object?.size;
        }
      );
    }).reduce((acc, c) => {
      const field = this.fields[CoordsHelper.createKeyFromCoordinates(c)]
      return field ? [...acc, field] : acc;
    }, [])

  }

  private _selectFieldsByLine(selector: IBoardSelector): BoardField[] {
    if (!selector.selectorOrigin?.outlets) {
      throw new Error("Selector origin outlets must be provided for LINE selector type");
    }
    const actualOutlets = RotationHelper.calculateActualOutlets(selector.selectorOrigin.outlets, selector.selectorOrigin.rotation!);
    return actualOutlets.flatMap(direction => {
      let nonSelectable = [];
      return CoordsHelper.getLineOfCoordinates(
        selector.selectorOrigin.position,
        direction,
        selector.selectorRange,
        (coords) => {
          const field = this.getFieldByPosition(coords);
          if (!field) {
            return;
          }
          if (nonSelectable.includes(field)) {
            return;
          }
          const object = this.getObjectByPosition(coords);
          console.log(coords, this.objects, object)
          if (object && selector.traversableSize < object?.size) {
            nonSelectable = nonSelectable
              .concat(CoordsHelper.getLineOfCoordinates(coords, direction, selector.selectorRange)
                .map(c => this.fields[CoordsHelper.createKeyFromCoordinates(c)]))
                console.log(nonSelectable)
          }

          return true;
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
    const result = BoardHelper.validateSelectorOriginAgainstBoardSelector(origin, selector);
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

}