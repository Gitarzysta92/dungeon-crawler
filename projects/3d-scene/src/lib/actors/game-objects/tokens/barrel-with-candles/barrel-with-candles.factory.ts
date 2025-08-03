import { Group, Mesh, BufferGeometry, MeshLambertMaterial, SpriteMaterial, Sprite, OctahedronGeometry, MeshStandardMaterial, PointLight } from "three";
import { AnimationService } from "../../../../animations/animation.service";
import { modelFileExtensionName, alphaMapFileExtensionName } from "../../../../assets/assets.constants";
import { IAssetsProvider, IAssetDeclaration } from "../../../../assets/assets.interface";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { ActorsManager } from "../../../actors-manager";
import { PointLightFactory } from "../../../light-objects/point-light/point-light.factory";
import { FieldBase } from "../../fields/common/base-field.game-object";
import { IBarrelWithCandlesComposerDefinition, IBarrelWithCandlesCreationDefinition, IBarrelWithCandlesDefinition } from "./barrel-with-candles.interfaces";
import { barrelWithCandlesAlphaMapFileName, barrelWithCandlesBodyModelFileName, barrelWithCandlesCandlesModelFileName, barrelWithCandlesDefinitionName, barrelWithCandlesHoopModelFileName } from "./barrel-with-candles.constants";
import { BarrelWithCandlesObject } from "./barrel-with-candles.game-object";
import { MagicalHexagonHighlightFactory } from "../magical-hexagon-highlight/magical-hexagon-highlight.factory";
import { MagicalHexagonHighlightParticlesFactory } from "../magical-hexagon-highlight/magical-hexagon-highlight-particles.factory";
import { MagicalHexagonHighlightParticlesObject } from "../magical-hexagon-highlight/magical-hexagon-highlight-particles.game-object";


