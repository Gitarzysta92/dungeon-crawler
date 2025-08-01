import { AfterViewInit, Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { Vector3 } from 'three';

// Define the interface locally since the import path is problematic
interface IRawVector3 {
  x: number;
  y: number;
  z: number;
}

@Component({
  selector: 'fire-explosion-demo',
  templateUrl: './fire-explosion-demo.component.html',
  styleUrls: ['./fire-explosion-demo.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    SceneAssetsLoaderService,
    SceneService
  ]
})
export class FireExplosionDemoComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  public isPlaying = false;
  public explosionCount = 0;
  public autoPlay = false;
  private autoPlayInterval: any;

  constructor(
    public readonly sceneService: SceneService,
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
  ) { }

  ngAfterViewInit(): void {
    // Create scene and initialize with canvas
    this.sceneService.createScene(this._sceneAssetsLoader);
    this.sceneService.initializeScene(this.canvas.nativeElement);
    this.setupDemoScene();
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private setupDemoScene(): void {
    // Create a simple demo scene with some targets
    const demoScene = [
      // Ground plane
      {
        id: "ground",
        type: "simpleField",
        position: { x: 0, y: 0, z: 0 },
        isHandled: false
      },
      // Target 1
      {
        id: "target1",
        type: "commonTile",
        position: { x: 3, y: 0.5, z: 0 },
        isHandled: false
      },
      // Target 2
      {
        id: "target2", 
        type: "commonTile",
        position: { x: -3, y: 0.5, z: 2 },
        isHandled: false
      },
      // Target 3
      {
        id: "target3",
        type: "commonTile", 
        position: { x: 0, y: 0.5, z: -4 },
        isHandled: false
      },
      // Caster position
      {
        id: "caster",
        type: "commonTile",
        position: { x: 0, y: 0.5, z: 0 },
        isHandled: false
      }
    ];

    this.sceneService.composeScene(demoScene);
  }

  public async playFireballAnimation(targetIndex: number): Promise<void> {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.explosionCount++;

    const casterPosition: IRawVector3 = { x: 0, y: 0.5, z: 0 };
    let targetPosition: IRawVector3;

    switch (targetIndex) {
      case 1:
        targetPosition = { x: 3, y: 0.5, z: 0 };
        break;
      case 2:
        targetPosition = { x: -3, y: 0.5, z: 2 };
        break;
      case 3:
        targetPosition = { x: 0, y: 0.5, z: -4 };
        break;
      default:
        targetPosition = { x: 3, y: 0.5, z: 0 };
    }

    try {
      await this.sceneService.components.animationPlayerComponent.playAnimation(
        casterPosition,
        targetPosition
      );
    } catch (error) {
      console.error('Animation error:', error);
    } finally {
      this.isPlaying = false;
    }
  }

  public async playRandomExplosion(): Promise<void> {
    const randomTarget = Math.floor(Math.random() * 3) + 1;
    await this.playFireballAnimation(randomTarget);
  }

  public toggleAutoPlay(): void {
    this.autoPlay = !this.autoPlay;
    
    if (this.autoPlay) {
      this.autoPlayInterval = setInterval(() => {
        this.playRandomExplosion();
      }, 3000); // Play every 3 seconds
    } else {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  }

  public async playMultipleExplosions(): Promise<void> {
    if (this.isPlaying) return;

    this.isPlaying = true;
    
    // Play 3 explosions in sequence
    const targets = [1, 2, 3];
    
    for (let i = 0; i < targets.length; i++) {
      await this.playFireballAnimation(targets[i]);
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms between explosions
    }
    
    this.isPlaying = false;
  }

  public resetScene(): void {
    this.explosionCount = 0;
    this.isPlaying = false;
    this.autoPlay = false;
    
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
} 