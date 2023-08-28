import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';


@Directive({
  selector: '[outsideClick]'
})
export class OutsideClickDirective implements OnInit, OnDestroy {

  private _detachMouseclick: Function;

  @Output() outsideClick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(
    private readonly _elementRef: ElementRef,
    //private readonly _zone: NgZone,
    private readonly _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    this._attachListeners();
  }

  ngOnDestroy(): void {
    this._detachListeners();
  }

  private emitEvent(event: MouseEvent) {
    if (this._checkIsInside(event as any)) return;

    event = new MouseEvent('outsideclick', event)

    this.outsideClick.next(event);
  }

  private _attachListeners(): void {
    this._detachMouseclick = this._renderer.listen(this._document, 'click', event => this.emitEvent(event));
  }

  private _detachListeners(): void {
    this._detachMouseclick && this._detachMouseclick();
  }

  private _checkIsInside(event: MouseEvent & { path: HTMLElement[] }): boolean {
    return event.composedPath()?.some(e => e == this._elementRef.nativeElement);
  }

}
