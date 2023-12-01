import { ColorRepresentation } from "three";
import { Hoverable } from "../../behaviours/hover/hoverable";
import { GuiObject } from "./gui-object";

export class InteractiveGuiObject extends GuiObject implements Hoverable {
  public isHovered: boolean = false;
  public hoveredColor!: ColorRepresentation
  public settledColor!: ColorRepresentation

  hovered(): void {
    this.mesh.material.color.setHex(this.hoveredColor);
  }

  settled(): void {
    this.mesh.material.color.setHex(this.settledColor);
  }

}