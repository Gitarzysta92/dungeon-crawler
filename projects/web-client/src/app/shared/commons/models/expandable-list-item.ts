export interface IExpandableListItem {
  expanded: boolean;
  settled: boolean;
  childrens?: Array<IExpandableListItem>;
}