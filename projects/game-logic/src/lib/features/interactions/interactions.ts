import { IHero } from "../hero/hero.interface";
import { IDisposable, IEquipable, IReusable, IUtilizationCost } from "./interactions.interface";



export function resolveCostAndInteraction(interaction: IReusable | IDisposable | IEquipable, hero: IHero, calculateCost: boolean = false): void {
  const heroCopy = Object.assign({}, hero);

  const { equipCost, utilizationCost } = interaction as any;

  if (!!calculateCost) {
    const costPaid = (equipCost || utilizationCost).every((auc: IUtilizationCost) => {
      if (auc.costType === "source") {
        heroCopy.source -= auc.costValue;
        if (heroCopy.source < 0) {
          return false;
        }
      }
      if (auc.costType === "majorAction") {
        heroCopy.majorAction -= auc.costValue;
        if (heroCopy.majorAction < 0) {
          return false;
        }
      }
      if (auc.costType === "minorAction") {
        heroCopy.minorAction -= auc.costValue;
        if (heroCopy.minorAction < 0) {
          return false;
        }
      }

      if (auc.costType === "moveAction") {
        heroCopy.moveAction -= auc.costValue;
        if (heroCopy.moveAction < 0) {
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