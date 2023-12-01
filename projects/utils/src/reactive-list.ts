import { Subject } from "rxjs";

export interface Config {
  size?: number;

}


export class List<T> {
  public get length() {
    return this._list.length;
  }

  public listChanged: Subject<number>;

  private _list: T[] = [];

  private _size: number;

  constructor(settings?: Config) { 
    const maxValue = Number.MAX_VALUE;
    this._size = settings ? (settings.size || maxValue) : maxValue;
   

    this.listChanged = new Subject();
  }

  public add(item: T): boolean {
    const size = this._size;
    if (size != null && size <= this._list.length) return false;
    this.listChanged.next(this._list.push(item)); 
    return true;
  }

  public remove(item: T): void {
    const tempList = [...this._list];
    this._list.length = 0;
    tempList.forEach(tempItem => {
      if (item != tempItem) this._list.push(tempItem);
    });
    this.listChanged.next(this._list.length);
  }

  public forEach(cb: (req: T) => any) {
    this._list.forEach(cb);
  }

  public toArray(): Array<T> {
    return [...this._list];
  }

  public clear() {
    this._list.length = 0;
    this.listChanged.next(this._list.length);
  }
}
