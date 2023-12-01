import { Board } from "../../board/board";
import { IBoardSelector } from "../../board/board.interface";
import { IDisposable } from "../../interactions/interactions.interface";
import { Inventory } from "../../items/inventory";
import { InventorySlotType } from "../../items/inventory.constants";
import { EffectCollectableData } from "../effect-payload-collector-collectable-data";
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { IEffect } from "../resolve-effect.interface";
import { IDealDamageByWeaponPayload, IDealDamageByWeapoonDefinition, IDealDamageByWeaponSignature } from "./deal-damage-by-weapon.interface";
import { resolveDealDamage, getDealDamagePayloadDefinition } from "./deal-damage.effect";
import { IDealDamage } from "./deal-damage.interface";

export function resolveDealDamageByWeapon(
  dealDamagePayload: IDealDamageByWeaponPayload,
  board: Board,
  inventory: Inventory,
  lastingEffects: IEffect[],
): IDealDamageByWeaponSignature {
  const { effect, payload } = dealDamagePayload;

  if (effect.effectName !== EffectName.DealDamageByWeapon) {
    throw new Error("No required payload provided for dealDamage effect");
  }

  for (let attack of payload) {
    const isSelectable = inventory.getAllEquippedItems().some(w => w.id === attack.effect.id);

    if (!isSelectable) {
      throw new Error("");
    }

    if (attack.effect.effectName !== EffectName.DealDamage) {
      throw new Error("Selected weapon does not deal damage");
    }

    if (!attack.effect.selectorType) {
      throw new Error("Weapon has not defined attack range");
    }

    const casterBoardObject = board.getObjectById(attack.caster.id);
    if (!casterBoardObject) {
      throw new Error("Cannot find hero on the board");
    }

    resolveDealDamage(attack, board, lastingEffects);
  }

  return {
    effectId: dealDamagePayload.effect.id,
    effectName: EffectName.DealDamageByWeapon,
    data: {
      weaponIds: payload.map(a => a.effect.id)
    }
  }
}

export function getDealDamageByWeaponPayloadDefinitions(
  effectDefinition: IDealDamageByWeapoonDefinition,
  inventory: Inventory,
  board: Board,
): IPayloadDefinition {
  const { effect, caster } = effectDefinition
  const weapons: (IDealDamage & IBoardSelector & IDisposable)[] = inventory.getAllEquippedItems()
    .filter(i => i.getAssociatedSlots().some(s => s.slotType === InventorySlotType.Weapon)) as any;
  
  return {
    effect,
    caster,
    amountOfTargets: weapons.length,
    preparationSteps: [
      new EffectCollectableData({
        requireUniqueness: true,
        possibleEffects: weapons,
        autoCollect: true
      })
    ],
    nestedDefinitionFactory: (preparationSteps) => {
      const effect = preparationSteps.steps
        .find(s => s.dataName === GatheringStepDataName.Effect)?.payload as IDealDamage & IBoardSelector;
      return getDealDamagePayloadDefinition({ effect: effect, effectName: effect.effectName, caster: caster}, board);
    }
  }
}