import { IAssetDeclaration, IAssetDefinitionProvider } from "../assets/assets.interface";
import { ISceneComposerDefinition, ISceneComposerHandler } from "../helpers/scene-composer/scene-composer.interface";

export abstract class ActorFactoryBase<T extends ISceneComposerDefinition<unknown>, R>
  implements ISceneComposerHandler<T['definitionName'], T>, IAssetDefinitionProvider<T['definitionName']> {
    
  constructor(
    public readonly definitionName: T['definitionName']
  ) { }
  
  abstract compose(def: T): Promise<void>;
  abstract create(def: T): Promise<R>;
  abstract getRequiredAssetDefinitions(): IAssetDeclaration[]; 

  public validateComposer(defName: string): boolean {
    return defName === this.definitionName;
  }
}
