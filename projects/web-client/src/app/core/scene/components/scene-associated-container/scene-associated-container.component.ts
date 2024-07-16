import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ISceneMedium } from '../../mixins/scene-medium/scene-medium.interface';
import { SceneService } from '../../services/scene.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scene-associated-container',
  templateUrl: './scene-associated-container.component.html',
  styleUrls: ['./scene-associated-container.component.scss'],
})
export class SceneAssociatedContainerComponent implements OnInit, OnDestroy {

  @ViewChild("label") label: ElementRef<HTMLElement>;

  @Input() relativeTo: ISceneMedium; 
  private _subsription: Subscription;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _renderer: Renderer2,
    private readonly elementRef: ElementRef
  ) { }
  
  ngOnInit(): void {
    this._subsription = this._sceneService.sceneApp.listenForCameraPositionChange()
      .subscribe(d => {
        if (this.relativeTo) {
          this.relativeTo.updateScreenCoords();
          this._renderer.setStyle(
            this.elementRef.nativeElement,
            "transform",
            `translate(${this.relativeTo.viewportCoords.x}px, ${this.relativeTo.viewportCoords.y}px)`
          );
          this._renderer.setStyle(
            this.label.nativeElement,
            "transform",
            `scale(${d * 0.005}) translateX(-50%) translateY(-50%)`
          );
        }
      }) as any
  }

  ngOnDestroy(): void {
    this._subsription.unsubscribe();
  }
}
