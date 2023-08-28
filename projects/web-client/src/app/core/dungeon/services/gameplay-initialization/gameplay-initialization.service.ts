import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { MyProfileStore } from "src/app/core/my-profile/api";
import { IProfileDto, ProfilesService } from "src/app/core/profiles/api";
import { IGameDataDto } from "../../models/game-data.dto";
import { IGameplayFeed } from "../../models/gameplay-feed";
import { IPlayer } from "../../models/player";

@Injectable()
export class GameplayInitializationService {
  gameplayFeed$: Observable<IGameplayFeed>; 

  constructor(
    // private readonly _myProfileStore: MyProfileStore,
    // private readonly _armiesService: ArmiesService,
    // private readonly _profilesService: ProfilesService
  ) { }

  // public initializeGameplayFeed(gameData: IGameDataDto): Observable<IGameplayFeed> {
  //   const myProfile = this._myProfileStore.currentState;

  //   return this.gameplayFeed$ = forkJoin({
  //     armies: this._armiesService.getArmies(gameData.matchmaking.armyAssignment.map(a => a.armyId)),
  //     profiles: this._profilesService.getProfiles(gameData.matchmaking.armyAssignment.map(a => a.profileId).filter(id => id !== myProfile.id)),
  //   })
  //     .pipe(
  //       map(feed => {
  //         const tiles = feed.armies.reduce((ts, a) => ts.concat([...a.tiles, a.headquarter]), []) as ITile[];
  //         return {
  //           armies: feed.armies,
  //           players: this._mapProfilesToPlayers(feed.profiles, gameData.matchmaking.armyAssignment, feed.armies),
  //           gameData: gameData,
  //           tiles: tiles,
  //           tileImages: tiles.map(t => ({ tileId: t.id, imageUrl: t.imageUrl })),
  //         }
  //       }),
  //       shareReplay(1)
  //   )
  // }

  public requestForGameDetails(gameplayId: string): any {

  } 

  // private _mapProfilesToPlayers(profiles: IProfileDto[], armyAssignments: any, armies: IArmy[]): IPlayer[] {
  //   return armyAssignments.map(a => {
  //     const player = Object.assign({}, profiles.find(p => p.id === a.profileId)) as unknown as IPlayer;
  //     player.armyId = a.armyId;
  //     player.avatarUrl = player.avatarUrl;
  //     const army = armies.find(b => b.id === a.armyId);
  //     player.armyBadge = mapArmyToArmyBadge(army);
  //     return player;
  //   });
  // }

}