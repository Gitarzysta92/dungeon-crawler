export interface IStateStorage<S> {
  createOrUpdate: (key: string, s: S) => Promise<unknown>;
  read: (key: string) => Promise<S>;
  clear: (key: string) => void;
}