import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { debounce, map, takeUntil } from 'rxjs/operators';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { INotification } from '../../models/notification.interface';
import { NotificationsStore } from '../../stores/notifications.store';

@Component({
  selector: 'notifications-widget',
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
})
export class NotificationWidgetComponent implements OnInit, OnDestroy {

  public notifications: Observable<INotification[]>;
  public isMobile: boolean;

  private _destroy: Subject<void> = new Subject();

  constructor(
    private readonly _notifications: NotificationsStore,
    private readonly _ruler: ViewportRuler,
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.notifications = this._notifications.state
      .pipe(map(ns => ns.filter(n => !n.readed)))
      .pipe(map(ns => ns.slice(0,3)));

    this._ruler.change()
      .pipe(debounce(() => timer(200)))
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.isMobile = this._isMobile();
        this._changeDetector.detectChanges()
      })

    this.isMobile = this._isMobile();
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }

  public markAsReaded(n: INotification): void {
    this._notifications.markAsReaded(n);
  }

  public trackItem(index: number, item: INotification): string {
    return item.id
  }

  public navigateToNotifications(): void {
    this._routingService.navigateToNotifications();
  }

  private _isMobile(): boolean {
    return this._ruler.getViewportSize().width <= 500;
  }

}
