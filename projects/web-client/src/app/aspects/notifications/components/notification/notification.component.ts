import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INotification } from '../../models/notification.interface';

@Component({
  selector: 'notification-record',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() data: INotification;

  @Output() readed: EventEmitter<INotification> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  public markAsReaded(): void {
    this.readed.next(this.data);
  }

}
