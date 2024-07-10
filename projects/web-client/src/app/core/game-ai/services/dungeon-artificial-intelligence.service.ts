import { Injectable } from "@angular/core";
import { generateRandomNumberFromZeroTo } from "@utils/randomizer";
import { IProcedureController } from "@game-logic/lib/base/procedure/procedure.interface";
import { IDistinguishableData, IGatheredData, IGatheringContext, IGatheringController } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { ICard } from "@game-logic/lib/modules/cards/entities/card/card.interface";
import { DungeonStateStore } from "../../dungeon/stores/dungeon-state.store";
import { ACTOR_DATA_TYPE, SOURCE_ACTOR_DATA_TYPE } from "@game-logic/lib/modules/actors/actors.constants";
import { IActor } from "@game-logic/lib/modules/actors/entities/actor/actor.interface";
import { FIELD_DATA_TYPE, ROTATION_DATA_TYPE } from "@game-logic/lib/modules/board/board.constants";
import { IBoardObjectRotation } from "@game-logic/lib/modules/board/board.interface";
import { IBoardAssignment } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { IPawn } from "@game-logic/lib/base/pawn/pawn.interface";
import { PathfindingService } from "@game-logic/lib/modules/board/pathfinding/pathfinding.service";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { IPathSegment } from "@game-logic/lib/modules/board/pathfinding/pathfinding.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { DataFeedService } from "../../game-data/services/data-feed.service";


@Injectable()
export class DungeonArtificialIntelligenceService implements IProcedureController, IGatheringController {
  private _pathfindingService: PathfindingService;

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dataFeed: DataFeedService
  ) { 
    this._pathfindingService = new PathfindingService();
  }

  public determineCardsOrder(cards: ICard[]): ICard[] {
    return cards;
  }

  public async listenForEarlyResolve(s: boolean): Promise<boolean> {
    return false;
  }

  public gather(context: IGatheringContext): Promise<IGatheredData<IDistinguishableData>> {
    if (context.allowedData.length <= 0) {
      throw new Error("There is not allowed data to gather")
    }
    if (context.dataType === ACTOR_DATA_TYPE) {
      return this._collectActorTypeData(context as IGatheringContext<IActor>)
    }
    if (context.dataType === ROTATION_DATA_TYPE) {
      return this._collectRotationTypeData(context as IGatheringContext<IBoardObjectRotation>)
    }
    if (context.dataType === FIELD_DATA_TYPE) {
      return this._collectFieldTypeData(context as IGatheringContext<IBoardField>)
    }
    if (context.dataType === SOURCE_ACTOR_DATA_TYPE) {
      return this._collectSourceActorTypeData(context as IGatheringContext<IActor>)
    }
  }  

  private async _collectActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>> {
    const index = generateRandomNumberFromZeroTo(context.allowedData.length)
    return {
      value: context.allowedData[index],
      isDataGathered: true
    }
  }
  

  private async _collectRotationTypeData(context: IGatheringContext<IBoardObjectRotation>): Promise<IGatheredData<any>> {
    const currentPlayer = this._dungeonStateStore.currentState.currentPlayer;
    const opponents = this._dungeonStateStore.currentState.getOpponents(currentPlayer);
    const defeatableOpponentPawns = opponents
      .flatMap(o => this._dungeonStateStore.currentState.getPawns<IBoardAssignment & IPawn>(o))
      .filter(p => !!p.position);
    const index = generateRandomNumberFromZeroTo(defeatableOpponentPawns.length);
    const targetPawn = defeatableOpponentPawns[index];

    let rotation: IBoardObjectRotation;
    if (targetPawn) {
      const fromPosition = (Object.values(context.prev) as IGatheredData<IDistinguishableData & IBoardAssignment>[]).find(p => p.value.position).value.position;
      const coordinates = this._dungeonStateStore.currentState.board.coordinates
      rotation = this._pathfindingService.findShortestPathBetweenCoordinatesV2(fromPosition, targetPawn.position, coordinates, [])[0]?.vector;
    } else {
      rotation = generateRandomNumberFromZeroTo(5) as IBoardObjectRotation;
    }

    return {
      value: rotation,
      isDataGathered: true
    }
  }
2

  private async _collectFieldTypeData(context: IGatheringContext<IBoardField>): Promise<IGatheredData<IBoardField>> {
    const currentPlayer = this._dungeonStateStore.currentState.currentPlayer;
    const opponents = this._dungeonStateStore.currentState.getOpponents(currentPlayer);
    const defeatableOpponentPawns = opponents
      .flatMap(o => this._dungeonStateStore.currentState.getPawns<IBoardAssignment & IPawn>(o))
      .filter(p => !!p.position);
    const index = generateRandomNumberFromZeroTo(defeatableOpponentPawns.length);
    const targetPawn = defeatableOpponentPawns[index];

    const coordinates = this._dungeonStateStore.currentState.board.coordinates
    const map = this._pathfindingService.createVectorDistanceMap(targetPawn.position, coordinates, [])

    const possibleFields = context.allowedData as IBoardField[];
    let choosenSegment: IPathSegment;
    for (let field of possibleFields) {
      const segment = map.get(field.id);
      if (!segment) {
        continue;
      }
      if (!choosenSegment) {
        choosenSegment = segment
      } else {
        choosenSegment = segment.distanceToOrigin < choosenSegment.distanceToOrigin ? segment : choosenSegment;
      } 
    }

    const choosenField = choosenSegment ? possibleFields.find(f => CubeCoordsHelper.isCoordsEqual(f.position, choosenSegment.position)) : possibleFields[0]
    return {
      value: choosenField,
      isDataGathered: true
    }
  }

  private async _collectSourceActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>> {
    let actor: IActor;
    if (context.allowedData.length >= 1) {
      actor = await this._dataFeed.getActor(context.allowedData[0] as unknown as string);
    }

    if (!actor) {
      throw new Error("Cannot find source actor");
    }

    return {
      value: actor,
      isDataGathered: true
    }
  }
}





// public async collectOriginTypeData(
//   dataType: IOriginCollectableDataDefinition,
//   effectDefinition: IEffectDefinition
// ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>> {
//   let data: IBoardSelectorOrigin | undefined;
//   if (effectDefinition.effectName === EffectName.ModifyPosition) {
//     const actors = dataType.possibleOrigins
//       .map(o => this._dungeonStateStore.currentState.board.getObjectByPosition(o.position))
//       .filter(a => effectDefinition.effect.effectTargetingSelector.targetingActors.includes(a?.actorType))
//       .filter(a => {
//         const selectorOrigin = { ...a } as unknown as IBoardSelector;
//         selectorOrigin.selectorOrigin = a;
//         const isNotInAttackRange = this._dungeonStateStore.currentState.board
//           .getObjectsBySelector(selectorOrigin)
//           .every(o => o !== this._dungeonStateStore.currentState.hero);
//         return isNotInAttackRange;
//       })    
//     data = actors[0];
//   } else {
//     data = effectDefinition.caster as unknown as IBoardSelectorOrigin;
//   }

//   return {
//     data: data,
//     dataType: dataType,
//     revertCallback: () => null,
//     isDataGathered: !!data
//   }
// }