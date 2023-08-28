import { ComponentType } from "@angular/cdk/portal";
import { Observable } from "rxjs";
import { Icons } from "src/app/shared/icons/constants/icons";
import { MenuLocation } from "src/app/aspects/navigation/constants/menu-location.enum";
import { StoreService } from "src/app/infrastructure/data-store/api";



export class Menu {
  public location: MenuLocation;
  public label: string;
  public items: MenuItem[];
  constructor(data: Menu) {
    this.location = data.location;
    this.label = data.label;
    this.items = data.items;
  }
}


export class MenuItem {
  public label: string;
  public url: string;
  public fragments?: string[];
  public icon: keyof Icons;
  public isActive: boolean;
  public children?: MenuItem[];
  public counterComponent?: ComponentType<{ number: number }>
  public counterDataProvider?: (store: StoreService) => Observable<number>;
  constructor(data: MenuItem) {
    this.label = data.label;
    this.url = data.url;
    this.fragments = data.fragments || [];
    this.icon = data.icon;
    this.isActive = data.isActive;
    this.children = data.children || [];
    this.counterComponent = data.counterComponent;
    this.counterDataProvider = data.counterDataProvider;
  }
}