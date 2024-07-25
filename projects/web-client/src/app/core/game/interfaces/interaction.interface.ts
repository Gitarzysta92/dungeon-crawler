export interface IInteractionResult<T> {
  isSuccessful: boolean;
  isCompleted: boolean;
  data: T | undefined;
}