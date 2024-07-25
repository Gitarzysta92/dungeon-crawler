import { Injectable } from "@angular/core";
import { IActivitySubject } from "@game-logic/lib/base/activity/activity.interface";
import { DISCARD_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from "@game-logic/lib/modules/cards/cards.constants";
import { race } from "rxjs";
import { UiInteractionService } from "../../game-ui/services/ui-interaction.service";
import { ICommandExecutionController, ICommand } from "../../game/interfaces/command.interface";
import { SceneInteractionService } from "../../scene/api";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { BOARD_TRAVEL_ACTIVITY } from "@game-logic/gameplay/modules/board-areas/board-areas.constants";
import { InteractionService } from "../../game/services/interaction.service";
import { MappingService } from "../../game/services/mapping.service";


@Injectable()
export class HumanPlayerService implements ICommandExecutionController {

  constructor(
    private readonly _uiService: UiInteractionService,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _interactionService: InteractionService,
    private readonly _mappingService: MappingService
  ) { }


  public async selectCommandType(types: { [key: string]: ICommand[]; }): Promise<ICommand[]> {
    if (DISCARD_CARD_ACTIVITY in types && TRASH_CARD_ACTIVITY in types) {
      return types[DISCARD_CARD_ACTIVITY];
    }
    return []
  }

  public async selectCommand(availableCommands: ICommand[]): Promise<ICommand> {
    if (availableCommands.every(c => c.id === BOARD_TRAVEL_ACTIVITY)) {
      return await this._travelCommandSelection(availableCommands);
    } else {
      return availableCommands[0];
    }
  }


  private async _travelCommandSelection(availableCommands: ICommand[]): Promise<ICommand> {
    const preventHovering = this._interactionService.allowHovering(this._mappingService.mapCommandsToInteractableElementsMap(availableCommands));
    const unhighlightElements = this._interactionService.highlightElements(this._mappingService.extractActivitySubjects(availableCommands))

    const selectActivitySubject = r => r?.isActivitySubject && r?.activities.some(a => availableCommands.includes(a as any))
    const dataProvider = race([
      this._sceneInteractionService.requestSceneMediumSelection<IActivitySubject & ISceneMedium>(selectActivitySubject),
      this._uiService.requestUiMediumSelection<IActivitySubject>(selectActivitySubject)
    ]);
    const result = await new Promise<ICommand>((resolve) => {
      this._interactionService.requestInteraction<IActivitySubject>(dataProvider)
        .subscribe(async c => {
          if (c.data.activities.filter(a => a.id === BOARD_TRAVEL_ACTIVITY).length > 1) {
            throw new Error("Given activity subject has more than one BOARD_TRAVEL_ACTIVITY");
          }
          const activity = c.data.activities.find(a => a.id === BOARD_TRAVEL_ACTIVITY) as ICommand

          if (c.isCompleted) {
            resolve(activity);
          }
      });
    });

    preventHovering();
    unhighlightElements();
    return result
  }
  

}