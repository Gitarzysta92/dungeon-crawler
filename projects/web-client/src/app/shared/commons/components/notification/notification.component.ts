import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export const notificationApperance = {
  default: 'default',
  error: 'error',
  success: 'success',
  warning: 'warning'
};


export interface NotificationApperance {
  apperance: Apperance
}


type Apperance = keyof typeof notificationApperance

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('progressBar', [
      transition(':enter', [
        style({ 
          transform: 'translate(-100%, 0)',
        }),
        animate('{{time}}ms ease-out', style({ 
          transform: 'translate(0, 0)',
        })),
      ], { params: { time: 5000 } }), 
    ])
  ]
})
export class NotificationComponent implements OnInit {

  @Input() apperance: Apperance = 'default';
  @Input() duration: number = 1000;

  @Output() closed: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.emitCloseEvent(), this.duration);
  }

  emitCloseEvent(): void {
    this.closed.emit();
  }

}

