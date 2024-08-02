import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { ITurnGameplayPlayerDeclaration } from "@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { ICardContainer, IDraggableCard } from "./draggable-card.interface";
import { ICardOnPile } from "@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface";
import { ISerializable } from "@game-logic/lib/infrastructure/extensions/json-serializer";

export class DraggableCardMixin implements IMixinFactory<IDraggableCard>  {

  constructor() { }

  public static isDraggableCard(data: any): boolean {
    return data.isDraggableCard && data.isCardOnPile
  }
  
  public static asDraggableCard<T>(data: T): T & IDraggableCard {
    if (!this.isDraggableCard(data)) {
      throw new Error("Provided data is not a DraggableCard");
    } 
    return data as T & IDraggableCard;
  }


  public isApplicable(e: ICardOnPile): boolean {
    return e.isCardOnPile
  };
  
  public create(bc: Constructor<ICardOnPile & ISerializable<ICardOnPile>>): Constructor<IDraggableCard> {
    class DraggableCard extends bc implements IDraggableCard, ISerializable<ICardOnPile> {
      public isDraggableCard = true as const;
      public isDragging: boolean = false;
      public isPlaying: boolean = false
      public isDropped: boolean = false;
      public containerRef: WeakRef<ICardContainer>;

      constructor(d: ITurnGameplayPlayerDeclaration) {
        super(d);
      }
      
      public getContainerBoundingBox(): DOMRect {
        const container = this.containerRef.deref(); 
        if (!container) {
          throw new Error("Cannot find associated container");
        }
        return container.elementRef.nativeElement.getBoundingClientRect();
      }

      toJSON(): ICardOnPile {
        if (super.toJSON) {
          return super.toJSON();
        }
        const o = { ...this }
        delete o.isDragging
        delete o.isPlaying
        delete o.isDropped
        return o;
      }

    }
    return DraggableCard;
  };
}
