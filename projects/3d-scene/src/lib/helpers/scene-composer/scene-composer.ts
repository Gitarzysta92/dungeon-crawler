import { ISceneComposerDefinition, ISceneComposerHandler } from "./scene-composer.interface";
import { IActor } from "../../actors/actor.interface";

export class SceneComposer { 
  constructor(
    // TODO : get rid of any assertion.
    private readonly _handlers: ISceneComposerHandler<unknown, any>[],
  ) { }
  
  public async compose(defs: ISceneComposerDefinition<unknown>[]): Promise<void> {
    for (let def of defs) {
      await this._handleComposition(def);
    }
  }

  public async create<T extends IActor>(def: ISceneComposerDefinition<unknown>): Promise<T> {
    const handler = this._handlers.find(h => h.definitionName === def.definitionName);
    if (!handler) {
      throw new Error(`SceneComposer: There is no handler for ${def.definitionName}`);
    }
    return await handler.create(def) as T;
  }

  private async _handleComposition(def: ISceneComposerDefinition<unknown>): Promise<void> {
    for (let handler of this._handlers) {
      if (!handler.validateComposer(def.definitionName as string)) {
        continue;
      }
      
      await handler.compose(def);
      if (def.isHandled) {
        break;
      }
      if (this._handlers.indexOf(handler) === this._handlers.length - 1 && !def.isHandled) {
        throw new Error(`SceneComposer: There is no handler for ${def.definitionName}`);
      }
    }
  }
}