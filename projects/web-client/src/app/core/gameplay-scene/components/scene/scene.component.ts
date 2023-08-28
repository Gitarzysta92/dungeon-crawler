import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SceneInitializationService } from '../../services/scene-initialization/scene-initialization.service';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent {

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  constructor(
    private readonly _sceneService: SceneInitializationService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { 
    this._changeDetectorRef.detach();
  }

  @HostListener('window:resize')
  onResize() {
    this._sceneService.adjustRendererSize();
  }
}
