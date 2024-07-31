import { IMixin } from "../../infrastructure/mixin/mixin.interface";
import { IPlayerController } from "../player/players.interface";
import { IProcedure, IProcedureDeclaration } from "../procedure/procedure.interface";


export interface IActivitySubject extends IActivitySubjectDeclaration {
  activities: IActivity[];
}

export interface IActivitySubjectDeclaration extends IMixin {
  isActivitySubject: true;
  activities: IActivityDeclaration[];
}

export interface IActivityDoer {
  validateActivityResources?(d: IActivityCost[]): boolean;
  consumeActivityResources?(d: IActivityCost[]): void;
}

export interface IActivity extends IActivityDeclaration {
  subject: IActivitySubject;
  canBeDone(doer: IActivityDoer): boolean;
  doActivity(doer: IActivityDoer, controller: IPlayerController): Promise<void> | void | AsyncGenerator;
}

export interface IActivityDeclaration extends IMixin, Omit<Partial<IProcedureDeclaration>, 'isMixin'> {
  id: any;
  cost?: IActivityCost[];
  isActivity: true;
}


export interface IActivityCost {
  resourceId: string,
  resourceType: string,
  value?: number;
}

export interface IActivityResource {
  id: string;
  value?: number;
  isActivityResource: true;
}

export interface IActivitySignature {
  
}

