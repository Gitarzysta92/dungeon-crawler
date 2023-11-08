export function freezeObjectRecursively<T>(object: T): T {
  if (!(object instanceof Object) || object === null || object === undefined) return object;
  Object.keys(object).forEach(key => freezeObjectRecursively(object[key]));
  Object.freeze(object);
  return object;
}

export function makeObjectDeepCopy<T>(object: T): T {
  if (Array.isArray(object)) {
    return [...object].map(o => makeObjectDeepCopy(o)) as unknown as T
  } else if (typeof object === 'object' && object !== null) {
    // TODO: Provide polyfill for structuredClone method
    const newObject = structuredClone(object);
    Object.keys(newObject).forEach(key => {
      newObject[key] = makeObjectDeepCopy(newObject[key]);
    }); 
    return newObject; 
  } else {
    return object;
  }
}