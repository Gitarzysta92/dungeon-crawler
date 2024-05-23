export interface ISerializable<T> {
  toJSON(): T;
}

export class SerializationHelper {
  public static prepare<T extends object>(o: ISerializable<T>, toExclude: (object | string)[]): T {
    for (let p in o) {
      if (toExclude.includes(o[p])) {
        delete o[p];
      }
    }
    return; 
  }
}