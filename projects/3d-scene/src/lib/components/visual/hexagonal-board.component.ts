import { ActorsManager } from "../../actors/actors-manager";
import { GameObjectFactory } from "../../actors/game-objects.factory";
import { IBoardAppearanceSetup } from "../interfaces/board-appearance-setup";

export class HexagonalBoardComponent {

  constructor(
    private readonly _actorsManager: ActorsManager
  ) { }

  public initialize(os: IBoardAppearanceSetup): void {
    os.fields.forEach(f => {
      let { coords } = f;
      coords.x = coords.x * 10;
      coords.z = coords.z * 9;
      coords.y = 5;
      const field = GameObjectFactory.createHexField(f);

      // if (f.highlighted && f.highlighted.color) {
      //   field.highlight();
      // }
      
      this._actorsManager.initializeObject(field);
      this._actorsManager.referenceField = field;
    });
  }
}