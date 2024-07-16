export interface IApproveResult<T> {
  approved: boolean;
  data: T | undefined;
}