import { IHexagonGridFieldDeclaration } from "../../actors/game-objects/terrains/hexagon-grid/hexagon-grid.interface";


export interface IHexagonalTerrainFieldDeclaration extends IHexagonGridFieldDeclaration {
  type: number;
}