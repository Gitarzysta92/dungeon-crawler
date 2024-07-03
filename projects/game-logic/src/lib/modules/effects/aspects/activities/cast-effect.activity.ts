import { IActivity } from "../../../../base/activity/activity.interface";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { CAST_EFFECT_ACTIVITY } from "../../effects.constantst";

// export class CastEffectActivity implements IMixinFactory<IActivity> {

//   public validate(a: IActivity): boolean {
//     return a.isActivity && a.id === CAST_EFFECT_ACTIVITY;
//   }


//   public create(c: Constructor<IMixin>): Constructor<IActivity> {
//     class CastEffectActivity extends c implements IActivity {

//       public id: string;
//       public cost?: IActivityCost[];
//       public isActivity = true as const;

//       @NotEnumerable()
//       public subject: IActivitySubject & IBoardArea;

//       constructor(d: IActivityDeclaration) {
//         super(d);
//         this.id = d.id;
//         this.cost = d.cost ?? [];
//       }

//       public canBePerformed(c: IBoardTraveler): boolean {
      
//       }



//       public async *perform2(traveler: IBoardTraveler): AsyncGenerator<{ from: ICubeCoordinates, to: ICubeCoordinates }> {
//         this.canBePerformed(traveler);

//         const connection = boardAreaService.getConnection(traveler.occupiedArea, this.area);
//         for (let segment of connection.segments) {
//           if (segment.isOrigin) {
//             continue;
//           }
//           traveler.consumeActivityResources(this.createActivityCost(boardAreaService.calculateTravelCost(segment)));
//           traveler.travel(segment);
//           yield {
//             from: this.area.position,
//             to: segment.position
//           };
//         }
//       }

//       perform(...args: unknown[]): void | AsyncGenerator<unknown, any, unknown> | Promise<void> {
//         //throw new Error("Method not implemented.");
//       }

//     }

//     return TravelActivity;
//   }

// }









// public perform(effect: Effect & IActivitySubject & Partial<Ability> & Partial<Item>): IDispatcherDirective {
//   return async (
//     state: AdventureGameplayLogicState | DungeonGameplayLogicState,
//     context: IActivityContext<IAdventureGameplayFeed | IDungeonGameplayFeed>
//   ) => {

//     const actor = state.actorsService
//       .getActor<Actor & Partial<AbilityPerformer> & Partial<InventoryBearer>>(context.getControlledActorId());
//     if (!actor.isInGroup(context.authority.groupId)) {
//       throw new Error();
//     }

//     if (effect.isAbility && !actor?.isAbleToUseAbility(effect as IAbility)) {
//       throw new Error();
//     }

//     if (effect.isItem && !actor?.isAbleToUseItem(effect as IItem)) {
//       throw new Error() 
//     }

//     if (effect.isAbility) {
//       effect.calculateAbilityParameters()
//     }
    
//     state.interactionService.resolveInteraction(CAST_EFFECT_INTERACTION_IDENTIFIER, effect, actor);

//     return { name: DungeonActivityName.CastEffect }
//   }  
// }