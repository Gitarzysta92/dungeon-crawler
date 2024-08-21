export interface IFactory<D, O> {
  create(d: D): O;
  isApplicable?(d: D): boolean;
}
