import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, connectable, fromEvent, merge, tap } from 'rxjs';
import { IScene } from '../../interfaces/dungeon-scene-state';


@Component({
  selector: 'scene',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit, OnDestroy {

  @Input() scene: IScene;

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.scene.create({
      // TODO : Resolve conflict between rxjs dependency that is used simultaneously by web-client and 3dscene.
      inputs: this.listenForMouseEvents() as any,
      animationFrameProvider: window,
      canvasRef: this.canvas.nativeElement,
      height: innerHeight,
      width: innerWidth,
      pixelRatio: window.devicePixelRatio,
    });
  }

  ngOnDestroy(): void {
    this.scene.dispose()
  }

  @HostListener('window:resize')
  onResize() {
    this.scene.adjustSize();
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