import { IEntity, IEntityFactory } from "../../../base/entity/entity.interface";
import { AbilityPerformer } from "./ability-performer";
import { IAbilityPerformer } from "./ability-performer.interface";
import { IAbilityDataFeed } from "../ability.interface";

export class AbilityPerformerFactory implements IEntityFactory<IAbilityPerformer> {

  public get classDefinition() { return AbilityPerformer };

  constructor(
    private readonly _dataFeed: IAbilityDataFeed
  ) { }
  
  public create(e: IAbilityPerformer & IEntity): AbilityPerformer {
    return new AbilityPerformer(e);
  };

  public validate(e: IEntity & Partial<IAbilityPerformer>): boolean {
    return e.isAbilityPerformer;
  };

}