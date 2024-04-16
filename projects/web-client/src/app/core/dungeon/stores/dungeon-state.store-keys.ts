export namespace DungeonStateStoreAction {
  export const dispatchActivity = Symbol("dispatch-activity");
  export const applyState = Symbol("apply-activity");
}


export namespace StoreName {
  export const dungeonStateStore = Symbol('dungeon-state-store');
  export const dungeonStateTransactionStore = Symbol('dungeon-state-transaction-store');
}