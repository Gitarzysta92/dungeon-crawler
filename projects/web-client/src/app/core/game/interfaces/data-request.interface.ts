export interface IDataRequestResult<T> {
  value: T | undefined;
  revertCb: () => void;
}