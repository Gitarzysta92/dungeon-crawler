import { Vector3, PlaneGeometry, MeshStandardMaterial, MeshBasicMaterial, DoubleSide, RingGeometry, Mesh, Shape, ShapeGeometry, BoxGeometry, ExtrudeGeometry, LatheGeometry, ColorRepresentation } from "three";
import { GuiArrowObject } from "./gui-objects/arrow-object";
import { GuiObject } from "./gui-objects/gui-object";
import { InteractiveGuiObject } from "./gui-objects/interactive-gui-object";


export class GuiObjectFactory {
  
  static createGuiPlane(coords: Vector3, width: number, height: number) {
    const planeGeometry = new PlaneGeometry(width, height, 1, 1)
    const material = new MeshStandardMaterial({
      color: 0xffffff,
      opacity: 0.2,
      emissiveMap: null,
      transparent: true,
      visible: false
    });
    return new GuiObject(coords, planeGeometry, material);
  }

  static createGuiRotateArrow(coords: Vector3, width: number) {
    const material = new MeshBasicMaterial({
      color: 0x6ff,
      aoMapIntensity: 1,
      side: DoubleSide,
      transparent: true,
      opacity: 1,
      depthTest: true
    });

    const ringGeometry = new RingGeometry(6, 9, 30, 1, 0, 2.2);
    return new GuiObject(coords, ringGeometry, material);
  }


  static createRotateArrow(coords: Vector3, cfg: any) {
    const material = new MeshBasicMaterial({
      color: cfg.settled,
      aoMapIntensity: 1,
      side: DoubleSide,
      transparent: true,
      opacity: 1,
      depthTest: false,
      fog: false
    });

    const ringGeometry = new RingGeometry(6, 9, 30, 1, 0, 1.5);
    const arrowShape = new Shape();
    const x = 6;
    const y = -3;

    arrowShape.moveTo(x , y);
    arrowShape.lineTo(x, y + 5)
    arrowShape.lineTo(x + 5, y + 5)
    arrowShape.lineTo(x, y);

    const arrow = new ShapeGeometry( arrowShape );
    
    const guiObject = new InteractiveGuiObject(coords, ringGeometry, material);   
    guiObject.child = new Mesh(arrow, material);

    guiObject.hoveredColor = cfg.hovered;
    guiObject.settledColor = cfg.settled;
	
    return guiObject;
  }

  static createMoveArrow(c: {
    coordsFrom: Vector3,
    coordsTo: Vector3
    color: ColorRepresentation
  }) {
    const extrudeSettings = {
      steps: 1,
      depth: 2,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 10,
      bevelSegments: 1
    };

    const wrapperGeometry = new BoxGeometry(10, 10, c.coordsFrom.distanceTo(c.coordsTo));
    const wrapperMaterial = new MeshStandardMaterial({ visible: false });
    const arrowMaterial = new MeshStandardMaterial({ color: c.color });

    return new GuiArrowObject({
      auxId: "string",
      position: c.coordsFrom,
      height: 11,
      targetPosition: c.coordsTo,
      wrapperGeometry: wrapperGeometry,
      wrapperMaterial: wrapperMaterial,
      arrowMaterial: arrowMaterial,
      extrudeSettings: extrudeSettings
    });
  }
  
}
