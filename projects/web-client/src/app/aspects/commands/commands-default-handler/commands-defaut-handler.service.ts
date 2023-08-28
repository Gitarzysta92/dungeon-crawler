import { Injectable } from "@angular/core";
import { BaseCommand } from "../command-bus/base-command";
import { CommandBusHandler } from "../command-bus/command-bus.service";
import { CommandsQueueService } from "../commands-queue/commands-queue.service";

@Injectable()
export class CommandsDefaultHandler implements CommandBusHandler<BaseCommand> {

  constructor(
    private readonly commandsQueueService: CommandsQueueService
  ) { }

  public handle(command: BaseCommand) {
    !command.alreadyHandled && this.commandsQueueService.handle(command);
    command.alreadyHandled = true;
  }
}