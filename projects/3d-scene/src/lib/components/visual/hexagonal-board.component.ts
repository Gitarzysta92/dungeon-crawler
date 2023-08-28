import { ActorsManager } from "../../actors/actors-manager";
import { GameObjectFactory } from "../../actors/game-objects.factory";
import { IBoardAppearanceSetup } from "../interfaces/board-appearance-setup";

export class HexagonalBoardComponent {

  constructor(
    private readonly _actorsManager: ActorsManager
  ) { }

  public initialize(os: IBoardAppearanceSetup): void {
    const offsetX = -20.2;
    const offsetY = -18.2;

    os.fields.forEach(f => {
      let { coords } = f;
      coords.x = coords.x * 5 + offsetX;
      coords.z = coords.z * 9 + offsetY;
      const field = GameObjectFactory.createHexField(f);

      if (f.highlighted && f.highlighted.color) {
        field.highlight(f.highlighted.color)
      }
      
      this._actorsManager.initializeObject(field);
      this._actorsManager.referenceField = field;
    });
  }
}