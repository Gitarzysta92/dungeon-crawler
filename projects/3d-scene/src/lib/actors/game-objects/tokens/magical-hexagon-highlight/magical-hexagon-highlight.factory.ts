import { Group, CylinderGeometry, ShaderMaterial, Vector3, Mesh } from "three";
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

    // Create shader material
    const material = new ShaderMaterial({
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
      blending: 1, // Additive blending
      depthWrite: false,
      side: 1 // Front side only (inner face)
    });

    const mesh = new Group();
    const highlightMesh = new Mesh(geometry, material);
    mesh.add(highlightMesh);

    return mesh;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return []; // No assets required for this highlight
  }
} 