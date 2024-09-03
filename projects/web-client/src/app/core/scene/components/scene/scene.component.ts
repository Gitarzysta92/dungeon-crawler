import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'scene',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit, OnDestroy {

  @Input() scene: SceneService;
  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _zone: NgZone
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => this.scene.initializeScene(this.canvas.nativeElement));
  }

  ngOnDestroy(): void {
    this.scene.dispose()
  }

  @HostListener('window:resize')
  onResize() {
    this.scene.adjustSize();
  }
}