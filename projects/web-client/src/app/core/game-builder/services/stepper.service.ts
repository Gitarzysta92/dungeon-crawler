import { ActivatedRoute } from "@angular/router";
import { RoutingService } from "src/app/aspects/navigation/api";
import { GameSaveProvider } from "../../adventure/misc/game-save-provider";
import { GamePersistenceService } from "../../game-persistence/services/game-persistence.service";
import { IBuilderStepComponent } from "../interfaces/builder-step-component.interface";
import IBuilderStep from "../interfaces/builder-step.interface";
import { GameBuilderState } from "../state/game-builder.state";
import { GameBuilderStateStore } from "../stores/game-builder-state.store";
import { GameBuilderService } from "./game-builder.service";
import { pairwise, map, filter, takeUntil, distinctUntilChanged, Subject } from "rxjs";
import { Injectable } from "@angular/core";

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