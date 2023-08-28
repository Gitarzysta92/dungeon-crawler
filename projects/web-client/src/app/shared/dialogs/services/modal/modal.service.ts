import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { DialogRef, DIALOG_DATA } from './dialog-ref';

@Injectable()
export class ModalService implements OnDestroy {

  private _o: OverlayRef;

  private readonly _onDestroy: Subject<void> = new Subject()
  private _backdropClick: Subscription;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _routing: RoutingService,
    private readonly _injector: Injector
  ) {
    this._routing.onNavigationStart
      .pipe(
        filter(() => !!this._o),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => {
        this.close();
      });  
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  open(component: any, data?: any, cfg?: any): DialogRef {
    this._o = this._overlay.create({
      panelClass: "custom-modal",
      maxWidth: cfg?.maxWidth ?? '400px',
      maxHeight: cfg?.maxHeight ?? '600px',
      hasBackdrop: true,
      backdropClass: cfg?.backdropClass ?? "",
      positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
      disposeOnNavigation: true,
      //scrollStrategy: new BlockScrollStrategy(),
    }); 

    const dialogRef = new DialogRef(this._o);

    const injector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: data },
      ],
    });
    const portal =  new ComponentPortal(component, null, injector);
    this._o.attach(portal);

    this._backdropClick = this._o.backdropClick()
      .subscribe(() => this.close())

    return dialogRef;
  }

  close(): void {
    this._o?.detach();
    this._backdropClick.unsubscribe();
  }
}
