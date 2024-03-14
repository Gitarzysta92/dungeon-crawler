import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { NotEnumerable } from "../../../../extensions/object-traverser";
import { Constructor, Guid } from "../../../../extensions/types";
import { AreaService } from "../../areas.service";
import { IArea, IAreaConnection, IAreaDeclaration, INestedArea } from "./area.interface";

export class AreaFactory implements IEntityFactory<IArea> {

  constructor(
    private readonly _eventService: EventService,
    private readonly _areaService: AreaService
  ) { }
    
  public validate(e: IEntity & Partial<IArea>): boolean {
    return e.isArea;
  };

  public create(e: typeof Entity): Constructor<IArea> {
    const eventService = this._eventService;
    const areaService = this._areaService;
    class Area extends e implements IArea {
      isArea = true as const;
      nestedAreas?: INestedArea[];
      areaConnections: IAreaConnection[];
      unlockWhen: IEventListenerDeclaration<unknown>[];
      isUnlocked: boolean;

      @NotEnumerable()
      get occupier() { return this._areaService.getOccupierFor(this) }

      @NotEnumerable()
      get residents() { return this._areaService.getResidentsFor(this) }

      private readonly _eventService: EventService = eventService;
      private readonly _areaService: AreaService = areaService

      constructor(d: IAreaDeclaration) {
        super(d);
        this.nestedAreas = d.nestedAreas;
        this.areaConnections = d.areaConnections;
        this.unlockWhen = d.unlockWhen;
        this.isUnlocked = d.isUnlocked;
      }

      protected onInitialize(): void {
        this._eventService.listen(this._unlockTriggerHandler);
        super.onInitialize();
      }

      public onDestroy(): void {
        this._eventService.stopListening(this._unlockTriggerHandler);
        super.onDestroy();
      }

      public hasConnection(areaId: Guid): boolean {
        return this.areaConnections.some(c => c.toAreaId === areaId);
      }

      public getTravelCost(areaId): number {
        return this.areaConnections.find(c => c.toAreaId === areaId).distance ?? -1;
      }

      private _unlockTriggerHandler = (e) => {
        for (let unlock of this.unlockWhen) {
          if (e.isApplicableTo(unlock)) {
            this.isUnlocked = true;
          }
          for (let na of this.nestedAreas) {
            for (let unlock of na.unlockWhen) {
              if (e.isApplicableTo(unlock)) {
                this.isUnlocked = true;
              }   
            }
          }
        }
      }
    }
    return Area;
  };
}