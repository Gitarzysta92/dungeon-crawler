export namespace DungeonStateStoreAction {
  export const dispatchActivityKey = Symbol("dispatch-activity");
  export const applyStateKey = Symbol("apply-activity");
}


export namespace StoreName {
  export const dungeonStateStore = Symbol('dungeon-state-store');
  export const dungeonStateTransactionStore = Symbol('dungeon-state-transaction-store');
}