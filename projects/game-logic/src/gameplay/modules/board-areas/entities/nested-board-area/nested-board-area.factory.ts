  import { IActivitySubject } from "../../../../../lib/base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../../lib/cross-cutting/event/event.interface";
import { EventService } from "../../../../../lib/cross-cutting/event/event.service";
import { NotEnumerable } from "../../../../../lib/infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { INestedArea } from "../../../../../lib/modules/areas/entities/area/area.interface";
import { IBoardField } from "../../../../../lib/modules/board/entities/board-field/board-field.interface";
import { BoardAreaService } from "../../board-area.service";
import { BOARD_TRAVEL_ACTIVITY } from "../../board-areas.constants";
import { INestedBoardArea, INestedBoardAreaDeclaration } from "./nested-board-area.interface";



export class NestedBoardAreaFactory implements IMixinFactory<INestedBoardArea> {

  constructor(
    private readonly _eventService: EventService,
    private readonly _boardAreaService: BoardAreaService,
  ) { }
    
  public isApplicable(e: IEntityDeclaration & Partial<INestedBoardArea>): boolean {
    return e.isNestedBoardArea;
  };

  public create(e: Constructor<IEntity & IActivitySubject & IBoardField>): Constructor<INestedBoardArea> {
    const eventService = this._eventService;
    const boardAreaService = this._boardAreaService;
    class BoardArea extends e implements INestedBoardArea {
      isNestedBoardArea = true as const;
      nestedAreas?: INestedArea[];
      unlockWhen: IEventListenerDeclaration<unknown>[];
      isUnlocked: boolean;
      terrainDifficulty: number;

      @NotEnumerable()
      get traveler() { return boardAreaService.getTraveler() }

      @NotEnumerable()
      get residents() { return boardAreaService.getResidentsFor(this) }

      @NotEnumerable()
      get isTravelable() { return this.activities.some(a => a.id === BOARD_TRAVEL_ACTIVITY) }

      get position() { return boardAreaService.getRootArea(this).position }

      constructor(d: INestedBoardAreaDeclaration) {
        super(d);
        this.nestedAreas = d.nestedAreas;
        this.unlockWhen = d.unlockWhen;
        this.isUnlocked = d.isUnlocked;
      }
     

      public onInitialize(): void {
        eventService.listen(this._unlockTriggerHandler);
        super.onInitialize();
      }


      public onDestroy(): void {
        eventService.stopListening(this._unlockTriggerHandler);
        super.onDestroy();
      }


      public traverseNestedAreas<T extends INestedArea>(cb: (area: T) => void) {
        return boardAreaService.traverseNestedAreas<T>(this as unknown as T, cb)
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
    return BoardArea;
  };
}