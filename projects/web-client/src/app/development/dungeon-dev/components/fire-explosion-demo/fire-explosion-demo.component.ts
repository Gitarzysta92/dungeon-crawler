import { AfterViewInit, Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { Vector3, DirectionalLight, BoxGeometry, MeshBasicMaterial, Mesh, SphereGeometry, MeshStandardMaterial } from 'three';

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
    console.log('🎮 Fire explosion demo initializing...');
    
    try {
      // Create scene and initialize with canvas
      this.sceneService.createScene(this._sceneAssetsLoader);
      console.log('✅ Scene created');
      
      this.sceneService.initializeScene(this.canvas.nativeElement);
      console.log('✅ Scene initialized with canvas');
      
      // Test basic scene rendering first
      setTimeout(() => {
        this.testBasicScene();
      }, 500);
      
      this.setupDemoScene();
      console.log('✅ Demo scene setup completed');
      
    } catch (error) {
      console.error('❌ Error initializing demo:', error);
    }
  }

  private testBasicScene(): void {
    console.log('🧪 Testing basic scene...');
    const scene = (this.sceneService.sceneApp as any)._scene.scene;
    const camera = this.sceneService.sceneApp.camera;
    const renderer = (this.sceneService.sceneApp as any)._renderer.webGlRenderer;
    
    console.log('🎯 Scene:', scene);
    console.log('📷 Camera:', camera);
    console.log('🎨 Renderer:', renderer);
    
    // Try to render a simple scene
    if (scene && camera && renderer) {
      console.log('✅ All components found, attempting render...');
      
      // Add lighting to make scene visible
      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);
      
      // Add a bright sphere to test bloom effect
      const sphereGeometry = new SphereGeometry(0.5, 16, 16);
      const sphereMaterial = new MeshStandardMaterial({
        color: 0xff4400,
        emissive: 0xff2200,
        emissiveIntensity: 2.0
      });
      const sphere = new Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(0, 1, -3);
      scene.add(sphere);
      console.log('🔥 Added bright sphere for bloom testing');
      
      renderer.render(scene, camera);
      console.log('✅ Basic render completed with test cube');
    } else {
      console.log('❌ Missing components for rendering');
    }
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private setupDemoScene(): void {
    console.log('🎯 Setting up demo scene...');
    
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
    console.log('✅ Demo scene composed with', demoScene.length, 'objects');
    
    // Debug: Check if scene has objects
    setTimeout(() => {
      const scene = (this.sceneService.sceneApp as any)._scene.scene;
      console.log('🎯 Scene children count:', scene.children.length);
      console.log('🎯 Scene children:', scene.children.map((child: any) => child.type));
      
      // Add basic lighting if scene is empty
      if (scene.children.length === 0) {
        console.log('⚠️ Scene is empty, adding basic lighting...');
        // Add a simple light to make scene visible
        const light = new DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        console.log('💡 Added directional light to scene');
      }
    }, 1000);
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

  public setFireballBloom(): void {
    (this.sceneService.sceneApp as any)._renderingPipeline?.setFireballBloom();
    console.log('🔥 Fireball bloom preset applied');
  }

  public setExplosionBloom(): void {
    (this.sceneService.sceneApp as any)._renderingPipeline?.setExplosionBloom();
    console.log('💥 Explosion bloom preset applied');
  }

  public setSubtleBloom(): void {
    (this.sceneService.sceneApp as any)._renderingPipeline?.setSubtleBloom();
    console.log('✨ Subtle bloom preset applied');
  }
} 