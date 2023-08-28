import { DungeonActivityName } from "./constants/activity-name";
import { castEffect } from "./player-activities/cast-effect.directive";
import { claimReward } from "./player-activities/claim-reward.directive";
import { equipItem } from "./player-activities/equip-item.directive";
import { finishTurn } from "./player-activities/finish-turn.directive";
import { makeAttack } from "./player-activities/make-attack.directive";
import { makeMove } from "./player-activities/make-move.directive";
import { takeItem } from "./player-activities/take-item.directive";

export const dungeonActivitiesMap = {
  [DungeonActivityName.ClaimReward]: claimReward,
  [DungeonActivityName.CastEffect]: castEffect,
  [DungeonActivityName.EquipItem]: equipItem,
  [DungeonActivityName.FinishTurn]: finishTurn,
  [DungeonActivityName.MakeAttack]: makeAttack,
  [DungeonActivityName.ClaimReward]: claimReward,
  [DungeonActivityName.MakeMove]: makeMove,
  [DungeonActivityName.TakeItem]: takeItem
}
