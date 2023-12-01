export type MapFactoryParamToInterface<T extends (...args: any) => any> = {
  [Property in keyof (Parameters<T>[0])]: (Parameters<T>[0])[Property];
};    