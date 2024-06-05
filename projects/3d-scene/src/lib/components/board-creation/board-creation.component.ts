import { ActorsManager } from "../../actors/actors-manager";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { HexagonalPlainsObject } from "../../actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.game-object";
import { Matrix4, Vector2, Color, BufferGeometry, CylinderGeometry, InstancedMesh, MeshLambertMaterial, MeshPhongMaterial } from "three";
import { IRawVector3 } from "../../extensions/types/raw-vector3";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";
import { Observable, filter, map } from "rxjs";



export class BoardCreationComponent {


  public defs: Array<IRawVector3> = [];
  
  private _terrain: InstancedMesh<BufferGeometry, MeshLambertMaterial> | undefined;
  private _matrix = new Matrix4();

  private readonly _fieldSpanMultiplayerX = 1.7;
  private readonly _fieldSpanMultiplayerZ = 1.5;

  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _inputs: Observable<PointerEvent>
  ) { }

  public listenForCreationFieldClick(): Observable<IRawVector3> {
    const v = new Vector2()
    return this._inputs
      .pipe(filter(e => e.type === 'click'))
      .pipe(map(e => {
        v.set(e.clientX, e.clientY);
        const o = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(e.clientX, e.clientY, v))
          .find(i => i.instanceId != null);

        return this.defs[o!.instanceId!]
      }))
  }
  
  public build(): InstancedMesh<BufferGeometry, MeshLambertMaterial> {
    const material = new MeshPhongMaterial({
      color: 0xffffff,
      opacity: 100
    });
    const cylinderGeometry = new CylinderGeometry(1, 1, 0.4, 6);

    const mesh = new InstancedMesh(cylinderGeometry, material, 2500);
    return mesh as any;
  }

  public hideCreationFields() {
    if (this._terrain) {
      this._actorsManager.removeObject(this._terrain);
      delete this._terrain
    }
  }

  public showCreationFields(coords: IRawVector3[]) {
    if (!this._terrain) {
      this._terrain = this.build();
      this._actorsManager.addObject(this._terrain);
    }
    this.defs = coords;
    this.update()
  }

  public update(): void {
    if (this._terrain) {
      this._terrain.count = this.defs.length;
      let offsetX = 0
      this.defs.forEach((def, i) => {
        offsetX = 0;
        if (def.z % 2) {
          offsetX += 0.5
        }
        this._matrix.setPosition((def.x + offsetX) * this._fieldSpanMultiplayerX , def.y, def.z * this._fieldSpanMultiplayerZ );
        this._terrain?.setMatrixAt(i, this._matrix);
        this._terrain?.setColorAt(i, new Color("white"))
      })
      this._terrain.instanceMatrix.needsUpdate = true;
      this._terrain.material.needsUpdate = true;
    }
  }

  public getIndex(position: IRawVector3) {
    return this.defs.findIndex(d => {
      return d.x === position.x && d.y === position.y && d.z && position.z;
    })
  }

  public getFieldByViewportCoords(x: number, y: number): any | undefined {
    const mc = new Vector2();
    const instanceId = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
    .find(i => i.object instanceof HexagonalPlainsObject)?.instanceId as any;
    return   { instanceId, ...this.defs[instanceId] };
  }

  // public initializeFieldHovering() {
  //   let prevInstanceId: number | null = null;
  //   const v = new Vector2()
  //   this._inputs.pipe(filter(e => e.type === 'mousemove'))
  //     .subscribe(e => {
  //       v.set(e.clientX, e.clientY);
  //       const boardObject = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(e.clientX, e.clientY, v))
  //         .find(i => i.object instanceof HexagonalPlainsObject);
        
  //       if (prevInstanceId != null) {
  //         const def = this.defs[prevInstanceId];
  //         def.onHover(false)
  //         document.body.style.cursor = "auto";
  //         this._terrain?.settle(def.auxId!);
          
  //         prevInstanceId = null;
  //       }
        
  //       if (boardObject?.instanceId != null) {
  //         const def = this.defs[boardObject.instanceId];
  //         def.onHover(true);
  //         document.body.style.cursor = "pointer";
  //         (boardObject.object as unknown as HexagonalPlainsObject).hover(def.auxId!)
  //         prevInstanceId = boardObject.instanceId;
  //       }
        
  //     })
  // }


  public getFieldPosition(p: IRawVector3): IRawVector3 { 
    let offsetX = 0
    offsetX = 0;
    if (p.z % 2) {
      offsetX += 0.5
    }
    return Object.assign(p, {
      x: (p.x + offsetX) * this._fieldSpanMultiplayerX,
      y: p.y,
      z: p.z * this._fieldSpanMultiplayerZ
    })
  }

}







