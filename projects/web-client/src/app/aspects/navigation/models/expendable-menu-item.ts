import { ComponentPortal } from "@angular/cdk/portal";
import { Observable } from "rxjs";
import { IExpandableListItem } from "src/app/shared/commons/api";
import { MenuItem } from "./menu";


export class ExpendableMenuItem extends MenuItem implements IExpandableListItem {
  expanded: boolean;
  settled: boolean;
  childrens: ExpendableMenuItem[];
  portal: ComponentPortal<any>;
  counterData: Observable<number>;

  constructor(data: Partial<ExpendableMenuItem>) {
    super(data as MenuItem);
    this.expanded = !!data.expanded;
    this.settled = !!data.settled;
    this.childrens = data.childrens || [];
    this.portal = data.portal;
    this.counterData = data.counterData;
  }
}