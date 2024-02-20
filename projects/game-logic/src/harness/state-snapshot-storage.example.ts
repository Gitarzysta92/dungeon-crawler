import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";

export class StateSnapshotStorage<T> implements IStateStorage<T>{
  
  public storage: T[] = [];

  public async createOrUpdate(key: string, s: T): Promise<void> {
    this.storage.push(s);
  }
  public async read(): Promise<T> { return {} as T; }

  public clear(key: string): void { }

  public getSnapshots(): T[] {
    return this.storage;
  }
}