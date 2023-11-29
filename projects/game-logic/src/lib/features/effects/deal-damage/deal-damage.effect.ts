import { IBasicStats, IEnemy } from "../../actors/actors.interface";
import { Board } from "../../board/board";
import { IBoardObject, IBoardSelector } from "../../board/board.interface";
import { IDisposable } from "../../interactions/interactions.interface";
import { Inventory } from "../../items/inventory";
import { InventorySlotType } from "../../items/inventory.constants";
import { IDealDamage, IDealDamageByWeaponPayload, IDealDamageByWeapoonDefinition, IDealDamageDefinition, IDealDamagePayload } from "./deal-damage.interface";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { DamageType, EffectName } from "../effects.constants";
import { calculateStats } from "../modify-statistics/modify-statistics.effect";
import { IEffect } from "../resolve-effect.interface";
import { ActorCollectableData, EffectCollectableData } from "../effect-payload-collector-collectable-data";
import { GatheringStepDataName } from "../effect-payload-collector.constants";


export function dealDamage(hero: IBasicStats, effect: IDealDamage, enemy: IEnemy): number {
  let modifier = 0;
  if (effect.damageType === DamageType.Magical) {
    modifier = hero.spellPower;
  } else if (effect.damageType === DamageType.Phisical) {
    modifier = hero.attackPower;
  }
  const damage = modifier + effect.damageValue - enemy.defence;
  return damage > 0 ? damage : 0;
}


export function resolveDealDamageByWeapon(
  dealDamagePayload: IDealDamageByWeaponPayload,
  board: Board,
  inventory: Inventory,
  lastingEffects: IEffect[],
): void {
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

    const casterBoardObject = board.getObjectById(attack.actor.id);
    if (!casterBoardObject) {
      throw new Error("Cannot find hero on the board");
    }

    const weapon = Object.assign({ ...attack.effect }, {
      selectorOrigin: casterBoardObject.position,
      selectorDirection: casterBoardObject.rotation
    });

    const effectData: IDealDamagePayload = {
      effectName: EffectName.DealDamage,
      effect: weapon,
      payload: [attack],
      caster: attack.caster
    } 
    resolveDealDamage(effectData, board, lastingEffects);
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


export function resolveDealDamage(
  dealDamagePayload: IDealDamagePayload,
  board: Board,
  lastingEffects: IEffect[]
): void {
  const { effect, payload } = dealDamagePayload;

  if (effect.effectName !== EffectName.DealDamage) {
    throw new Error("Provided payload is not suitable for Deal Damage effect resolver");
  }

  if (effect?.effectName !== EffectName.DealDamage) {
    throw new Error("No required payload provided for dealDamage effect");
  }

  if (!('selectorType' in payload)) {
    throw new Error("Deal damage: Board selector not provided");
  }

  for (let target of payload) {
    const isSelectable = board
      .getObjectsBySelector<IEnemy & IBoardObject>(effect)
      .some(o => o.id === target.actor.id);
    if (!isSelectable) {
      throw new Error("Not all selected targets are available to take an attack");
    }
  }

  for (let target of payload) {
    const caster = calculateStats(target.caster, lastingEffects);
    const damage = dealDamage(caster, effect, calculateStats(target.actor, lastingEffects));
    target.actor.health -= damage;
  }
}

export function getDealDamagePayloadDefinition(
  effectDefinition: IDealDamageDefinition,
  board: Board
): IPayloadDefinition {
  const { effect, caster } = effectDefinition;
  const amountOfTargets = calculateMaxAmountOfTargets(effect, board, caster)
  return {
    effect,
    caster,
    amountOfTargets,
    gatheringSteps: [
      new ActorCollectableData({
        requireUniqueness: true,
        possibleActorsResolver: () => getPossibleActorsToSelect(effect, board, caster),
      })
    ]
  }
}