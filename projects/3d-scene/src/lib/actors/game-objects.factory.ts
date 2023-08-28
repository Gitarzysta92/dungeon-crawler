import { Color, ColorRepresentation, CylinderGeometry, DodecahedronGeometry, DoubleSide, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, RingGeometry, ShaderMaterial, SphereGeometry, SpriteMaterial, Texture, Vector2, Vector3 } from "three";
import { FieldObject } from "./game-objects/field.game-object";
import { NuclearRodObject } from "./game-objects/nuclear-rod.game-object";
import { TerrainObject } from "./game-objects/terrain.game-object";
import { TileObject } from "./game-objects/tile.game-object";
import nuclearRodFragmentShader from "../shaders/nuclear-rod.fragment";
import nuclearRodVertexShader from "../shaders/nuclear-rod.vertex";
import particleFragmentShader from "../shaders/particle.fragment";
import particleVertexShader from "../shaders/particle.vertex";
import { ParticlesObject } from "./game-objects/particles.game-object";
import { DustObject } from "./game-objects/dust.game-object";




export class GameObjectFactory {

  static createHexField(c: {
    auxId: string,
    auxCoords: string,
    coords: Vector3,
    highlighted?: { color: ColorRepresentation | undefined },
    disabled?: boolean,
  }): FieldObject {
    return new FieldObject({
      auxId: c.auxId,
      auxCoords: c.auxCoords,
      position: c.coords,
      mainGeometry: new CylinderGeometry(5, 5, 5, 6),
      mainMaterial: new MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.65,
        metalness: 0.15,
        aoMapIntensity: 1,
        depthTest: true
      }),
      upperGeometry: new CylinderGeometry(5, 5, 0.5, 6),
      upperMaterial: new MeshStandardMaterial({ color: 0x222222 }),
      topGeometry: new RingGeometry(2, 4, 6),
      topMaterial: new MeshStandardMaterial({ metalness: 0, roughness: 100, color: 0x3d3d3d })
    });
  }

  static createTile(c: {
    auxId: string,
    coords: Vector3,
    texture: Texture,
    outlineColor: ColorRepresentation
  }) {
    const topMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      aoMapIntensity: 1,
      map: c.texture,
      reflectivity: 1,
      refractionRatio: 1,
      fog: false,
      depthTest: true
    });

    const material = new MeshBasicMaterial({ color: 0x141414, aoMapIntensity: 1 });
    const geometry = new CylinderGeometry(5, 5, 0.7, 6);
    geometry.rotateY((Math.PI / 180) * 90);

    const outlineGeometry = new RingGeometry(5, 5.5, 6, 1, 0, 2 * Math.PI);
    outlineGeometry.rotateX((Math.PI / 180) * 90);

    return new TileObject({
      auxId: c.auxId,
      position: c.coords,
      outlineColor: c.outlineColor,
      mainMaterial: [material, topMaterial, material, material],
      mainGeometry: geometry,
      outlineMaterial: new MeshBasicMaterial({
        color: c.outlineColor,
        aoMapIntensity: 1,
        side: DoubleSide,
        transparent: true,
        opacity: 1,
        depthTest: true
      }),
      outlineGeometry: outlineGeometry
    })
  };


  static rodMaterial = new ShaderMaterial({
    uniforms: { time: { value: 1.0 } },
    vertexShader: nuclearRodVertexShader,
    fragmentShader: nuclearRodFragmentShader,
    fog: false
  });

  static createNuclearRod(c: {
    coords: Vector3,
    rotation: Vector3,
    color: ColorRepresentation
  }): NuclearRodObject {
    const material = new MeshBasicMaterial({ color: c.color });
    return new NuclearRodObject({
      position: c.coords,
      rotation: c.rotation,
      mainGeometry: new CylinderGeometry(0.5, 0.5, 12, 12),
      mainMaterial: this.rodMaterial,
      upperGeometry: new CylinderGeometry(0.6, 0.6, 0.6, 12),
      upperMaterial: material,
      topGeometry:  new CylinderGeometry(0.5, 0.5, 0.2, 12),
      topMaterial: material
    });
  }

  static createTerrain(c: {
    mapTexture: Texture,
    normalMapTexture: Texture,
    displacementMapTexture: Texture,
    color: ColorRepresentation 
  }) {
    const geometry = new PlaneGeometry(200, 200, 20, 20);
    geometry.rotateX(-Math.PI * 0.5)
    return new TerrainObject({
      mainGeometry: geometry,
      mainMaterial: new MeshStandardMaterial({
        map: c.mapTexture,
        normalMap: c.normalMapTexture,
        normalScale: new Vector2(2,2),
        displacementMap: c.displacementMapTexture,
        displacementScale: 8,
        color: c.color,
        roughness: 1,
        metalness: 0,
        //aoMapIntensity: 100,
        depthTest: true
      }),
      mainMaterialMask: new MeshStandardMaterial({
        displacementMap: c.displacementMapTexture,
        displacementScale: 8,
        color: 0x00000,
        roughness: 1,
        metalness: 0,
        aoMapIntensity: 100,
        clipShadows: true
      })
    });
  }

  static createSphericalParticles(c: {
    coords: Vector3,
    count: number,
    color: ColorRepresentation
  }) {
    const material = new MeshStandardMaterial({
      color: c.color,
      transparent: true,
      emissive: c.color,
      emissiveIntensity: 3,
      opacity: 1
    });
    material.onBeforeCompile = (s, r) => {
      s.fragmentShader = particleFragmentShader;
      s.vertexShader = particleVertexShader;
    };

    return new ParticlesObject({
      mainGeometry: new SphereGeometry(5, 5, 5),
      mainMaterial: material,
      position: c.coords,
      particlesNumber: c.count
    })
  }

  static createDisortedParticles(c: {
    coords: Vector3,
    count: number,
  }) {
    const material = new MeshStandardMaterial({
      color: new Color(0x27100a),
      flatShading: true,
      roughness: 1,
      metalness: 0
    });

    return new ParticlesObject({
      mainGeometry: new DodecahedronGeometry(18),
      particlesNumber: c.count,
      mainMaterial: material,
      position: c.coords
    });
  }

  static createDust(c: {
    coords: Vector3,
    texture: Texture,
  }) {
    return new DustObject({
      position: c.coords,
      mainMaterial: new SpriteMaterial({
        map: c.texture,
        color: 0x4a332d,
        depthTest: false
      }),
    });
  }
}