import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { merge, Subscription, switchMap, throttleTime } from 'rxjs';
import { ControlsService } from 'src/app/infrastructure/controls/controls.service';
import { UiInteractionService } from '../../services/ui-interaction.service';
import { PointerService } from '../../services/pointer.service';

@Component({
  selector: 'ui-effects-canvas',
  templateUrl: './ui-effects-canvas.component.html',
  styleUrls: ['./ui-effects-canvas.component.scss']
})
export class UiEffectsCanvasComponent implements AfterViewInit {

  @ViewChild("effectsCanvas") _canvas: ElementRef<HTMLCanvasElement>
  public s: Subscription;
  ctx: CanvasRenderingContext2D;

  constructor(
    private readonly _changeDectectorRef: ChangeDetectorRef,
    private readonly _ngZone: NgZone,
    private readonly _uiInteractionService: UiInteractionService,
    private readonly _controlsService: ControlsService,
    private readonly _pointerService: PointerService,
    private readonly _zone: NgZone
  ) { 
    this._changeDectectorRef.detach()
  }


  ngAfterViewInit(): void {
    this._changeDectectorRef.detectChanges();
    this._canvas.nativeElement.width = window.innerWidth;
    this._canvas.nativeElement.height = window.innerHeight;
    this.ctx = this._canvas.nativeElement.getContext("2d");
    this._ngZone.runOutsideAngular(() => {
      this._uiInteractionService.pointer$
      .subscribe(s => {
        if (!!s) {
          this._showPointer(s)
        } else {
          this._hidePointer();
        } 
      })
    })
   
  }

  private _showPointer(from: { x: number, y: number }): void {
    this.s = merge(
      this._controlsService.listenForHoverEvent(document as any),
      this._controlsService.listenForSelectEvent(document as any)
    )
      .subscribe((e: MouseEvent) => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this._pointerService.showPointer(from, {x: e.clientX, y: e.clientY }, this.ctx)
    })
  }

  private _hidePointer() {
    this.s?.unsubscribe()
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    delete this.s;
  }
}







