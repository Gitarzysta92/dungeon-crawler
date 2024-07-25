import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardsDeckDataFeed } from "../../cards.interface";
import { ICard, ICardDeclaration } from "./card.interface";
import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { IDeck } from "../deck/deck.interface";



export class CardFactory implements IMixinFactory<ICard> {

  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed
  ) { }

  public isApplicable(e: ICard): boolean {
    return e.isCard;
  };

  public create(e: Constructor<IEntity & IActivitySubject>): Constructor<ICard> {
    class Card extends e implements ICard {

      isCard = true as const;
      maxCopies: number;
      quantity: number;

      @NotEnumerable()
      deck: IDeck;

      constructor(d: ICardDeclaration) {
        super(d);
        this.maxCopies = d.maxCopies ?? Infinity;
        this.quantity = d.quantity; 
      }
    
    } 
    return Card;
  }
}