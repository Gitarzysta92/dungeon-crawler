import { IReward, IRewardsTracker } from "./rewards.interface";

export class RewardsTracker implements IRewardsTracker {
 
  rewardsToClaim: IReward[];
  claimedRewards: (IReward & { claimed: boolean })[];

  constructor(data: IRewardsTracker) {
    this.rewardsToClaim = data.rewardsToClaim;
    this.claimedRewards = data.claimedRewards;
  }

  public getRewardsToClaim(): IReward[] {
    return this.rewardsToClaim;
  }

  public autoclaimRewards(): IReward[] {
    const claimedRewards = [];
    for (let reward of this.rewardsToClaim) {
      if (reward.autoclaim) {
        const r = Object.assign(reward, { claimed: true });
        this.claimedRewards.push(r);
        claimedRewards.push(r);
      }
    } 
    this.rewardsToClaim = this.rewardsToClaim.filter(r => !r.autoclaim);
    return claimedRewards;
  }

  public registerReward(reward: IReward) {
    this.rewardsToClaim.push(reward);
  }

  public claimReward(reward: IReward) {
    for (let reward of this.rewardsToClaim) {
      if (reward.autoclaim) {
        this.claimedRewards.push(Object.assign(reward, { claimed: true }));
      }
    } 
    this.rewardsToClaim = this.rewardsToClaim.filter(r => !r.autoclaim);
  }



  function gainRewardsForKillingEnemies(
    allActorsFromState: (ICreature & IRewarding)[],
    rewardsTracker: RewardsTracker
  ): void  {
    for (let actor of allActorsFromState) {
      if ('health' in actor && actor.health === 0 && actor.actorType === ActorType.Creature && !!actor.rewards) {
        for (let reward of actor.rewards) {
          rewardsTracker.registerReward(reward);
        }
      }
    }
  }

}