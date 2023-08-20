import { IHero } from "../actors/hero.interface";
import { IDisposable, IReusable } from "./interactions.interface";



export function resolveCostAndInteraction(interaction: IReusable | IDisposable, hero: IHero, calculateCost: boolean = false): void {
  const heroCopy = Object.assign({}, hero);

  if (!!calculateCost) {
    const costPaid = interaction.utilizationCost.every(auc => {
      if (auc.costType === "source") {
        heroCopy.source -= auc.costValue;
        if (heroCopy.source < 0) {
          return false;
        }
      }
      if (auc.costType === "majorAction") {
        heroCopy.majorActions -= auc.costValue;
        if (heroCopy.source < 0) {
          return false;
        }
      }
      if (auc.costType === "minorAction") {
        heroCopy.majorActions -= auc.costValue;
        if (heroCopy.source < 0) {
          return false;
        }
      }

      if (auc.costType === "moveAction") {
        heroCopy.moveActions -= auc.costValue;
        if (heroCopy.source < 0) {
          return false;
        }
      }

      return true;
    });

    if (!costPaid) {
      throw new Error("Not enough resources to make interaction");
    }

    Object.assign(hero, heroCopy);
  }

  if ('isUsed' in interaction) {
    interaction.isUsed = true;
  }

  if ('isDisposed' in interaction) {
    interaction.isDisposed = true;
  }
}