import { CylinderGeometry, Mesh, ShaderMaterial } from "three";
import { ActorBase } from "../../../actor-base"

export class FogOfWarObject extends ActorBase {
  
  constructor(
    protected readonly _object: any
  ) {
    super("");
  }

  public init(): Mesh {
    // this._object.layers.enable( BLOOM_SCENE );    
    // this._upperMesh.position.y = 5.5;
    // this._topMesh.position.y = 6.3;

    super.init();
    return this._object;   
  }

  public recalculate(): void {
    //this._object.material.uniforms.time.value = performance.now() / 1000 as any;
  }

}