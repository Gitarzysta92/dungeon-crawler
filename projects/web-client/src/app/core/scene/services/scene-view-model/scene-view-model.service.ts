import { Injectable } from "@angular/core";
import { IBoardSelector } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { IBoardCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { CoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { IDungeonInteractionState } from "src/app/core/dungeon/interfaces/interaction-state.interface";
import { IDungeonSceneState, ISceneToken } from "../../interfaces/dungeon-scene-state";
import { IDungeonGameplayStateDto } from "@game-logic/gameplay/state/dungeon/dungeon-gameplay.interface";



@Injectable()
export class SceneViewModelService {

  constructor() { }

  public updateSceneState(
    s: IDungeonSceneState,
    d: IDungeonGameplayStateDto,
    i: IDungeonInteractionState
  ): IDungeonSceneState {

    // for (let cd of i.collectedData) {
    //   for (let step of cd.steps) {
    //     if (step.dataName === GatheringStepDataName.Field) {
    //       this._displaySuggestionsForFieldGathering(step, s);
    //     }
    //     if (step.dataName === GatheringStepDataName.Actor) {
    //       this._displaySuggestionsForActorGathering(step, s);
    //     }
    //   }
    //   this._updateBoardObjectPosition(cd, s);
    //   this._displayInformationAboutSelectorRange(cd, s, d);
    // }

    // this._displaySuggestionsForActorInteractions(s, d);
    // this._displayInformationForInteractingActor(i, s);

    return s;
  }


  // private _validatePossibilityToInteractActor(
  //   d: DungeonState,
  //   o: ISceneToken,
  //   coords: IBoardCoordinates
  // ): boolean {
  //   return validatePossibilityToInteractActor(d, { actorId: o.id }, coords);
  // }


  // private _displaySuggestionsForFieldGathering(
  //   step: IFieldCollectableDataStep,
  //   state: IDungeonSceneState
  // ): void {
  //   const stateField = state.board.fields[step.payload?.id]
  //   if (stateField) {
  //     stateField.isSelected = true;
  //     return;
  //   } 
  //   for (let field of step?.possibleFields) {
  //     state.board.fields[field.id].isHighlighted = true;
  //   }
  // }


  // private _displaySuggestionsForActorGathering(
  //   step: IActorCollectableDataStep,
  //   state: IDungeonSceneState
  // ): void {
  //   const choosenActor = state.board.objects[validateBoardObject(step.payload)?.id];
  //   if (choosenActor) {
  //     choosenActor.isSelected = true;
  //     return;
  //   }
  //   for (let actor of step.possibleActors) {
  //     if (!state.board.objects[actor.id]) {
  //       continue;
  //     }
  //     state.board.objects[actor.id].isHighlighted = true;
  //   }
  // }


  // private _displayInformationAboutSelectorRange(
  //   collectableData: ICollectableData,
  //   sceneState: IDungeonSceneState,
  //   dungeonState: DungeonState
  // ) {
  //   const choosenOrigin = (collectableData.steps
  //     .find(s => s.dataName === GatheringStepDataName.Origin) as IOriginCollectableDataStep)?.payload;
  //   if (!choosenOrigin) {
  //     return;
  //   }
  //   const rangeFields = dungeonState.board
  //     //TODO : get rid of cloning effect
  //     .getFieldsBySelector(Object.assign({ ...collectableData.effect }, { selectorOrigin: choosenOrigin }) as IBoardSelector);
  //   for (let field of rangeFields) {
  //     sceneState.board.fields[field.id].isHighlighted = true;
  //   }
  // }


  // private _displaySuggestionsForActorInteractions(
  //   sceneState: IDungeonSceneState,
  //   dungeonState: DungeonState
  // ): void {
  //   Object.values(sceneState.board.objects)
  //     .filter(o => this._validatePossibilityToInteractActor(dungeonState, o, dungeonState.hero.position))
  //     .forEach(o => o.isHighlighted = true);
  // }

  // private _displayInformationForInteractingActor(
  //   interactionState: IDungeonInteractionState,
  //   sceneState: IDungeonSceneState,
  // ): void {
  //   if (sceneState.board.objects[interactionState.selectedActivityId]) {
  //     if (sceneState.board.objects[interactionState.selectedActivityId]) {
  //       sceneState.board.objects[interactionState.selectedActivityId].isSelected = true;
  //     }
  //   }
  // }

  // private _updateBoardObjectPosition(
  //   collectableData: ICollectableData,
  //   sceneState: IDungeonSceneState,
  // ): void {
  //   const choosenField = (collectableData.steps
  //     .find(s => s.dataName === GatheringStepDataName.Field) as IFieldCollectableDataStep)?.payload;
  //   const choosenActor = (collectableData.steps
  //     .find(s => s.dataName === GatheringStepDataName.Actor) as IActorCollectableDataStep)?.payload;

  //   if (choosenField && choosenActor && !CoordsHelper.isCoordsEqual(validateBoardObject(choosenActor)?.position, choosenField.position)) {
  //     if (sceneState.board.objects[choosenActor.id]) {
  //       sceneState.board.objects[choosenActor.id].position = choosenField.position;
  //     }
  //   }
  // }
}


// mark objects that are not selectable
// const def = i.payloadDefinitions.find(pd => pd.effect.id === cd.effect.id);
// const objects = d.board
//   .getObjectsBySelector(Object.assign({ ...def.effect }, { selectorOrigin: def.caster }) as IBoardSelector);
// for (let object of objects) {
//   if (s.board.objects[object.id]) {
//     s.board.objects[object.id].isSelected = true;
//   }
// }