
import { IInteractableMedium } from "./interactable-medium.interface";
import { IUiMedium } from "../ui-medium/ui-medium.interface";
import { ISceneMedium } from "src/app/core/scene/mixins/scene-medium/scene-medium.interface";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";


export class InteractableMediumFactory implements IMixinFactory<IInteractableMedium> {

  public isApplicable(e: IInteractableMedium & IUiMedium & ISceneMedium): boolean {
    return e.isUiMedium || e.isSceneMedium;
  }

  public create(e: Constructor<IEntity>): Constructor<IInteractableMedium> {
    class InteractableMedium extends e implements IInteractableMedium {

      public isInteractableMedium = true as const;

      private _highlightHandlers = new Map();
      private _selectHandlers = new Map();
      private _hoverHandlers = new Map();

      private _isHighlighted: false = false;
      get isHighlighted() { return this._isHighlighted };
      set isHighlighted(v) {
        if (this._isHighlighted === v) {
          return;
        }
        this._highlightHandlers.forEach(h => h(v))
        this._isHighlighted = v;
      }

      private _isSelected: false = false;
      get isSelected() { return this._isSelected }
      set isSelected(v) {
        if (this._isSelected === v) {
          return;
        }
        this._selectHandlers.forEach(h => h(v))
        this._isSelected = v;
      }

      private _isHovered: false = false;
      get isHovered() { return this._isHovered }
      set isHovered(v) {
        if (this._isHovered === v) {
          return;
        }
        this._hoverHandlers.forEach(h => h(v))
        this._isHovered = v;
      }


      public registerInteractionHandler(
        interactionName: 'highlight' | 'select' | 'hover',
        delegate: (s: boolean) => void
      ): void {
        if (interactionName === 'highlight') {
          this._highlightHandlers.set(delegate, delegate);
        }

        if (interactionName === 'select') {
          this._selectHandlers.set(delegate, delegate);
        }

        if (interactionName === 'hover') {
          this._hoverHandlers.set(delegate, delegate);
        }
      }

    }
    return InteractableMedium;
  }


}