export interface IClonable<T extends IClonable = any> {
  clone: () => T;
};