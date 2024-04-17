import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DIALOG_DATA } from 'src/app/shared/dialogs/api';
import { IDevBoardState } from '../../interfaces/dev-board-state-interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DevBoardAction, StoreName } from '../../stores/dev-board.store-keys';
import { IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';

@Component({
  selector: 'board-object-modal-editor',
  templateUrl: './board-object-modal-editor.component.html',
  styleUrls: ['./board-object-modal-editor.component.scss'],
})
export class BoardObjectModalEditorComponent implements OnInit, OnDestroy {

  public devTileForm: FormGroup<{
    rotation: FormControl<IBoardObjectRotation>;
    size: FormControl<number>;
  }>;

  private _onDestroy: Subject<void> = new Subject();
  private _devBoardStoreService: Store<IDevBoardState<any, any>>

  constructor(
    @Inject(DIALOG_DATA) public readonly data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _storeService: StoreService
  ) { }


  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  ngOnInit(): void {
    this.devTileForm = this._formBuilder.group({
      rotation: [this.data.rotation, [Validators.required]],
      size: [this.data.size, [Validators.required]]
    })

    this._devBoardStoreService = this._storeService
      .getStore<IDevBoardState<any, any>>(StoreName.devBoardStore)

    this.devTileForm.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(v => this._devBoardStoreService.dispatch(DevBoardAction.updateObject, Object.assign({ ...this.data }, v)))
  }



}
