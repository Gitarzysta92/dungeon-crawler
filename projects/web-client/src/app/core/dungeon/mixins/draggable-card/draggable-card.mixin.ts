import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { ITurnGameplayPlayerDeclaration } from "@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { ICardContainer, IDraggableCard } from "./draggable-card.interface";
import { ICardOnPile } from "@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface";
import { ISerializable } from "@game-logic/lib/infrastructure/extensions/json-serializer";
import { CARDS_BOARD_DROP_LIST, CARDS_OUTLET_DROP_LIST } from "../../constants/card-drop-list.constants";

export class DraggableCardMixin implements IMixinFactory<IDraggableCard>  {

  constructor() { }

  public isApplicable(e: ICardOnPile): boolean {
    return e.isCardOnPile
  };
  
  public create(bc: Constructor<ICardOnPile & ISerializable<ICardOnPile>>): Constructor<IDraggableCard> {
    class DraggableCard extends bc implements IDraggableCard, ISerializable<ICardOnPile> {
      public isDraggableCard = true as const;
      public isDragging: boolean = false;
      public isTrashed: boolean | undefined;
      public isDiscarded: boolean | undefined;
      public currentDropList: string | undefined;
      public previousDropList: string | undefined;
      public bb: DOMRect | undefined;
      public isRestoredFromCardBoard: boolean = false;
      public params: { targetX: number; targetY: number; };
      public isDropped: boolean;
      public containerRef: WeakRef<ICardContainer>;

      constructor(d: ITurnGameplayPlayerDeclaration) {
        super(d);
      }
      
      public registerDropListChange(name: string): void {
        if (this.currentDropList === name) {
          return;
        }
        this.previousDropList = this.currentDropList;
        this.currentDropList = name;

        if (this.previousDropList === CARDS_BOARD_DROP_LIST && this.currentDropList === CARDS_OUTLET_DROP_LIST) {
          this.isRestoredFromCardBoard = true;
        } else {
          this.isRestoredFromCardBoard = false;
        }
      }

      public getParameters(elem: HTMLElement): any {
        const container = this.containerRef.deref(); 
        if (!container) {
          throw new Error("Cannot find associated container");
        }
        const relative = elem.getBoundingClientRect();
        const bb = container.elementRef.nativeElement.getBoundingClientRect();
        this.params = { targetX: bb.x, targetY: bb.y }
        return {
          targetX: -(relative.x - (this.params?.targetX ?? 0)),
          targetY: -(relative.y - (this.params?.targetY ?? 0))
        };
      }

      toJSON(): ICardOnPile {
        if (super.toJSON) {
          return super.toJSON();
        }
        const o = { ...this }
        delete o.currentDropList;
        delete o.previousDropList;
        delete o.bb;
        return o;
      }

    }
    return DraggableCard;
  };
}
