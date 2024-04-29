export interface IStorable {
  id: string;
  toStorableFormat?(): string;
}