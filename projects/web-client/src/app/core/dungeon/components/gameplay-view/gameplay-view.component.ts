import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { connectable, fromEvent, merge, Observable, ReplaySubject } from 'rxjs';
import { ISceneInitializationData, SceneComponent } from 'src/app/core/gameplay-scene/api';
import { SceneInitializationService } from 'src/app/core/gameplay-scene/services/scene-initialization/scene-initialization.service';
import { sceneSetup } from '../../constants/scene-setup';
import { IGameDataDto } from '../../models/game-data.dto';
import { IGameplayFeed } from '../../models/gameplay-feed';
import { GameplayInitializationService } from '../../services/gameplay-initialization/gameplay-initialization.service';


@Component({
  templateUrl: './gameplay-view.component.html',
  styleUrls: ['./gameplay-view.component.scss'],
})
export class GameplayViewComponent implements OnInit {

  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  public gameFeed$: Observable<IGameplayFeed>;
  public currentPlayer$: any;
  public message$: Observable<any>;
  public isLoading: boolean = true;

  constructor(
    private readonly _route: ActivatedRoute,
    //private readonly _gameplayInitializationService: GameplayInitializationService,
    private readonly _sceneInitializationService: SceneInitializationService
  ) {}

  async ngOnInit(): Promise<void> {
    // const initialData = this._getGameplayInitialData();
    // const gameplayData = await this._gameplayInitializationService.initializeGameplayFeed(initialData).toPromise();



    const setup = {
      canvasRef: this.canvas.canvas.nativeElement,
      height: innerHeight,
      width: innerWidth,
      pixelRatio: innerWidth / innerHeight,
      bgColor: 0xa07966,
      fogColor: 0xea5c3b,
    };



    const sceneInitializationData = {
      sceneData: setup,
      sceneComposerSetup: sceneSetup as any,
      staticAssetsPath: "assets"
    };
    const scene = this._sceneInitializationService.createScene(sceneInitializationData);
    //   this.gameFeed$ = this._gameplayService.loadGameData(gameData);
    //   this.gameFeed$
    //     .pipe(
    //       tap(feed => {
    //         console.log(feed);
    //         this.gameplayDataLoaded = true;
    //         this._sceneService.loadGameObjects(feed.coordsMapping);
    //       }),
    //       switchMap(feed => from(this._gameLoopService.initializeOfflineGameLoop(feed)))
    //     )
    //     .subscribe();
    //  }

    // this.isLoading = false;
  }

  public interact(event: MouseEvent): void {

  }

  // private _getGameplayInitialData(): IGameDataDto {
  //   return this._route.snapshot.data.initialData;
  // }
}


// this._gameplayService
//       .gameplayFeed.gameState$
//       .subscribe(s => {
//         this.currentPlayer = this._gameplayService.gameplayFeed.players.find(p => p.id === s.actualPlayer.data.id);
//         this.avatarUrl = this.currentPlayer.avatarUrl;
//         this.armyBadge = this.currentPlayer.armyBadge;

//         if (s.activityStack[0].name === ActivityName.DeployTile) {
//           this.action = {
//             message: "Accept",
//             callback: () => this._gameplayEventsService.emitTileActionConfirmedEvent()
//           }
//         } else {
//           this.action = {
//             message: "End Turn",
//             callback: () => null
//           }
//         }
//       });





// this._gameplayService
//       .gameplayFeed.gameState$
//       .subscribe(s => {
//         const actualOrder = this._calculatePlayersOrder(s.metadata.playersOrder, s.actualPlayer.data.id);
//         const [currentPlayer, ...nextPlayers] = actualOrder.map(id => this._gameplayService.gameplayFeed.players.find(p => p.id === id));
//         this.currentPlayer = currentPlayer;
//         this.nextPlayers = nextPlayers;
//       });