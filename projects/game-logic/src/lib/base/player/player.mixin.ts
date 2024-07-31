import { Constructor } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IActivity } from "../activity/activity.interface";
import { IEntity } from "../entity/entity.interface";
import { IGameplay } from "../gameplay/gameplay.interface";
import { PlayerType } from "./players.constants";
import { IPlayer, IPlayerDeclaration, IPlayerState } from "./players.interface";

export class PlayerMixin implements IMixinFactory<IPlayer>  {

  constructor() { }

  public isApplicable(e: IPlayerDeclaration): boolean {
    return e.isPlayer;
  };
  
  public create(bc: Constructor<IEntity>): Constructor<IPlayer> {
    return class Player extends bc implements IPlayer {
  
      public id: string;
      public playerType: PlayerType;
      public groupId: string;
      public selectedPawnId: string; 
      public isPlayer = true as const;
    
      constructor(data: IPlayerState) {
        super(data);
        this.id = data.id;
        this.playerType = data.playerType;
        this.groupId = data.groupId;
        this.selectedPawnId = data.selectedPawnId;
      }
    
      public isAnyActivityAvailable(state: IGameplay, activities: IActivity[]): boolean {
        const pawns = state.getPawns(this);
        return pawns.some(p => activities.some(a => p.canPerform(a)));
      }

    }
  };
}
