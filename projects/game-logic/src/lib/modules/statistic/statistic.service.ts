export class StatisticsService {


  public calculateStatsDifference<T extends object>(source: T, target: T): number {
    return this.getStatsDifferences(source, target).reduce((c, s) => c += s.value, 0)
  }
  
  
  public getStatsDifferences<T extends object>(source: T, target: T): { statName: string, value: number }[] {
    return Object.entries(source).reduce((c, s) =>
      c.concat({ statName: s[0], value: target[s[0] as keyof typeof target] as unknown as number - s[1] }), [] as { statName: string, value: number }[])
  }
  
  // public modifyStats<T extends IBasicStats>(effect: IModifyStats<any>, actor: T): IModifyStatsResult<T> {
  //   const modifications: Array<{
  //     statName: keyof T
  //     statBefore: number;
  //     statAfter: number;
  //   }> = [];
  
  //   for (let mod of effect.statsModifications) {
  //     const modification: any = {
  //       statName: mod.statName
  //     }
  //     if (mod.statName in actor) {
  //       modification.statBefore = actor[mod.statName as keyof typeof actor] as number;
  //       switch (mod.modifierType) {
  //         case "add":
  //           (actor[mod.statName as keyof typeof actor] as number) += mod.modiferValue;
  //           break;
          
  //         case "substract":
  //           (actor[mod.statName as keyof typeof actor] as number) -= mod.modiferValue;
  //           break;
        
  //         default:
  //           break;
  //       }
  //       modification.statAfter = actor[mod.statName as keyof typeof actor] as number;
  //       modifications.push(modification);
  //     }
  //   }
  
  //   return {
  //     targetId: actor.id,
  //     modifications: modifications
  //   }
  // }

}


