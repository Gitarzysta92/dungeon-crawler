import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { DialogRef, DIALOG_DATA } from './dialog-ref';

@Injectable()
export class ModalService implements OnDestroy {

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

  open(component: any, data?: any, cfg?: any): DialogRef {
    const o = this._overlay.create({
      panelClass: "custom-modal",
      maxWidth: cfg?.maxWidth ?? '400px',
      maxHeight: cfg?.maxHeight ?? '600px',
      hasBackdrop: true,
      backdropClass: cfg?.backdropClass ?? "",
      positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
      disposeOnNavigation: true,
      //scrollStrategy: new BlockScrollStrategy(),
    }); 

    const dialogRef = new DialogRef(o, () => this.close(component));


    const injector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: data },
      ],
    });
    const portal = new ComponentPortal(component, null, injector);
    
    o.attach(portal);

    this._ms.set(component, {
      o: o,
      s: o.backdropClick().subscribe(() => dialogRef.close())
    })
    
    return dialogRef;
  }

  close(component?: any): void {
    const m = this._ms.get(component);
    if (component && m) {
      m.o.detach();
      m.s.unsubscribe();
      m.o.dispose();
    } else {
      this._ms.forEach(m => {
        m.o?.detach();
        m.s.unsubscribe();
        m.o.dispose();
      })
    }
  }
}
