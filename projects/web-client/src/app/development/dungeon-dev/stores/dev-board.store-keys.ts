export namespace DevBoardAction {
  export const addObject = Symbol("add-object");
  export const selectObject = Symbol("select-object");
  export const updateObjectPosition = Symbol("update-object-position");
  export const resetSelection = Symbol("reset-selection");
  export const updateObject = Symbol("update-object")
}


export namespace StoreName {
  export const devBoardStore = Symbol('dev-board-store');
}