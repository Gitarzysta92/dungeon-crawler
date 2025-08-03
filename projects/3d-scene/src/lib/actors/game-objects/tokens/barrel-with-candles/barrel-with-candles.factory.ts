import { Group, Mesh, BufferGeometry, MeshLambertMaterial, SpriteMaterial, Sprite, OctahedronGeometry, MeshStandardMaterial, PointLight, Color, ShaderMaterial } from "three";
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


export class BarrelWithCandlesFactory extends ActorFactoryBase<IBarrelWithCandlesComposerDefinition, BarrelWithCandlesObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _anmationService: AnimationService
  ) { 
    super(barrelWithCandlesDefinitionName)
  }

  public async create(def: IBarrelWithCandlesCreationDefinition): Promise<BarrelWithCandlesObject> {
    const treasureChest = await BarrelWithCandlesFactory.build(def, this._assetsLoader, PointLightFactory);
    return new BarrelWithCandlesObject(def, treasureChest, this._anmationService);
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
    pointLightFactory: typeof PointLightFactory
  ): Promise<Group> {
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

    // Add temporary UI for fire position management
    BarrelWithCandlesFactory.addFirePositionUI(fires, group);

    // const light = await pointLightFactory.build({
    //   color: def.lightColor,
    //   intensity: 10,
    //   distance: 2,
    //   decay: 1,
    //   castShadow: true
    // })
    // light.position.setY(1);
    // group.add(light);
    return group;
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
    fire.userData.material = fireMaterial;
    fire.userData.bloomMaterial = this._getFireBloomMaterial()
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

    private static _getFireBloomMaterial(): ShaderMaterial {
      return new ShaderMaterial({
        uniforms: {
          bloomColor: { value: new Color(0xfc6e0f) },
          bloomIntensity: { value: 10 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 bloomColor;
          uniform float bloomIntensity;
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(bloomColor * bloomIntensity, 1.0);
          }`
      });
    }

  // TEMPORARY UI FOR FIRE POSITION MANAGEMENT - REMOVE AFTER POSITIONING IS DONE
  public static addFirePositionUI(fires: Array<{ fire: Mesh, index: number, position: { x: number, y: number, z: number } }>, group: Group): void {
    // Create UI container if it doesn't exist
    let uiContainer = document.getElementById('fire-position-ui');
    if (!uiContainer) {
      uiContainer = document.createElement('div');
      uiContainer.id = 'fire-position-ui';
      uiContainer.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 1000;
        border: 1px solid #333;
      `;
      document.body.appendChild(uiContainer);
    }

    // Clear existing content
    uiContainer.innerHTML = '<h3 style="margin: 0 0 10px 0;">🔥 Fire Position Manager</h3>';

    // Create controls for each fire
    fires.forEach((fireObj, index) => {
      const fireDiv = document.createElement('div');
      fireDiv.style.cssText = 'margin-bottom: 10px; padding: 8px; border: 1px solid #555; border-radius: 4px;';
      
      fireDiv.innerHTML = `
        <div style="margin-bottom: 5px;"><strong>Fire ${index + 1}</strong></div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-bottom: 5px;">
          <label>X: <input type="number" step="0.01" value="${fireObj.position.x.toFixed(2)}" 
            onchange="updateFirePosition(${index}, 'x', this.value)"></label>
          <label>Y: <input type="number" step="0.01" value="${fireObj.position.y.toFixed(2)}" 
            onchange="updateFirePosition(${index}, 'y', this.value)"></label>
          <label>Z: <input type="number" step="0.01" value="${fireObj.position.z.toFixed(2)}" 
            onchange="updateFirePosition(${index}, 'z', this.value)"></label>
        </div>
        <button onclick="removeFire(${index})" style="background: #d32f2f; color: white; border: none; padding: 2px 6px; border-radius: 3px; font-size: 10px;">Remove</button>
      `;
      
      uiContainer!.appendChild(fireDiv);
    });

    // Add global functions for the UI
    (window as any).updateFirePosition = (index: number, axis: 'x' | 'y' | 'z', value: string) => {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        fires[index].position[axis] = numValue;
        fires[index].fire.position[axis] = numValue;
        console.log(`Updated fire ${index + 1} ${axis} to ${numValue}`);
      }
    };

    (window as any).removeFire = (index: number) => {
      if (fires[index]) {
        group.remove(fires[index].fire);
        fires.splice(index, 1);
        console.log(`Removed fire ${index + 1}`);
        // Refresh UI
        BarrelWithCandlesFactory.addFirePositionUI(fires, group);
      }
    };

    // Add export button
    const exportButton = document.createElement('button');
    exportButton.textContent = '📋 Export Positions';
    exportButton.style.cssText = `
      background: #2196f3;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      margin-top: 10px;
      cursor: pointer;
      width: 100%;
    `;
    exportButton.onclick = () => {
      const positions = fires.map(f => f.position);
      const json = JSON.stringify(positions, null, 2);
      console.log('Fire positions:', json);
      navigator.clipboard.writeText(json).then(() => {
        alert('Positions copied to clipboard!');
      });
    };
    uiContainer.appendChild(exportButton);

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '❌ Close UI';
    closeButton.style.cssText = `
      background: #666;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      margin-top: 5px;
      cursor: pointer;
      font-size: 10px;
    `;
    closeButton.onclick = () => {
      uiContainer!.remove();
    };
    uiContainer.appendChild(closeButton);
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