// public select(indexes: number[]) {
  //   const matrix = new Matrix4();
  //   const tempG = this._terrain?.mesh.geometry.clone();

  //   const geometries = [];
  //   for (let index of indexes) {
  //     this._terrain?.mesh.getMatrixAt(index, matrix);
  //     const b = tempG!.applyMatrix4(matrix).clone();
  //     geometries.push(b)
  //   }

  //   const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
  //   console.log(geometry)
  //   const mesh = new Mesh(geometry, this._createFireMaterial());
  //   mesh.position.setY(0.4);
  //   this._terrain?.mesh.add(mesh);
  
  // }





    // for (let index of indexes) {
    //   this._terrain?.mesh.getMatrixAt(index, matrix);
    //   const pAttribute = tempG!.applyMatrix4(matrix).getAttribute('position');
    //   const iAttribute = tempG!.index;
    //   console.log(pAttribute, iAttribute)
    //   for ( let vertexIndex = 0; vertexIndex < 40; vertexIndex ++ ) {
    //     vertex.fromBufferAttribute(pAttribute, vertexIndex);
    //     points = points.concat([vertex.x, vertex.y, vertex.z])
    //     coords.push(new Vector2(vertex.x, vertex.z))
    //   }
    // }

    // let bg = new BufferGeometry();
    // const ver = new Float32Array(points);
    // bg.setAttribute('position', new BufferAttribute(ver, 3, false))
    // bg = BufferGeometryUtils.mergeVertices(bg)
    // bg.computeVertexNormals();
    // bg.computeBoundingBox();
    // bg.computeBoundingSphere();
    // var mesh = new Mesh(bg, new MeshPhongMaterial({ color: 0x000000 }));
    // mesh.position.setY(1)
    // this._terrain?.mesh.add(mesh);


    // var dotMaterial = new PointsMaterial( { size: 5, sizeAttenuation: false } );
    // var dot = new Points( bg, dotMaterial );
    // this._terrain?.mesh.add(dot);


    // const shape = new Shape(coords);
// this._terrain?.mesh.add(new Mesh(new ShapeGeometry(shape), new MeshPhongMaterial({ color: 0x000000 })))
    

// private _createFireMaterial(): ShaderMaterial {
//   return new ShaderMaterial({
//     uniforms: {
//       color1: {
//         value: new Color(0x004aae)
//       },
//       color2: {
//         value: new Color(0x96bbed)
//       },
//       color3: {
//         value: new Color(0x540cf8)
//       },
//     },
//     vertexShader: buildVertexShader(
//       `
//       varying vec2 vUv;
//       `,
//       `
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//       `
//     ),
//     fragmentShader: buildFragmentShader(
//       `
//         uniform vec3 color1;
//         uniform vec3 color2;
//         uniform vec3 color3;
//         varying vec2 vUv;
//       `,
//       `
//       float a = edgeFactor(vUv);
    
//     vec3 c = mix(vec3(1), vec3(0), a);
    
//     gl_FragColor = vec4(c, 1.0);
//       `,
//       `
//       float edgeFactor(vec2 p){
//         float thickness = 13.0;
//         vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;
//         return min(grid.x, grid.x);
//       }`
//     ),
//     //wireframe: true
//   });
// }