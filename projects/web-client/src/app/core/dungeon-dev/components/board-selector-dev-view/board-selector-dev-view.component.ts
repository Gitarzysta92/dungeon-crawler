import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, filter, takeUntil,  map, combineLatest, startWith } from 'rxjs';
import { imagesPath } from 'src/app/core/data/constants/data-feed-commons';
import { SceneComponent } from 'src/app/core/scene/api';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { DevBoardStore } from '../../stores/dev-board.store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { boardSelectorFormDefaultValues, selectorOriginFormDefaultValues } from '../../constants/dev-board-state';
import { v4 } from "uuid";
import { BoardObjectModalService } from 'src/app/core/game-ui/services/board-object-modal.service';
import { BoardObjectModalEditorComponent } from '../board-object-modal-editor/board-object-modal-editor.component';
import { IBoardSelector } from '@game-logic/lib/modules/board/aspects/selectors/board.selector';
import { IBoardCoordinates, IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { Side, Size } from '@game-logic/lib/modules/board/entities/board-object/board-object.constants';
import { dungeonTemplate } from 'src/app/core/data/constants/data-feed-dungeons';
import { IDevFieldState, IDevTileState } from '../../interfaces/dev-board-state-interface';



@Component({
  selector: 'board-selector-dev-view',
  templateUrl: './board-selector-dev-view.component.html',
  styleUrls: ['./board-selector-dev-view.component.scss'],
  providers: [
    DevBoardStore,
  ]
})
export class BoardSelectorDevViewComponent implements OnInit {

  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  public performingRotationProcess: boolean = false;

  public boardSelectorForm: FormGroup<{
    selectorType: FormControl<IBoardSelector['selectorType']>,
    selectorRange: FormControl<number>,
    traversableSize: FormControl<number>
  }>;

  public selectorOriginForm: FormGroup<{
    outlets: FormControl<Side[]>;
    position: FormControl<IBoardCoordinates>;
    rotation: FormControl<IBoardObjectRotation>;
  }>;

  private originId: string = "DF750CDB-22BF-4948-BCF9-7FCB1108D1E7";
  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _devBoardStoreService: DevBoardStore<IDevFieldState, IDevTileState>,
    private readonly _formBuilder: FormBuilder,
    private readonly _modalService: BoardObjectModalService
  ) { }

  ngOnInit(): void {
    // this._initializeScene(dungeonTemplate);
    // this._initializeForms();
    
    // this._sceneService.inputs$
    //   .pipe(
    //     filter(e => e.type === 'click'),
    //     map(e => this._sceneService.components.boardComponent.getTargetedToken(e.x, e.y) ??
    //       this._sceneService.components.boardComponent.getTargetedField(e.x, e.y)),
    //     takeUntil(this._onDestroy))
    //   .subscribe(x => {
    //     if (!x) {
    //       this._devBoardStoreService.resetSelection()
    //       return;
    //     }
    //     if (x instanceof FieldObject) {
    //       const selectedObject = Object.values(this._devBoardStoreService.currentState.objects).find(o => o.isSelected);
    //       if (selectedObject && selectedObject.id === this.originId ) {
    //         const field = this._devBoardStoreService.currentState.fields[x.auxId];
    //         this.selectorOriginForm.controls.position.patchValue(field.position);
    //       } else if (selectedObject) {
    //         this._devBoardStoreService.updateObjectPosition(selectedObject.id, x.auxCoords);
    //       } else {
    //         this._devBoardStoreService.addObject(
    //           this._createTileData({
    //             id: v4(),
    //             imagePath: `${imagesPath}/obstacle.png`,
    //             position: x.auxCoords,
    //             rotation: 0,
    //             outlets: [],
    //             sourceActorId: .id
    //           })
    //         );
    //       }
    //     } else if (x instanceof TileObject) {
    //       this._devBoardStoreService.selectObject(x.auxId);
    //     }
    //   });

    // this.selectorOriginForm.valueChanges.pipe(startWith(this.selectorOriginForm.value))
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(so => {
    //     this._devBoardStoreService.addObject(
    //       this._createTileData({
    //         id: this.originId,
    //         imagePath: `${imagesPath}/hero.png`,
    //         position: so.position,
    //         rotation: so.rotation,
    //         outlets: so.outlets.map(o => parseInt(o as any)),
    //         sourceActorId:  heroFirstDataFeedEntity.id
    //       })
    //     );
    //   })
    
    // combineLatest([
    //   this._devBoardStoreService.state$,
    //   this.boardSelectorForm.valueChanges.pipe(startWith(this.boardSelectorForm.value)),
    // ])
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(([ss, bs]) => {
    //     this._sceneService.processSceneUpdate({ board: ss });
    //     this.selectorOriginForm.value.outlets = this.selectorOriginForm.value.outlets.map(o => parseInt(o as any))
    //     this._displayOutletTrace(bs as IBoardSelector, this.selectorOriginForm.value);

    //     const selectedObject = Object.values(ss.objects).find(o => o.isSelected);
    //     const tile = this._sceneService.boardComponent.getTile(selectedObject?.id);
    //     if (!tile) {
    //       return;
    //     }
    //     const coords = this._sceneService.scene.projectCoordsOnViewport(tile);
    //     this._modalService.open(BoardObjectModalEditorComponent, coords.x, coords.y, selectedObject);
    //   });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }


  // private _initializeForms(): void {
  //   this.boardSelectorForm = this._formBuilder.group({
  //     selectorType: [boardSelectorFormDefaultValues.selectorType, [Validators.required]],
  //     selectorRange: [boardSelectorFormDefaultValues.selectorRange, [Validators.required]],
  //     traversableSize: [boardSelectorFormDefaultValues.traversableSize, [Validators.required]]
  //   });

  //   this.selectorOriginForm = this._formBuilder.group({
  //     outlets: [selectorOriginFormDefaultValues.outlets, [Validators.required]],
  //     position: [selectorOriginFormDefaultValues.position, [Validators.required]],
  //     rotation: [selectorOriginFormDefaultValues.rotation, [Validators.required]],
  //   })
  // }


  // private _initializeScene(
  //   dungeonDataFeedEntity: 
  // ): void {
  //   const fields = dungeonDataFeedEntity.boardConfiguration.coords.map(c => this._createFieldData(c));
  //   this._sceneService.createSceneApp(
  //     this.canvas.canvas.nativeElement,
  //     this.canvas.listenForMouseEvents(),
  //     dungeonDataFeedEntity.visualScene,
  //     fields
  //   );
  //   this._devBoardStoreService.initializeStore(fields);
  // }


  // private _displayOutletTrace(s: IBoardSelector, o: IBoardSelectorOrigin): void {
  //   if (s.selectorRange == null || s.traversableSize == null) {
  //     return;
  //   }
  //   const board = new Board(this._devBoardStoreService.currentState);
    
  //   Object.assign(s, { selectorOrigin: o })
  //   const fields = board.getFieldsBySelector(s);
  //   for (let field of fields) {
  //     this._sceneService.boardComponent.getField(field.id).highlight();
  //   }
  // }


  // private _createTileData(
  //   data: {
  //     id: string;
  //     sourceActorId: string;
  //     imagePath: string;
  //     position: IBoardCoordinates;
  //     rotation: IBoardObjectRotation;
  //     outlets: Outlet[]
  //   }
  // ): IDevTile {
  //   return {
  //     id: data.id,
  //     type: 'tile-on-field',
  //     position: data.position,
  //     rotation: data.rotation,
  //     outlets: data.outlets,
  //     size: Size.Medium,
  //     informative: { name: data.imagePath, description: data.imagePath },
  //     visualScene: {
  //       auxId: "",
  //       mapTexture: { url: data.imagePath },
  //       color: 0x0002,
  //     },
  //     visualUi: {
  //       avatar: { url: data.imagePath },
  //       color: 0x0002
  //     },
  //     isHighlighted: false,
  //     isHovered: false,
  //     isSelected: false,
  //     isPreview: false,
  //     sourceActorId: data.sourceActorId
  //   }
  // }

  // private _createFieldData(
  //   position: IBoardCoordinates,
  // ): IDevField {
  //   return {
  //     id: CoordsHelper.createKeyFromCoordinates(position),
  //     actorType: ActorType.Field,
  //     position: position,
  //     entityType: DataFeedEntityType.DungeonField,
  //     informative: { },
  //     auxCoords: position,
  //     auxId: CoordsHelper.createKeyFromCoordinates(position),
  //     coords: {
  //       x: position.q + (position.r) / 2,
  //       y: 0,
  //       z: position.r
  //     },
  //     disabled: false,
  //     highlighted: {
  //       color: 0
  //     },
  //     lastingEffects: [],
  //     sourceActorId: "",
  //     isHighlighted: false,
  //     isHighlightedRange: false,
  //     isHovered: false,
  //     isSelected: false
  //   };
  // }

}
