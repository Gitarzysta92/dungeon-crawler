import { Component, Input } from '@angular/core';

@Component({
  selector: 'visibility-toggle-button',
  templateUrl: './visibility-toggle-button.component.html',
  styleUrls: ['./visibility-toggle-button.component.scss']
})
export class VisibilityToggleButtonComponent {
  @Input() visible: boolean = false;
}
