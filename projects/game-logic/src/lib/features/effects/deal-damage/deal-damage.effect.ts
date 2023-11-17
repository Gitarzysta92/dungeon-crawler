import { Outlet } from "../../actors/actors.constants";
import { IActor, IBasicStats, IEnemy } from "../../actors/actors.interface";
import { Board } from "../../board/board";
import { IBoardObject, IBoardSelector } from "../../board/board.interface";
import { IDisposable } from "../../interactions/interactions.interface";
import { Inventory } from "../../items/inventory";
import { InventorySlotType } from "../../items/inventory.constants";
import { IDealDamage, IDealDamageByWeapoon } from "./deal-damage.interface";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect } from "../effects-commons";
import { CastEffectPayload, IEffect, IEffectPayload } from "../effects-commons.interface";
import { IPayloadDefinition } from "../effect-payload.interface";
import { DamageType, EffectName } from "../effects.constants";
import { calculateStats } from "../modify-statistics/modify-statistics.effect";


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
  caster: IActor & IBasicStats,
  board: Board,
  heroInventory: Inventory,
  payload: CastEffectPayload,
  lastingEffects: IEffect[],
): void {
  const weapons = heroInventory.getAllEquippedItems()
    .filter(i => i.getAssociatedSlots().some(s => s.slotType === InventorySlotType.Weapon)) as unknown as (IDealDamage & IBoardSelector & IDisposable)[];

  if (payload.effectData?.effectName !== EffectName.DealDamageByWeapon) {
    throw new Error("No required payload provided for dealDamage effect");
  }
  
  for (let weapon of weapons) {

    if (weapon.effectName !== EffectName.DealDamage) {
      throw new Error("Selected weapon does not deal damage");
    }

    if (!weapon.selectorType) {
      throw new Error("Weapon has not defined attack range");
    }

    const heroPosition = board.getObjectById(caster.id);
    if (!heroPosition) {
      throw new Error("Cannot find hero on the board");
    }

    weapon = Object.assign({ ...weapon }, {
      selectorOrigin: heroPosition.position,
      selectorDirection: heroPosition.rotation
    });

    const effectData: IEffectPayload = {
      effectName: EffectName.DealDamage,
      effectId: weapon.id,
      payload: payload.effectData.payload.filter(e => e.effectId === weapon.id)
    } 
    resolveDealDamage(board, { effect: weapon, effectData: effectData }, lastingEffects, caster.outlets);
  }
}

export function getDealDamageByWeaponPayloadDefinitions(
  effect: IDealDamageByWeapoon & IBoardSelector,
  heroInventory: Inventory,
  board: Board,
  outlets: Outlet[]
): IPayloadDefinition[] {
  const weapons = heroInventory.getAllEquippedItems()
    .filter(i => i.getAssociatedSlots()
      .some(s => s.slotType === InventorySlotType.Weapon)) as unknown as (IDealDamage & IBoardSelector & IDisposable)[];
  
  for (let weapon of weapons) {
    weapon.selectorOriginCoordinates = effect.selectorOriginCoordinates;
    //weapon.outlets = effect.outlets;
  }
  return weapons.reduce<IPayloadDefinition[]>((acc, w) => acc.concat(getDealDamagePayloadDefinitions(w, board, outlets)), []);
}


export function resolveDealDamage(
  board: Board,
  payload: CastEffectPayload,
  lastingEffects: IEffect[],
  outlets: Outlet[]
): void {
  if (payload.effect.effectName !== EffectName.DealDamage) {
    throw new Error("Provided payload is not suitable for Deal Damage effect resolver");
  }

  if (payload.effectData?.effectName !== EffectName.DealDamage) {
    throw new Error("No required payload provided for dealDamage effect");
  }

  if (!('selectorType' in payload.effect)) {
    throw new Error("Deal damage: Board selector not provided");
  }

  const actualTargets = board.getSelectedObjects<IEnemy & IBoardObject>(payload.effect, outlets, payload.effectData.payload);
  if (!!payload.effectData && payload.effectData.payload.length > actualTargets.length) {
    throw new Error("Not all selected targets are available to take an attack");
  }

  const heroStats = calculateStats(payload.effect.selectorOriginCoordinates as unknown as IActor & IBasicStats, lastingEffects);
  for (let actualTarget of actualTargets) {
    const damage = dealDamage(heroStats, payload.effect, calculateStats(actualTarget, lastingEffects));
    actualTarget.health -= damage;
  }
}

export function getDealDamagePayloadDefinitions(
  effect: IDealDamage & IBoardSelector,
  board: Board,
  outlets: Outlet[]
): IPayloadDefinition[] {

  return [{
    effectId: effect.id,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board),
    gatheringSteps: [
      {
        dataName: 'actor',
        requireUniqueness: true,
        possibleActors: getPossibleActorsToSelect(effect, board),
        possibleFields: board.getSelectedFields(effect, outlets),
      }
    ]
  }]
}