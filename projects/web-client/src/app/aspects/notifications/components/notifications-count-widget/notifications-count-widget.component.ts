import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NotificationsStore } from '../../stores/notifications.store';


@Component({
  template: `<counter-badge [number]="count" ></counter-badge>`,
  selector: 'notifications-count-widget',
  styleUrls: ['./notifications-count-widget.component.scss'],
})
export class NotificationsCountWidgetComponent implements OnInit, OnDestroy {

  public count: number;

  private _destroy: Subject<void> = new Subject();
  constructor(
    private readonly _notificationsStore: NotificationsStore,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void { 
    this._notificationsStore.state
      .pipe(map(ns => (ns || []).filter(n => !n.readed).length))
      .pipe(takeUntil(this._destroy))
      .subscribe(c => {
        this.count = c;
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }
}
