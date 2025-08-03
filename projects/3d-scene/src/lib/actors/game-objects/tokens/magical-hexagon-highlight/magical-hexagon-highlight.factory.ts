import { Group, CylinderGeometry, ShaderMaterial, Vector3, Mesh, MeshBasicMaterial, DoubleSide } from "three";
import { AnimationService } from "../../../../animations/animation.service";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { ActorsManager } from "../../../actors-manager";
import { FieldBase } from "../../fields/common/base-field.game-object";
import { IAssetDeclaration } from "../../../../assets/assets.interface";
import { IMagicalHexagonHighlightComposerDefinition, IMagicalHexagonHighlightCreationDefinition, IMagicalHexagonHighlightDefinition } from "./magical-hexagon-highlight.interfaces";
import { magicalHexagonHighlightDefinitionName } from "./magical-hexagon-highlight.constants";
import { MagicalHexagonHighlightObject } from "./magical-hexagon-highlight.game-object";
import vertexShader from "../../../../shaders/magical-hexagon-highlight.vertex";
import fragmentShader from "../../../../shaders/magical-hexagon-highlight.fragment";

export class MagicalHexagonHighlightFactory extends ActorFactoryBase<IMagicalHexagonHighlightComposerDefinition, MagicalHexagonHighlightObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _animationService: AnimationService
  ) { 
    super(magicalHexagonHighlightDefinitionName)
  }

  public async create(def: IMagicalHexagonHighlightCreationDefinition): Promise<MagicalHexagonHighlightObject> {
    const highlight = await MagicalHexagonHighlightFactory.build(def);
    return new MagicalHexagonHighlightObject(def, highlight, this._animationService);
  }

  public async compose(def: IMagicalHexagonHighlightComposerDefinition): Promise<void> {
    const token = await this.create(def);
    token.object.layers.enable(1)
    this._actorsManager.initializeObject(token);
    if (def.rotation) {
      token.object.rotation.set(def.rotation as any, def.rotation as any, def.rotation as any);
    }
    const field = this._actorsManager.getObjectById<FieldBase & any>(def.takenFieldId!);
    if (field) {
      const { coords } = field.takeBy(token, def.takenFieldId);
      token.setPosition(coords);
      token.afterEnteringScene(coords, def.initialAnimationDelay);
    } else if (def.position) {
      token.setPosition(def.position);
    }
    def.isHandled = true;
  }

  public static async build(def: IMagicalHexagonHighlightDefinition): Promise<Group> {
    // Create hexagon cylinder geometry (6 sides) with only bottom face
    const geometry = new CylinderGeometry(1, 1, def.fadeHeight || 2, 6, 1, false);
    
    // Convert colors to vec3 for shader
    const primaryColorVec = new Vector3(
      (def.primaryColor >> 16) & 255,
      (def.primaryColor >> 8) & 255,
      def.primaryColor & 255
    ).divideScalar(255);
    
    const secondaryColorVec = new Vector3(
      (def.secondaryColor >> 16) & 255,
      (def.secondaryColor >> 8) & 255,
      def.secondaryColor & 255
    ).divideScalar(255);

    // Create shader material for sides (with magical effects)
    const sidesMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        primaryColor: { value: primaryColorVec },
        secondaryColor: { value: secondaryColorVec },
        intensity: { value: def.intensity || 1.0 },
        pulseSpeed: { value: def.pulseSpeed || 2.0 },
        fadeHeight: { value: def.fadeHeight || 2.0 }
      },
      transparent: true,
     // blending: 1, // Additive blending
      depthWrite: false,
      side: DoubleSide
    });

    // Create simple material for bottom face (no magical effects)
    const bottomMaterial = new MeshBasicMaterial({
      color: def.primaryColor,
      transparent: true,
      opacity: 0.3,
      side: 1 // Front side only
    });

    // Create transparent material for top face (invisible)
    const topMaterial = new MeshBasicMaterial({
      transparent: true,
      opacity: 0.0, // Completely transparent
      side: 1
    });

    const mesh = new Group();
    
    // Create separate meshes for different parts
    const sidesGeometry = new CylinderGeometry(0.7, 0.7, def.fadeHeight || 2, 6, 1, true); // Open cylinder for sides only - scaled down radius
    const sidesMesh = new Mesh(sidesGeometry, sidesMaterial);
    mesh.add(sidesMesh);
    
    // Create bottom face separately
    const bottomGeometry = new CylinderGeometry(0.7, 0.7, 0.01, 6, 1, false); // Thin cylinder for bottom - scaled down radius
    const bottomMesh = new Mesh(bottomGeometry, bottomMaterial);
    bottomMesh.position.y = -(def.fadeHeight || 2) / 2; // Position at bottom
    mesh.add(bottomMesh);

    return mesh;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return []; // No assets required for this highlight
  }
} 