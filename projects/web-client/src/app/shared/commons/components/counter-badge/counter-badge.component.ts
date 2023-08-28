import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'counter-badge',
  template: `{{ number }}`,
  styleUrls: ['./counter-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.visible]': 'number > 0'
  }
})
export class CounterBadgeComponent {

  @Input() number: number = 0;

  constructor() { }
}
