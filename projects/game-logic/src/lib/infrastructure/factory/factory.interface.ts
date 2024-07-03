export interface IFactory<D, O> {
  create(d: D): O;
  validate?(d: D): boolean;
}
