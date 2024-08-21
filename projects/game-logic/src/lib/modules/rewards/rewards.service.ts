import { EntityService } from "../../base/entity/entity.service";
import { IReward } from "./rewards.interface";



export class RewardService {

  constructor(
    private readonly _entityService: EntityService,
  ) {}

  public claimRewards() {
    // this._entityService.getEntities<Rewarding>(e => e.isRewarding)
    //   .forEach(e => {
    //     const rewards = e.rewards.filter(r => r.conditions.every(c => c.invoke(e)) && !r.claimed);
    //     rewards.forEach(r => {
    //       r.actions.forEach(a => a.invoke(e));
    //       r.claimed = true;
    //       r.awardable = this._refService.resolve(r.awardable, e);

    //       r.awardable.forEach(a => a.claimedRewards.register(r))

    //     })
    //   })
  }
  
  public claimReward(reward: IReward) {

  }
}