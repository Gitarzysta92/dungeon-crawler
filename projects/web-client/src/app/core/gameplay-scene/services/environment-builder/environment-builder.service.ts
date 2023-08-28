import { Injectable } from "@angular/core";
import { ISceneEnvironmentDeclaration } from "../../models/scene-environment-declaration";
import { ITerrainDeclaration} from "@3d-scene/scene/interfaces/declarations/terrain-declaration";
import { INuclearRodsAreaDeclaration } from "@3d-scene/scene/interfaces/declarations/nuclear-rods-area-declaration";
import { ISceneObjectDeclaration } from "@3d-scene/scene/interfaces/declarations/scene-object-declaration";
import { IParticlesAreaDeclaration } from "@3d-scene/scene/interfaces/declarations/particles-area-declaration";
import { IGlobalParticlesDeclaration } from "@3d-scene/scene/interfaces/declarations/global-particles-declaration";
import { IDustParticlesDeclaration } from "@3d-scene/scene/interfaces/declarations/dust-particles-declaration";
import { ILightDeclaration } from "@3d-scene/scene/interfaces/scene-composer-setup";

@Injectable()
export class EnvironmentBuilderService {

  public buildEnvironmentDeclaration(): ISceneEnvironmentDeclaration {
    return {
      terrain: this._buildTerrainDeclaration(),
      lights: this._buildLightsDeclaration(),
      objects: this._buildEnvironmentObjects()
    } 
  }

  private _buildTerrainDeclaration(): ITerrainDeclaration {
    const textureName = "Vol_39_2";
    return {
      color: 0xa07966,
      mapTexture: {
        url: `${textureName}-base.png`,
        wrap: 'repeatWrapping',
        repeat: { x: 2, y: 2 },
        offset: { x: 3, y: 3 },
      },
      normalMapTexture: {
        url: `${textureName}-normal.png`,
       
      }, 
      displacementMapTexture: {
        url: `${textureName}-height.png`,
        wrap: 'repeatWrapping',
        repeat: { x: 2, y: 2 },
        offset: { x: 3, y: 3 },
      },
      axisYOffset: 0
    }
  }

  private _buildLightsDeclaration(): ILightDeclaration[] {
    return [
      {
        type: "directional-light",
        params: {
          color: 0xff7404,
          intensity: 3.8,
          shadow: { near: 10, far: 200, left: -30, right: 30, top: 35, bottom: -30 },
          radius: 10,
          castShadow: true,
          position: { x: -100, y: 30, z: 10 }
        } 
      },
      {
        type: "directional-light",
        params: {
          color: 0xfbdaa0,
          intensity: 3.2, 
          shadow: { near: 10, far: 1300, left: -530, right: 530, top: 535, bottom: -530 },
          radius: 10,
          castShadow: true,
          position: { x: -500, y: 500, z: -500 }
        } 
      },
      {
        type: "ambient-light",
        params: { color: 0xfbdaa0 }
      },
      {
        type: "hemisphere-light",
        params: { skyColor: 0xB1E1FF, groundColor: 0xa07966, intensity: 1}
      }      
    ];
  }

  private _buildEnvironmentObjects(): ISceneObjectDeclaration[] {
    return [
      this._getNuclearRodsArea(),
      this._getParticlesArea(),
      this._getGlobalParticles(),
      this._getDustParticlesPointerEffect(),
    ]
  }
  
  private _getNuclearRodsArea(): INuclearRodsAreaDeclaration {
    return {
      type: "nuclear-rods",
      coords: { x: 0, y: 0, z: 0 },
      rods: [
        { 
          coords: { x: 20, y: 4.5, z: 20 },
          rotation: { x: 0, y: 0, z: -13 },
          color: 0xa07966
        },
        {
          coords: { x: 25, y: 4.5, z: 25 },
          rotation: { x: 0, y: 0, z: 14 },
          color: 0xa07966
        }
      ],
      lights: [
        { 
          color: 0x0e5def,
          intensity: 30,
          distance: 10,
          decay: 1,
          radius: 1,
          castShadow: false,
          position: { x: 20, y: 5, z: 20 }
        },
        {
          color: 0x0e5def,
          intensity: 90,
          distance: 1000,
          decay: 0.5,
          radius: 4,
          castShadow: true,
          position: { x: 21, y: 10, z: 21 }
        }
      ]
    }
  }

  private _getParticlesArea(): IParticlesAreaDeclaration {
    return {
      type: "particles-area",
      coords: { x: 23, y: 10, z: 22 },
    }
  }

  private _getGlobalParticles(): IGlobalParticlesDeclaration {
    return {
      type: "global-particles",
      mapTexture: { url: "particle.dcae8b12.webp" }
    }
  }

  private _getDustParticlesPointerEffect(): IDustParticlesDeclaration {
    return {
      type: "dust-particles-pointer-effect",
      mapTexture: { url: "smoke.png" },
      coords: { x: 0, y: 10, z: 0 }
    }
  }
}