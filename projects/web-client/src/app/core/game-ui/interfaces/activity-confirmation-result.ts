export interface IConfirmationResult<T> {
  confirmed: boolean | null;
  data: T | undefined;
}