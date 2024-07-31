import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICard } from "../card/card.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { ICardOnPile } from "./card-on-pile.interface";
import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { MixinService } from "../../../../infrastructure/mixin/mixin.service";
import { DISCARD_CARD_ACTIVITY, PLAY_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from "../../cards.constants";
import { ISerializable } from "../../../../infrastructure/extensions/json-serializer";

export class CardOnPileFactory implements IMixinFactory<ICardOnPile> {

  constructor(
    private readonly _mixinFactory: MixinService,
  ) { }

  public isApplicable(e: ICardOnPile): boolean {
    return e.isCardOnPile;
  };

  public create(e: Constructor<IEntity & IActivitySubject & ISerializable<unknown>>): Constructor<ICardOnPile> {
    const mixinFactory = this._mixinFactory;
    class CardOnPile extends e implements ICardOnPile, ISerializable<ICardOnPile> {
      public isCardOnPile = true as const;
      public isRevealed: boolean;

      public get parameters() { return this.ref.parameters }

      @NotEnumerable()
      public ref: ICard;

      constructor(d: ICardOnPile) {
        super(d);
        this.id = d.id,
        this.isRevealed = d.isRevealed;
        
      }

      initializeCard(card: ICard): void {
        Object.defineProperty(this, 'ref', { enumerable: false, configurable: false, value: card });
        for (let activity of card.activities) {
          if (activity.id !== DISCARD_CARD_ACTIVITY && activity.id !== TRASH_CARD_ACTIVITY && activity.id !== PLAY_CARD_ACTIVITY) {
            continue;
          }
          let ac = JSON.parse(JSON.stringify(activity));
          ac = mixinFactory.create(ac);
          Object.defineProperty(ac, 'subject', { enumerable: false, configurable: false, value: this });
          this.activities.push(ac);
        }
      }

      toJSON(): ICardOnPile {
        const o = { ...this };
        o.activities = [];
        if (super.toJSON) {
          return Object.assign(super.toJSON(), o)
        }
        return o;
      }
    }
    return CardOnPile;
  }
}