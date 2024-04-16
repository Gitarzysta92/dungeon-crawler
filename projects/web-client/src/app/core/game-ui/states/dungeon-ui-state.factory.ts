import { Constructor } from "@game-logic/lib/extensions/types";
import { IDungeonUiActivity, IDungeonUiState } from "./dungeon-ui-state.interface";
import { IInteractable } from "../entities/interactable/interactable.interface";
import { EntityService } from "@game-logic/lib/base/entity/entity.service";
import { ActivitiesService } from "../../../../../../game-logic/src/lib/base/activity/activity.service";



export class DungeonIUStateFactory {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _activitiesService: ActivitiesService
    // private readonly _actionService: ActionService,
    // private readonly _eventService: EventService
  ) { }

  public create(e: Constructor<any>): Constructor<IDungeonUiState> {
    const entityService = this._entityService;
    const activitiesService = this._activitiesService;
    class DungeonIUState extends e implements IDungeonUiState {

      activityConfirmationRequired: boolean = false;
      activityIdToConfirmation: string | undefined;
      activityIdToEarlyConfirm: string | undefined;
      activityConfirmed: boolean = false;
      activitySelectionRequired: boolean = false;
      confirmationPossible: boolean = false;
      activityEarlyConfirmationPossible: boolean = false;
      activityEarlyConfirmed: boolean = false;

      selectedActivityId: string | undefined;
      
      private readonly entityService: EntityService = entityService;
      private readonly activitiesService: ActivitiesService = activitiesService;

      constructor(d: unknown) {
        super(d);
      }

      public async updateActivities(): Promise<void> {
        this.entityService.traverseEntities<IInteractable>(e => {
          const as = this.activitiesService.getAvailableActivityFor(e);
          for (let a of as) {
            const ca = this.activities.get(e.id + as.name);
            if (ca) {
              ca.reset();
              ca.isSelected = ca.id + as.name === this.selectedActivityId;
              ca.isDisabled = !a.canInteract();

            } else {
              const activity = new DungeonUiActivity();
              this.activities.set(e.id + as.name, activity);
            }
          }
        })
      }

      public async updateInteractables(): Promise<void> {
        this.entityService.traverseEntities<IInteractable>(e => {
          const as = this.activitiesService.getAvailableActivityFor(e);
          for (let a of as) {
            const ca = this.activities.get(e.id + as.name);
            if (ca) {
              ca.reset();
              ca.isSelected = ca.id + as.name === this.selectedActivityId;
              ca.isDisabled = !a.canInteract();

            } else {
              const activity = new DungeonUiActivity();
              this.activities.set(e.id + as.name, activity);
            }
          }
        })
      }

    }
    return DungeonIUState;
  };
}


export class DungeonUiActivity implements IDungeonUiActivity {
  id: string;
  name: string;
  iconUrl: string;
  isHighlighted: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isContextual: boolean;

  constructor(
  ) {
    this.id = data.id;
    this.data = data;
    this.name = data.informative.name;
    this.iconUrl = data.informative.iconUrl;
    this.isHighlighted = false;
    this.isDisabled = false;
    this.isSelected = false;
    this.isContextual = isContextual
    this.isStatic = isStatic;
  }
}





// export class UiViewModelService {

//   constructor() { }

//   public updateUiState(
//     ui: IDungeonUiState,
//     d: DungeonState,
//     i: IDungeonInteractionState,
//   ): IDungeonUiState {

//     const selectedActivity = ui.activities.find(a => a.id === i.selectedActivityId);
//     ui.activities.forEach(a => {
//       Object.assign(a, {
//         isDisabled:
//           d.isDungeonTurn ||
//           (a instanceof ActorInteractionUiActivity && !this._validatePossibilityToInteractActor(d, a)) ||
//           (a instanceof CastEffectUiActivity && !this._validatePossibilityToUseEffect(d, a)) ||
//           (!!selectedActivity && !this._validateActivityIsSelected(a, selectedActivity)),
//         isSelected: this._validateActivityIsSelected(a, selectedActivity),
//         isHighlighted: a.isContextual &&
//           a instanceof ActorInteractionUiActivity &&
//           this._validatePossibilityToInteractActor(d, a)
//       })
//     });
  
//     return ui;
//   }

//   private _validatePossibilityToInteractActor(d: DungeonState, activity: Pick<ActorInteractionUiActivity, 'id' | 'data'>): boolean {
//     return validatePossibilityToInteractActor(d, { actorId: activity.id })
//   }

//   private _validatePossibilityToUseEffect(d: DungeonState, activity: CastEffectUiActivity): boolean {
//     // TODO - remove any type assertion
//     return validatePossibilityToUseEffect(d, {
//       effect: activity.data as any,
//       caster: d.hero,
//       effectName: activity.data.effectName as any
//     })
//   }

//   private _validateActivityIsSelected(
//     targetActivity: IDungeonUiActivity,
//     selectedActivity: IDungeonUiActivity
//   ): boolean {
//     return (!!selectedActivity && targetActivity.id === selectedActivity?.id)
//   }

// }
