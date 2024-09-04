import { Injectable } from "@angular/core";
import { generateRandomNumberFromZeroTo } from "@utils/randomizer";
import { IDistinguishableData, IGatheredData, IGatheringContext } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { DungeonStateStore } from "../../dungeon/stores/dungeon-state.store";
import { IActor } from "@game-logic/lib/modules/actors/entities/actor/actor.interface";
import { IBoardObjectRotation } from "@game-logic/lib/modules/board/board.interface";
import { IBoardAssignment } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { IPawn } from "@game-logic/lib/base/pawn/pawn.interface";
import { PathfindingService } from "@game-logic/lib/modules/board/pathfinding/pathfinding.service";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { IPath, IPathSegment } from "@game-logic/lib/modules/board/pathfinding/pathfinding.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { ICardOnPile } from "@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface";
import { moveCreatureCard } from "../../game-data/constants/data-feed-cards";
import { RotationHelper } from "@game-logic/lib/modules/board/helpers/rotation.helper";



@Injectable()
export class DungeonArtificialIntelligenceService  {
  private _pathfindingService: PathfindingService;

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dataFeed: DataFeedService
  ) { 
    this._pathfindingService = new PathfindingService();
  }

  public determineCardsOrder(cards: ICardOnPile[]): ICardOnPile[] {
    return cards.sort((a, b) => a.id === moveCreatureCard.id ? 1 : 0);
  }

  public async collectActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>> {
    const index = generateRandomNumberFromZeroTo(context.allowedData.length - 1)
    return {
      value: context.allowedData[index],
      isDataGathered: true
    }
  }
  

  public async collectRotationTypeData(context: IGatheringContext<IBoardObjectRotation>): Promise<IGatheredData<any>> {
    const currentPlayer = this._dungeonStateStore.currentState.currentPlayer;
    const opponents = this._dungeonStateStore.currentState.getOpponents(currentPlayer);
    const defeatableOpponentPawns = opponents
      .flatMap(o => this._dungeonStateStore.currentState.getPawns<IBoardAssignment & IPawn>(o))
      .filter(p => !!p.position);
    const index = generateRandomNumberFromZeroTo(defeatableOpponentPawns.length - 1);
    const targetPawn = defeatableOpponentPawns[index];

    let rotation: IBoardObjectRotation;
    if (targetPawn) {
      const fromPosition = (Object.values(context.steps) as IGatheredData<IDistinguishableData & IBoardAssignment>[]).find(p => p.value.position).value.position;
      const coordinates = this._dungeonStateStore.currentState.board.coordinates
      rotation = RotationHelper.reverse(this._pathfindingService.findShortestPathBetweenCoordinatesV2(fromPosition, targetPawn.position, coordinates, []).destination.rotation)
    } else {
      rotation = generateRandomNumberFromZeroTo(5) as IBoardObjectRotation;
    }

    return {
      value: rotation,
      isDataGathered: true
    }
  }


  public async collectFieldTypeData(context: IGatheringContext<IBoardField>): Promise<IGatheredData<IBoardField>> {
    const currentPlayer = this._dungeonStateStore.currentState.currentPlayer;
    const opponents = this._dungeonStateStore.currentState.getOpponents(currentPlayer);
    const opponentPawns = opponents
      .flatMap(o => this._dungeonStateStore.currentState.getPawns<IBoardAssignment & IPawn>(o))
      .filter(p => !!p.position);
    const index = generateRandomNumberFromZeroTo(opponentPawns.length - 1);
    const targetPawn = opponentPawns[index];

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

  public async collectSourceActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>> {
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

  public async collectPathTypeData(context: IGatheringContext<IPathSegment>): Promise<IGatheredData<IPath>> {
    const currentPlayer = this._dungeonStateStore.currentState.currentPlayer;
    const opponents = this._dungeonStateStore.currentState.getOpponents(currentPlayer);
    const opponentPawns = opponents
      .flatMap(o => this._dungeonStateStore.currentState.getPawns<IBoardAssignment & IPawn>(o))
      .filter(p => !!p.position);
    const index = generateRandomNumberFromZeroTo(opponentPawns.length - 1);
    const targetPawn = opponentPawns[index];

    const coordinates = this._dungeonStateStore.currentState.board.coordinates;
    const occupiedCoordinates = this._dungeonStateStore.currentState.board.getOccupiedFields().map(f => f.position);
    const map = this._pathfindingService.createVectorDistanceMap(targetPawn.position, occupiedCoordinates, coordinates);
    
    let selectedSegment: IPathSegment;
    for (let segment of context.allowedData) {
      const ts = map.get(CubeCoordsHelper.createKeyFromCoordinates(segment.position));
      if (!selectedSegment) {
        selectedSegment = ts
      } else if (selectedSegment.distanceToOrigin > ts.distanceToOrigin) {
        selectedSegment = ts;
      }
    }

    if (!selectedSegment) {
      selectedSegment = context.allowedData[0]
    }
    const path = this._pathfindingService
      .establishMovementPath(selectedSegment.position, context.allowedData);
    return {
      value: path,
      isDataGathered: !!path,
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