export class BarrelWithCandlesFactory extends ActorFactoryBase<IBarrelWithCandlesComposerDefinition, BarrelWithCandlesObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _anmationService: AnimationService
  ) { 
    super(barrelWithCandlesDefinitionName)
  }

  public async create(def: IBarrelWithCandlesCreationDefinition): Promise<BarrelWithCandlesObject> {
    const { group, particleObjects } = await BarrelWithCandlesFactory.build(def, this._assetsLoader, PointLightFactory, this._anmationService);
    const barrelObject = new BarrelWithCandlesObject(def, group, this._anmationService);
    barrelObject.setParticleObjects(particleObjects);
    return barrelObject;
  }

  
  public async compose(def: IBarrelWithCandlesComposerDefinition): Promise<void> {
    const token = await this.create(def);
    token.object.layers.enable(1)
    this._actorsManager.initializeObject(token);
    token.setRotation(def.rotation);
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


  public static async build(
    def: IBarrelWithCandlesDefinition,
    assetsLoader: IAssetsProvider,
    pointLightFactory: typeof PointLightFactory,
    animationService?: AnimationService
  ): Promise<{ group: Group, particleObjects: MagicalHexagonHighlightParticlesObject[] }> {
    const primaryMaterial = new MeshLambertMaterial({ color: def.primaryColor });
    const secondaryMaterial = new MeshLambertMaterial({ color: def.secondaryColor });

    const group = new Group();
    const barrels = (await assetsLoader.loadAsync({ fileName: barrelWithCandlesBodyModelFileName, ext: modelFileExtensionName })).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    barrels.material = primaryMaterial;
    barrels.receiveShadow = true;
    barrels.castShadow = true;
    barrels.position.setY(0.2);
    group.add(barrels);

    const hoops = (await assetsLoader.loadAsync({ fileName: barrelWithCandlesHoopModelFileName, ext: modelFileExtensionName })).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    hoops.material = secondaryMaterial;
    hoops.receiveShadow = true;
    hoops.castShadow = true;
    hoops.position.setY(0.14);
    group.add(hoops);

    const candles = (await assetsLoader.loadAsync({ fileName: barrelWithCandlesCandlesModelFileName, ext: modelFileExtensionName })).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    candles.material = secondaryMaterial;
    candles.receiveShadow = true;
    candles.castShadow = true;
    candles.position.setY(0);
    group.add(candles);

    const candleAlphaMap = await assetsLoader.loadAsync( { fileName: barrelWithCandlesAlphaMapFileName, ext: alphaMapFileExtensionName });
    // const sprite1 = new Sprite(new SpriteMaterial({ color: def.lightColor, opacity: 0.1, alphaMap: candleAlphaMap }));
    // sprite1.scale.set(0.4, 0.4, 0.4);
    // sprite1.position.set(0.3, 0.65, 0);
    // group.add(sprite1);

    // const sprite2 = new Sprite(new SpriteMaterial({ color: def.lightColor, opacity: 0.1, alphaMap: candleAlphaMap }));
    // sprite2.position.set(0, 0.2, -0.4);
    // group.add(sprite2);

    // const sprite3 = new Sprite(new SpriteMaterial({ color: def.lightColor, opacity: 0.1, alphaMap: candleAlphaMap }));
    // sprite3.position.set(-0.2, 0.2, 0.4);
    // group.add(sprite3);

    // Create 8 fires with configurable positions
    const firePositions = [
      { x: 0.32, y: 0.7, z: -0.01 },
      { x: 0.08, y: 0.16, z: -0.35 },
      { x: 0.02, y: 0.24, z: -0.32 },
      { x: -0.31, y: 0.25, z: 0.36 },
      { x: -0.19, y: 0.03, z: 0.41 },
      { x: 0.08, y: 0.31, z: 0.37 },
      { x: -0.09, y: 0.06, z: -0.38 },
    ];

    const fires = [];
    for (let i = 0; i < firePositions.length; i++) {
      const fire = await BarrelWithCandlesFactory.createCandleFire(firePositions[i]);
      fires.push({ fire: fire.fire, index: i, position: firePositions[i] });
      group.add(fire.fire);
    }



    // Add magical hexagon highlight around the barrel
    const highlight = await MagicalHexagonHighlightFactory.build({
      primaryColor: 0xf55e00, // Orange
      secondaryColor: 0xdb8d0f, // Gold
      intensity: 1.2, // Increased intensity for more magical effect
      pulseSpeed: 2.0, // Faster pulse for more dynamic effect
      fadeHeight: 2 // Increased height for better vertical fade
    });
    highlight.scale.set(1.2, 1.0, 1.2); // Slightly larger than barrel
    highlight.position.setY(0.95); // Position so bottom aligns with barrel base (Y: 0)
    group.add(highlight);

    const light = await pointLightFactory.build({
      color: def.lightColor,
      intensity: 10,
      distance: 2,
      decay: 1,
      castShadow: true
    })
    light.position.setY(1);
    group.add(light);
    
    const particleObjects: MagicalHexagonHighlightParticlesObject[] = [];
    if (animationService) {
      const particles = await MagicalHexagonHighlightParticlesFactory.build(animationService);
      particles.object.scale.set(1.2, 1.0, 1.2); // Match highlight scale
      particles.object.position.setY(1.0); // Position so particles align with highlight
      group.add(particles.object);
      particleObjects.push(particles);
    }
    
    return { group, particleObjects };
  }


  public static async createCandleFire(position: { x: number, y: number, z: number }): Promise<{ fire: Mesh }> {
    // Create fire geometry (slimmer octahedron for flame-like shape)
    const fireGeometry = new OctahedronGeometry(0.05, 0); // Reduced from 0.08 to 0.05 for slimmer flames
    const fireMaterial = new MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff4400,
      emissiveIntensity: 4.0, // Increased for bloom effect
      transparent: true,
      opacity: 0.9, // Slightly more opaque for stronger bloom
      metalness: 0.0,
      roughness: 0.0, // Completely smooth for better bloom
      toneMapped: false // Disable tone mapping for brighter bloom
    });
    
    const fire = new Mesh(fireGeometry, fireMaterial);
    fire.position.set(position.x, position.y, position.z); // Position above candle
    fire.scale.set(0.7, 1.2, 0.7); // Scale vertically to make flames taller without changing radius
    fire.castShadow = false; // No shadows from flames
    
          // Add flickering animation with bloom effect (no movement)
      const animateFire = () => {
        const time = Date.now() * 0.003;
        const flicker = 0.8 + 0.2 * Math.sin(time * 8) + 0.1 * Math.sin(time * 15);
        
        // Enhanced bloom effect with higher base intensity
        fire.material.emissiveIntensity = 3.0 + flicker * 2.0; // Much stronger bloom
        
        requestAnimationFrame(animateFire);
      };
    animateFire();
    
    return { fire };
  }



  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [
      { fileName: barrelWithCandlesBodyModelFileName, ext: modelFileExtensionName },
      { fileName: barrelWithCandlesCandlesModelFileName, ext: modelFileExtensionName },
      { fileName: barrelWithCandlesHoopModelFileName, ext: modelFileExtensionName },
      { fileName: barrelWithCandlesAlphaMapFileName, ext: alphaMapFileExtensionName }
    ]
  }
}