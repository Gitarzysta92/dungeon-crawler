import { ComponentType } from "@angular/cdk/portal";
import { Route } from "@angular/router";
import { Observable } from "rxjs";
import { StoreService } from "src/app/infrastructure/data-store/api";
import { MenuLocation } from "../constants/menu-location.enum";




export type Appendix = { component?: ComponentType<{ number: number }>, data?: (store: StoreService) => Observable<any> } 

export interface SystemRouteData {
  menu?: { location: MenuLocation, label: string;  icon?: string; };
  appendix?: Appendix;
  animation?: any;
  onFailurePath?: string;
}


export interface SystemRoute extends Route {
  data?: SystemRouteData,
}

export interface SystemRouteDictionary extends Omit<Route, 'children'> {
  data?: SystemRouteData,
  children?: { [key: string]: SystemRouteDictionary }
}

export type SystemRoutes2 =  { [key: string]: SystemRouteDictionary };
export type SystemRoutes =  SystemRoute[];

export class RoutesAdapter {
  private _routes: SystemRoutes2
  constructor(routes: SystemRoutes2) {
    this._routes = routes;
  }
  public bindComponents(
    componentsMap: { [key: string]: any }, 
    children?: { [key: string]: SystemRouteDictionary }  
  ): RoutesAdapter {
    const target = children || this._routes;

    Object.keys(target).map(key => {
      const route = target[key];
      
      if (componentsMap?.hasOwnProperty(key)) {
        if (componentsMap[key]['_']) {
          route.component = componentsMap[key]['_'];
        } else if (!route.children) {
          route.component = componentsMap[key];
        } 
      }

      if (route?.children) 
        this.bindComponents(componentsMap[key], route.children);
      return route ;
    });

    return this;
  }

  public toDefaultFormat(
    children?: { [key: string]: SystemRoute }, 
    callback?: (route: SystemRoute) => SystemRoute
  ): SystemRoute[] {
    const target = children || this._routes;

    return Object.keys(target).map(key => {
      const route = Object.assign({}, target[key] as any);
      callback && callback(route);
  
      if (route?.children) 
        route.children = this.toDefaultFormat(route.children, callback);
    
      return route;
    })
  }

}