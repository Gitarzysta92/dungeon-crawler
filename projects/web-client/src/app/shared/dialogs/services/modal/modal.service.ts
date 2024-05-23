import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { DialogRef, DIALOG_DATA } from './dialog-ref';
import { overlayDefaultConfig } from '../../constants/overlay-default-configuration';

@Injectable()
export class ModalService2 implements OnDestroy {

  private _ms: Map<any, { o: OverlayRef, s: Subscription }> = new Map()
  private readonly _onDestroy: Subject<void> = new Subject()

  constructor(
    private readonly _overlay: Overlay,
    private readonly _routing: RoutingService,
    private readonly _injector: Injector
  ) {
    this._routing.onNavigationStart
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.close());  
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  open(component: any, data?: any, cfg?: OverlayConfig, customIdentifier?: any): DialogRef {
    if (this._ms.has(customIdentifier ?? component)) {
      return;
    }
    const overlay = this._overlay.create(Object.assign({ ...overlayDefaultConfig }, cfg)); 
    const dialogRef = new DialogRef(overlay, () => this.close(customIdentifier ?? component));
    const injector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: data },
      ],
    });
    const portal = new ComponentPortal(component, null, injector);
    
    overlay.attach(portal);

    this._ms.set(customIdentifier ?? component, {
      o: overlay,
      s: overlay.backdropClick().subscribe(() => dialogRef.close())
    })
    
    return dialogRef;
  }

  close(identifier?: any): void {
    const m = this._ms.get(identifier);
    if (identifier && m) {
      m.o.detach();
      m.s.unsubscribe();
      m.o.dispose();
      this._ms.delete(identifier);
    } else {
      this._ms.forEach(m => {
        m.o?.detach();
        m.s.unsubscribe();
        m.o.dispose();
      })
    }
  }
}
