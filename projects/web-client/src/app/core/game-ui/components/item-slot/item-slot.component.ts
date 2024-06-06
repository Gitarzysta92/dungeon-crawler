import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IInventorySlot } from '@game-logic/lib/modules/items/entities/inventory-slot/inventory-slot.interface';
import { IInteractableMedium } from '../../mixins/interactable-medium/interactable-medium.interface';
import { IUiMedium } from '../../mixins/ui-medium/ui-medium.interface';
import { INarrativeMedium } from '../../mixins/narrative-medium/narrative-medium.interface';

import { DragService } from '../../services/drag.service';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ModalService } from '../../services/modal.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Subscription, distinctUntilKeyChanged, switchMap, iif, of, delay, filter, tap, Observable, map } from 'rxjs';


@Component({
  selector: 'item-slot',
  templateUrl: './item-slot.component.html',
  styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnInit, OnDestroy {

  @ViewChild("trigger") trigger: ElementRef
  
  @Input() slot: {
    item: IInteractableMedium & IUiMedium & INarrativeMedium,
    reservationItem: IInteractableMedium & IUiMedium & INarrativeMedium,
  } & IInventorySlot & IUiMedium & IInteractableMedium;

  @Input() displayAmount: boolean = true;
  
  public onSlotHover: Subject<MouseEvent> = new Subject();

  private _infoPanelRef: OverlayRef;
  private _subRef: Subscription;

  constructor(
    private readonly _dragService: DragService,
    private readonly _infoPanelService: ModalService
  ) { }
  
  ngOnInit(): void { 
    this._handleInfoPanel()
  }

  ngOnDestroy(): void {
    this._subRef && this._subRef.unsubscribe();
  }
  
  public onDrop(e) {
    this._dragService.finishDraggingProcess(e)
  }

  public onDragStarted(e) {
    this._dragService.startDraggingProcess(e)
  }

  public onDragEnded(e) {
    this._dragService.interruptDraggingProcess(e)
  }

  public validateItemEnter(drag: CdkDrag, drop: CdkDropList): boolean {
    return !drop.data.isDisabled &&
      !drop.data.isReserved &&
      drop.data.isAbleToTakeItems(1, drag.data.item)
  }

  private _handleInfoPanel() {
    let infoPanelRef: OverlayRef | undefined
    this._subRef = this._listenForSlotHover()
      .subscribe(hovered => {
        if (hovered && !infoPanelRef && !this._dragService.isPerformingDrag && !!this.slot.item) {
          infoPanelRef = this._infoPanelService.createHoverInfoPanel(this.trigger, this.slot.item);
        } else if (!hovered && infoPanelRef) {
          infoPanelRef.dispose()
          infoPanelRef = undefined;
        }
      })
  }

  private _listenForSlotHover(): Observable<boolean> {
    const isMouseEnter = (e: MouseEvent) => e.type === 'mouseenter';
    const isMouseLeave = (e: MouseEvent) => e.type === 'mouseleave';
    let lastEvent: MouseEvent = null;
    return this.onSlotHover
      .pipe(
        distinctUntilKeyChanged('type'),
        switchMap(e => iif(() => isMouseEnter(e), of(e).pipe(delay(500)), of(e))),
        filter(e => {
          const result = lastEvent && lastEvent.type !== e.type || !lastEvent && !isMouseLeave(e)
          lastEvent = e;
          return result
        }),
        map(e => isMouseEnter(e))
      )
  }


}
