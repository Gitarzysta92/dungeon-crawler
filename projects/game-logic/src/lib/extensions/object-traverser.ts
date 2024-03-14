export class ObjectTraverser {
  public static traverse(
    obj: any,
    callback: (parentObj: any, key: string | number, value: any) => void
  ): void {
    this._traverse(null, obj, null, callback)
  }

  private static _traverse(
    parentObj: any,
    obj: any,
    key: string | number,
    callback: (parentObj: any, key: string | number, value: any) => void,
  ) {
    if (obj === null) {
      return;
    }
    
    if (Array.isArray(obj)) {
      obj.forEach((element, index) => ObjectTraverser._traverse(obj, element, index, callback));
    } else {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          ObjectTraverser._traverse(obj, obj[key], key, callback);
        }
      }
    }
    callback(parentObj, key, obj);
  }

  public static skip() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.enumerable = false;
    };
  }
}


export function NotEnumerable(): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = false;
  };
}