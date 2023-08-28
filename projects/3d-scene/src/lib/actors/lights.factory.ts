import { AmbientLight, ColorRepresentation, DirectionalLight,HemisphereLight,PointLight, Vector3 } from "three";
import { LightWrapper, ShadowCameraSetting } from "./light-objects/light-wrapper";

export class LightsFactory {
  
  static createPointLight(c: {
    color: ColorRepresentation,
    intensity: number,
    distance: number,
    decay: number,
    radius: number,
    castShadow: boolean,
    position: Vector3
  }): LightWrapper {
    return new LightWrapper(() => {
      const pointLight = new PointLight(c.color, c.intensity, c.distance, c.decay);
      pointLight.shadow.radius = c.radius;
      pointLight.castShadow = c.castShadow;
      pointLight.receiveShadow = false;
      pointLight.shadow.mapSize.width = 812;
      pointLight.shadow.mapSize.height = 812;
      pointLight.position.set(c.position.x, c.position.y, c.position.z);
      return pointLight;
    })
  }

  static createDirectionalLight(c: {
    color: ColorRepresentation,
    intensity: number,
    shadow: ShadowCameraSetting,
    radius: number,
    castShadow: boolean,
    position: Vector3
  }): LightWrapper {
    return new LightWrapper(() => {
      const directionalLight = new DirectionalLight(c.color, c.intensity);
      directionalLight.shadow.radius = c.radius;

      directionalLight.shadow.camera.near = c.shadow.near;
      directionalLight.shadow.camera.far = c.shadow.far;
      directionalLight.shadow.camera.left = c.shadow.left;
      directionalLight.shadow.camera.right = c.shadow.right;
      directionalLight.shadow.camera.top = c.shadow.top;
      directionalLight.shadow.camera.bottom = c.shadow.bottom;
      
      directionalLight.castShadow = c.castShadow;
      directionalLight.receiveShadow = false;

      directionalLight.shadow.mapSize.width = 812;
      directionalLight.shadow.mapSize.height = 812;
      directionalLight.shadow.bias = 0.002;
      directionalLight.position.set(c.position.x, c.position.y, c.position.z);
      return directionalLight;
    })
  }

  static createAmbientLight(c: { color: ColorRepresentation }): LightWrapper {
    return new LightWrapper(() => new AmbientLight(c.color));
  }
  
  static createHemisphereLight(c: {
    skyColor: ColorRepresentation,
    groundColor: ColorRepresentation,
    intensity: number
  }): LightWrapper {
    return new LightWrapper(() => new HemisphereLight(c.skyColor, c.groundColor, c.intensity));
  }
}


