
import { IPerk } from "../../../lib/modules/perk/perk.interface";
import { IUnlockable } from "../../../lib/modules/progression/progression.interface";
import { basicAttack } from "./abilities.data";



export const additionallAtackPerk: IPerk & IUnlockable = {
  isUnlocked: false,
  levels: [
    {
      name: "first",
      value: 10,
      modifiers: [
        { delegateId: "apply-ability-modifier", payload: { abilityId: basicAttack.id, parameter: "repetitions", value: 2 } }
      ],
    }
  ],
  // interaction: [
  //   { id: IMPROVE_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }
  // ],
  isUnlockable: true,
  unlockingConditions: []
}

export const removeDualWieldPenalty: IPerk & IUnlockable = {
  isUnlocked: false,
  levels: [
    {
      name: "first",
      value: 10,
      modifiers: [
        { delegateId: "apply-ability-modifier", payload: { abilityId: basicAttack.id, parameter: "repetitions", value: 2 } }
      ],
    }
  ],
  // interaction: [
  //   { id: IMPROVE_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }
  // ],
  isUnlockable: true,
  unlockingConditions: [],
}
// modyfikowanie parametrów ability
// modyfikowanie parametrów statystyk - modyfikowanie 
// modyfikowanie kształtu efektów
// modyfikowanie akcji
// modyfikowanie interakcji

// warunkowe modyfikowanie

// blokowanie moliwości uzywania ability / itemu / modyfikatora?

// dodawanie efektów
