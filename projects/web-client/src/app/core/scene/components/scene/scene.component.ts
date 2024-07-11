import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription, connectable, fromEvent, merge, tap } from 'rxjs';
import { SceneService } from '../../services/scene.service';
import { Vector2 } from 'three';
import { getNormalizedMouseCoordinates2 } from '@3d-scene/index';


@Component({
  selector: 'scene',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit, OnDestroy {

  @Input() scene: SceneService;
  @Output() click: EventEmitter<any> = new EventEmitter()

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;
  _eventCancelation: Subscription;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
    const inputs = this.listenForMouseEvents() as any
    this.scene.initializeScene(this.canvas.nativeElement)
    this.emitPointerEvents(inputs);
  }

  ngOnDestroy(): void {
    this.scene.dispose()
    this._eventCancelation.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.scene.adjustSize();
  }


  public emitPointerEvents(e: Observable<PointerEvent>,): void {
    const v = new Vector2();
    this._eventCancelation = e.subscribe(e => {
      if (e.type === 'click') {
        const is = this.scene.services.pointerHandler.intersect(getNormalizedMouseCoordinates2(e.clientX, e.clientY, v as any));
        const mediums = this.scene.extractSceneMediumsFromIntersection(is as any)[0];
        this.click.next(mediums)
      }
    })
  }

  public listenForMouseEvents(): Observable<PointerEvent> {
    const events = merge(
      fromEvent<PointerEvent>(this.canvas.nativeElement, 'mousemove'),
      fromEvent<PointerEvent>(this.canvas.nativeElement, 'click')
    );
    const inputs = { pointerEvent$: connectable(events, { connector: () => new Subject() })}
    inputs.pointerEvent$.connect();
    return inputs.pointerEvent$.pipe(tap(e => e.stopPropagation()))
  }
}