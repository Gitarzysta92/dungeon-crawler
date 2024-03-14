export type Dictionary<K extends string, T> = { [key: string]: T };
export type Guid = string;
export type JsonPath = string;
export type PropertyName = string;
export type ResolvableReference<T> = T | JsonPath;
export type UniqueIdentifier = Guid | string;
export type Constructor<T = any> = new (...args: any[]) => T;