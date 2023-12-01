import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';


@Directive({
  selector: '[hover]'
})
export class HoverDirective implements OnInit, OnDestroy {

  private _detachMouseenter: Function;
  private _detachMouseleave: Function;

  @Output() hover: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _zone: NgZone,
    private readonly _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this._attachListenersOutsideZone();
  }

  ngOnDestroy(): void {
    this._detachListeners();
  }

  private emitEvent(event: MouseEvent) {
    this.hover.next(event);
  }

  private _attachListenersOutsideZone(): void {
    this._zone.runOutsideAngular(() => {
      this._detachMouseenter = this._renderer.listen(this._elementRef.nativeElement, 'mouseenter', event => this.emitEvent(event));
      this._detachMouseleave = this._renderer.listen(this._elementRef.nativeElement, 'mouseleave', event => this.emitEvent(event));
    })
  }

  private _detachListeners(): void {
    this._detachMouseenter && this._detachMouseenter();
    this._detachMouseleave && this._detachMouseleave();
  }

}
