import { ActivatedRoute } from "@angular/router";
import { RoutingService } from "src/app/aspects/navigation/api";
import { GameSaveProvider } from "../../adventure/misc/game-save-provider";
import { GamePersistenceService } from "../../game-persistence/services/game-persistence.service";
import { IBuilderStepComponent } from "../interfaces/builder-step-component.interface";
import IBuilderStep from "../interfaces/builder-step.interface";
import { FormStep, GameBuilderState, PickerStep } from "../state/game-builder.state";
import { GameBuilderStateStore } from "../stores/game-builder-state.store";
import { GameBuilderService } from "./game-builder.service";
import { pairwise, map, filter, takeUntil, distinctUntilChanged, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { BoardAreasModule } from "@game-logic/gameplay/modules/board-areas/board-areas.module";
import { RACE_STEP_NAME, CLASS_STEP_NAME, ORIGIN_STEP_NAME } from "@game-logic/gameplay/modules/heroes/heroes.constants";
import { HeroModule } from "@game-logic/gameplay/modules/heroes/heroes.module";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { AreasModule } from "@game-logic/lib/modules/areas/areas.module";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { CardsModule } from "@game-logic/lib/modules/cards/cards.module";
import { CombatModule } from "@game-logic/lib/modules/combat/combat.module";
import { ContinuousGameplayModule } from "@game-logic/lib/modules/continuous-gameplay/continuous-gameplay.module";
import { ItemsModule } from "@game-logic/lib/modules/items/items.module";
import { PerksModule } from "@game-logic/lib/modules/perks/perks.module";
import { ProgressionModule } from "@game-logic/lib/modules/progression/progression.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";
import { StatisticModule } from "@game-logic/lib/modules/statistics/statistics.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { AdventureModule } from "../../adventure/adventure.module";
import { DungeonModule } from "../../dungeon/dungeon.module";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { UiModule } from "../../game-ui/media.module";
import { SceneModule } from "../../scene/scene.module";
import { IDENTITY_STEP_NAME } from "../constants/game-builder.constants";
import { IBuilderInitialData } from "../interfaces/state-initial-data.interface";

@Injectable()
export class StepperService {
  private _destroyed: Subject<void> = new Subject();
  public process: GameBuilderState;
  public currentStepComponent: IBuilderStepComponent;
  constructor(
    private readonly _routingService: RoutingService,
    private readonly _gameBuilderStateStore: GameBuilderStateStore,
    private readonly _gameBuilderService: GameBuilderService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _gamePersistanceService: GamePersistenceService
  ) { }

  ngOnInit(): void {
    //TO DO; Refactor state to be driven by url
    this._routingService.onNavigationStart$.
      pipe(
        pairwise(),
        map(([p, c]) => ({
          p: this.process.steps.find(s => (p.event.url.split('/').reverse()[0]).includes(s.stepName)),
          c: this.process.steps.find(s => (c.event.url.split('/').reverse()[0]).includes(s.stepName))
        })),
        filter(({ p, c }) => !!p && !!c),
        takeUntil(this._destroyed)
      )
      .subscribe(({ p, c }) => {
        p.isSelected = false;
        c.isSelected = true;
      })

    this._gameBuilderStateStore.state$
      .pipe(
        distinctUntilChanged((p, c) => p.currentStepId !== c.currentStepId),
        takeUntil(this._destroyed)
      )
      .subscribe(s => {
        this._routingService.navWithExtras(
          [s.currentStep.stepName],
          this._activatedRoute,
          { queryParams: { stepId: s.currentStepId } }
        );
        this.process = s;
      })
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  returnToMenu() {
    this._routingService.navigateToMainMenu();
  }

  navigateToStep(step: IBuilderStep) {
    if (this.process.nextStep === step && !this.process.currentStep.isFulfilled) {
      throw new Error("Cannot move to next step, when current is not fulfilled");
    } 
    this._gameBuilderStateStore.selectStep(step);
  }

  async navigateToNextStep(): Promise<void> {
    // if (this.process.isFinished) {
    //   const game = await this._gameBuilderService.createGame(this.process);
    //   await this._gamePersistanceService.createGameSave(new GameSaveProvider(game), [game], null, true);
    //   this._routingService.navigateToGame()
    // } else {
    //   this.currentStepComponent.resolve();
    //   if (this.process.nextStep) {
    //     this._gameBuilderStateStore.selectStep(this.process.nextStep);
    //   }
    // }
  }

  isPreviousStepNotFulfilled(step?: IBuilderStep): boolean {
    const index = this.process.steps.indexOf(step) - 1
    if (index < 0) {
      return false;
    }
    return !this.process.steps[this.process.steps.indexOf(step) - 1]?.isFulfilled
  }

  onActivate(c: IBuilderStepComponent): void {
    this.currentStepComponent = c;
  }
}




@Injectable()
export class GameBuilderStateService {

  constructor( ) { }

  public async initializeState(
    initialData: IBuilderInitialData,
    dataFeed: DataFeedService,
  ) {
    const lib = GameLogicLibraryFactory.create();

    new UiModule(lib.entityService).initialize();
    new SceneModule(lib.entityService, {} as any).initialize()

    const continousGameplay = new ContinuousGameplayModule().initialize()
    const turnBasedGameplay = new TurnBasedGameplayModule(lib.entityService, lib.eventService, lib.actionService, lib.mixinFactory, lib.activityService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService, lib.gatheringService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const areaModule = new AreasModule(lib.entityService, lib.actionService, lib.eventService, lib.activityService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.activityService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const boardAreasModule = new BoardAreasModule(lib.entityService, lib.eventService, lib.activityService, boardModule.pathfindingService, boardModule.boardService).initialize();
    const statisticModule = new StatisticModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService, lib.mixinFactory, lib.conditionsService).initialize();
    const itemsModule = new ItemsModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.activityService, lib.gatheringService).initialize();
    const progressionModule = new ProgressionModule(lib.entityService, lib.actionService, lib.eventService).initialize();
    const perksModule = new PerksModule(lib.entityService, lib.actionService, lib.activityService, lib.conditionsService).initialize();
    const heroModule = new HeroModule(lib.entityService).initialize();
    const deckModule = new CardsModule(dataFeed, lib.entityService, lib.actionService, lib.eventService, lib.activityService, lib.mixinFactory, lib.conditionsService).initialize();
    new CombatModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService, lib.mixinFactory, lib.conditionsService).initialize()
    // const dungeonModule = new DungeonModule(
    //   lib.entityService,
    //   areaModule.areasService,
    //   lib.activityService
    // ).initialize();
    // new AdventureModule(
    //   lib.mixinFactory,
    //   lib.entityService,
    //   actorModule.actorSevice,
    //   questModule.questService,
    //   areaModule.areasService,
    //   tradeModule.tradeService,
    //   dungeonModule.dungeonService
    // ).initialize();
    
    const raceStep = new PickerStep({
      stepId: 0,
      narrative: { name: "game-builder.step-names.race", description: "game-builder.step-description.race" },
      items: initialData.races.map((r, i) => Object.assign(r, { isSelected: false, isDefault: i === 0 })),
      isMixin: true,
      isNarrationMedium: true,
      stepName: RACE_STEP_NAME,
    });
  
    const classStep = new PickerStep({
      stepId: 1,
      narrative: { name: "game-builder.step-names.class", description: "game-builder.step-description.class" },
      items: initialData.classes.map((r, i) => Object.assign(r, { isSelected: false, isDefault: i === 0 })),
      isMixin: true,
      isNarrationMedium: true,
      stepName: CLASS_STEP_NAME,
    })

    const originStep = new PickerStep({
      stepId: 2,
      narrative: { name: "game-builder.step-names.origin", description: "game-builder.step-description.origin" },
      items: initialData.origins.map((r, i) => Object.assign(r, { isSelected: false, isDefault: i === 0 })),
      isMixin: true,
      isNarrationMedium: true,
      stepName: ORIGIN_STEP_NAME,
    })
    
    const identityStep = new FormStep({
      stepId: 3,
      data: {
        name: null,
        avatarUrl: "hero/avatar.png"
      },
      selectionPropertyName: 'name',
      narrative: { name: "game-builder.step-names.identity", description: "game-builder.step-description.identity" },
      isMixin: true,
      isNarrationMedium: true,
      stepName: IDENTITY_STEP_NAME,
    })

    return new GameBuilderState(
      await lib.mixinFactory.create(initialData.hero),
      [raceStep, classStep, originStep, identityStep],
      initialData.adventureMap, lib.entityService)
  }

}















// <div class="container heading-container">
//   <div class="row">
//     <div class="col">
//       <button class="back-btn" (click)="returnToMenu()">{{ 'commons.return-to-menu' | translate }}</button>
//       <h6>{{ 'sentences.prepare-for-adventure' | translate }}</h6>
//     </div>
//   </div>
// </div>

// <div class="container builder-container">
//   <div class="row no-gutters">
//     <div class="col">
//       <div class="step-bar">
//         <div class="step-bar-segment step-bar-closure">
//           <div class="progress-indicator">
//             <div class="progress-indicator-bg"></div>
//           </div>
//         </div>
//         <div class="step-bar-segment" [class.step-bar-closure]="step.isLastStep" *ngFor="let step of process.steps">
//           <div class="progress-indicator">
//             <div *ngIf="step.isFulfilled" [@fadeAnimation] class="progress-indicator-bg"></div>
//           </div>
//           <button
//             (click)="navigateToStep(step)" 
//             [disabled]="isPreviousStepNotFulfilled(step)"
//             [class.isFulfilled]="step.isFulfilled"
//             [class.isSelected]="step.isSelected">
//             <shard></shard>
//             <h3> 
//               <small>{{ 'commons.pick' | translate }}</small><br>
//               {{ step.narrative.name | translate }}
//             </h3>
//             <div>{{ step.selectionName | translate }}</div>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
  
//   <div class="row no-gutters picker-container">
//     <div class="col">
//       <router-outlet (activate)="onActivate($event)"></router-outlet>
//     </div>
//   </div>
//   <button common-cta-button
//     class="cta-btn"
//     [class.last-step]="process.isLastStep"
//     [disabled]="!(currentStepComponent?.canBeResolved$ | async)"
//     (click)="navigateToNextStep()">
//       {{ process.isLastStep ? ('game-builder.create-game' | translate) : 'commons.select' | translate }}
//   </button>

// </div>


// :host {
//   display: block;
//   height: 100vh;
// }

// .back-btn {
//   position: relative;
//   top: 20px;
//   border: none;
//   background: none;
//   color: #979797;
// }

// .heading-container {
//   height: 100px;
//   color: #979797;
//   h6 {
//     font-weight: bold;
//     text-align: center;
//   }
// }

// .builder-container {
//   position: relative;
//   background-color: rgba(16, 16, 16, 0.5);
//   border-radius: 10px;
//   border: 1px solid #473e56;
//   height: calc(100% - 200px)
// }

// .picker-container {
//   position: relative;
//   height: calc(100% - 100px);
//   overflow: hidden;
// }

// .cta-btn {
//   position: relative;
//   top: -50px;
//   width: 300px;
//   margin: 0 auto;
//   font-family: "PT Sans Narrow";
//   font-weight: bold;
//   font-size: 33px;
//   -webkit-filter: none; /* Safari 6.0 - 9.0 */
//   filter: none;
//   transition: transform 0.2s ease-in-out;

//   &::before {
//     position: absolute;
//     top:0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     margin: auto;
//     content: '';
//     width: 80%;
//     height: 30%;
//     opacity: 0;
//     transition: all 0.2s ease-in-out;
//     transform: scale(0.7);
//     box-shadow:
//         0 0 75px 20px #3fc7fc,
//         0 0 200px 20px #2f74ff;
//   }

//   &.last-step {
//     &::before {
//       opacity: 1;
//     }

//     &:hover {
//       &::before {
//         transform: scale(1);
//       }
//     }
//   }

//   // &:not(:disabled):hover {
//   //   transform: scale(1.02);
//   // }
// }


// .step-bar {
//   position: relative;
//   top: -25px;
//   width: 70%;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: row;
//   height: 100px;
//   box-sizing: border-box;
//   padding: 20px 0;
//   font-family: "PT Sans Narrow";
//   font-weight: bold;

//   .step-bar-closure:first-child {
//     border-radius: 10px 0 0 10px;
//     padding-left: 5px;
//     .progress-indicator {
//       border-radius: 10px 0 0 10px;
//       background-color: rgba(47, 116, 255, 1);
//       background-image: none;
//     }
//   }

//   .step-bar-closure:last-child {
//     border-radius: 0 10px 10px 0;
//     padding-right: 5px;
//     .progress-indicator {
//       border-radius: 0 10px 10px 0;
//       background-color: #29242f;
//       background-image: none;
//       .progress-indicator-bg {
//         background-image: linear-gradient(90deg, #2f74ff 0%, #3fc7fc 100%);
//       } 
//     }
//   }

//   .step-bar-segment {
//     position: relative;
//     flex-grow: 2;
//     background-color: #342e3f;
//     padding: 3px 0;
//     height: 9px;

//     &.step-bar-closure {
//       flex-grow: 1;
//     }

//     .progress-indicator {
//       height: 100%;
//       background-color: #29242f;
//       overflow: hidden;
      
//       .progress-indicator-bg {
//         width: 100%;
//         height: 100%;
//         background-image: linear-gradient(90deg, #2f74ff 0%, #3fc7fc 100%);
//       } 
//     }

//     button {
//       position: absolute;
//       top: -8px;
//       left: -50px;
//       width: 100px;
//       border: none;
//       background: none;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       color: #979797;
//       transition: transform 0.2s ease-in-out;

//       &:hover {
//         transform: scale(1.05);
//       }

//       &.isSelected {
//         color: #fff;
//       }

//       &.isFulfilled {

//         shard {
//           box-shadow:
//             0 0 10px 2px #3fc7fc,
//             0 0 30px 2px #2f74ff;
        
//         }
//       }

//       h3 {
//         line-height: 0.8;
//         font-size: 30px;
//         font-weight: bold;
//         small {
//           font-size: 0.5em;
//         }
//       }
      
//       shard {
//         width: 25px;
//         transform: rotate(45deg);
//         box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
//       }
//     }
//   }


// }