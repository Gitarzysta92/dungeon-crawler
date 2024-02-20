import { Guid } from "../../extensions/types";
import { EntityLifecycle } from "../../base/entity/entity.constants";
import { IEntity } from "../../base/entity/entity.interface";
import { IInteraction, IInteractionHandler, IInteractionSubject } from "./interaction.interface";

export class InteractionsService {

  private _interactionResolvers: Map<string, IInteractionHandler<IInteraction>> = new Map();

  public registerInteractionResolver(resolver: IInteractionHandler<IInteraction>): void {
    this._interactionResolvers.set(resolver.interactionId, resolver);
  }

  public resolveInteraction(
    interactionId: Guid,
    subject: IInteractionSubject & Partial<IEntity>,
    initiator: unknown
  ): void {
    const interaction = subject.interaction.find(i => i.id === interactionId);
    if (interaction) {
      throw new Error(`Selected subject not support given interaction  ${interactionId}`);
    }

    const resolver = this._interactionResolvers.get(interactionId);
    if (!resolver) {
      throw new Error(`Cannot find resolver for ${interactionId}`);
    }
    
    const result = resolver.resolveInteraction(initiator, subject, interaction);
    if (!result) {
      return;
    }
  
    if (subject.lifecycle === EntityLifecycle.Disposable && !interaction.isNotaffective && subject.isEntity) {
      subject.toRemove = true;
    }
  
    if (subject.lifecycle === EntityLifecycle.Reusable && !interaction.isNotaffective && subject.isEntity) {
      subject.wasUsed = true;
    }
  }

}











// public resolveInteraction(
//   interaction: IReusable | IDisposable | IEquipable,
//   hero: IUtilizationStats & ISecondaryStats,
//   calculateCost: boolean = false
// ): void {
//   const heroCopy = Object.assign({}, hero);
//   const { equipCost, utilizationCost } = interaction as any;

//   if (!!calculateCost) {
//     const costPaid = (equipCost || utilizationCost).every((auc: IUtilizationCost) => {
//       if (auc.costType === "source") {
//         heroCopy.source -= auc.costValue;
//         if (heroCopy.source < 0) {
//           return false;
//         }
//       }
//       if (auc.costType === "majorAction") {
//         heroCopy.majorAction -= auc.costValue;
//         if (heroCopy.majorAction < 0) {
//           return false;
//         }
//       }
//       if (auc.costType === "minorAction") {
//         heroCopy.minorAction -= auc.costValue;
//         if (heroCopy.minorAction < 0) {
//           return false;
//         }
//       }

//       if (auc.costType === "moveAction") {
//         heroCopy.moveAction -= auc.costValue;
//         if (heroCopy.moveAction < 0) {
//           return false;
//         }
//       }

//       return true;
//     });

//     if (!costPaid) {
//       throw new Error("Not enough resources to make interaction");
//     }
//     Object.assign(hero, heroCopy);
//   }

//   if ('isUsed' in interaction) {
//     interaction.isUsed = true;
//   }

//   if ('isDisposed' in interaction) {
//     interaction.isDisposed = true;
//   }
// }