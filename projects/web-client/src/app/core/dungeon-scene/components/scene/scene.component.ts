import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, connectable, fromEvent, merge, tap } from 'rxjs';
import { SceneService } from '../../services/scene.service';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';


@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _dataFeedService: DataFeedService
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {}

  @HostListener('window:resize')
  onResize() {
    this._sceneService.adjustRendererSize();
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