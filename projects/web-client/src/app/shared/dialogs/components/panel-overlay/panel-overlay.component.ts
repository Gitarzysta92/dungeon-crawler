import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPanelOrigin } from '../../models/panel-origin';

@Component({
  selector: 'panel-overlay',
  template: `<ng-template 
    cdkConnectedOverlay 
    [cdkConnectedOverlayOrigin]="origin.elementRef" 
    [cdkConnectedOverlayOpen]="isOpen"
    [cdkConnectedOverlayWidth]="width"
    (overlayOutsideClick)="hidePanelByClick($event)">
      <div @slideIn class="panel-content" (mouseleave)="hidePanelByMouseLeave($event)">
        <ng-content></ng-content> 
      </div>
    </ng-template>`,
  styleUrls: ['./panel-overlay.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translate(0, -30px)', display: 'block', 'pointer-events': 'none' }),
        animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)', display: 'block' }))
      ]),
      transition(':leave', [
        style({ opacity: '1', transform: 'translate(0, 0)', display: 'block' }),
        animate('200ms ease-in-out', style({ opacity: '0', transform: 'translate(0, -30px)', display: 'block' }))
      ]),
    ]),
  ]
})
export class PanelOverlayComponent implements OnInit, OnDestroy {

  public isOpen: boolean = false;
  public context: any;

  private _onDestroy$: Subject<void> = new Subject();

  @Input() origin: IPanelOrigin

  @Input() hideOnMouseLeave: boolean = false;

  @Input() set flexible(_) { this._flexible = true }
  private _flexible: boolean;

  width: any;

  constructor() { }

  ngOnInit(): void {
    if (this.origin) {
      this.origin.state
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(data => {
          this.isOpen = data.open;

          if (!this._flexible) {
            this.width = this.origin.elementRef.nativeElement.offsetWidth;
          }
          
          this.context = data.context;
        })
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next()
  }

  public hidePanelByClick(event: MouseEvent) {
    if (this.origin.elementRef.nativeElement.contains(event.target)) return;
    this.hidePanel();
  }

  public hidePanelByMouseLeave(event: MouseEvent): void {
    if (!this.hideOnMouseLeave) return;
    this.hidePanel(); 
  }

  public hidePanel(): void {
    this.origin && this.origin.setState(false);
  }

}
