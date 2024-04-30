import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IAnimatableComponent } from '../interfaces/animatable-component.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentAnimationGuard implements CanDeactivate<IAnimatableComponent> {
  canDeactivate(component: IAnimatableComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.isAnimatableComponent) {
      return true;
    }

    return component.waitForAnimationFinish();
  }
}