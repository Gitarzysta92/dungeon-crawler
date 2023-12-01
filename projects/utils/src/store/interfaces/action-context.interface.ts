export interface IActionContext<S> {
  payload: any,
  initialState: S,
  computedState: S,
  custom: any
}