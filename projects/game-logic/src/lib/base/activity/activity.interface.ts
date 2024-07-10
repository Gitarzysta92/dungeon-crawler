import { IMixin } from "../../infrastructure/mixin/mixin.interface";
import { IProcedure, IProcedureDeclaration } from "../procedure/procedure.interface";


export interface IActivitySubject extends IActivitySubjectDeclaration {
  activities: IActivity[];
}

export interface IActivitySubjectDeclaration extends IMixin {
  isActivitySubject: true;
  activities: IActivityDeclaration[];
}

export interface IActivity extends IActivityDeclaration {
  isActive?: boolean;
  isLocalActivity?: boolean;
  subject: IActivitySubject;
  canBeDispatched(...args: Array<IActivityResourceProvider | unknown>): Promise<boolean> | boolean;
  dispatch(...args: Array<IActivityResourceProvider | unknown>): Promise<void> | void | AsyncGenerator;
  dispatch2?(...args: Array<IActivityResourceProvider | unknown>): AsyncGenerator;
}

export interface IActivityDeclaration extends IMixin, Omit<Partial<IProcedureDeclaration>, 'isMixin'> {
  id: string;
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


export interface IActivityResourceProvider {
  validateActivityResources(d: IActivityCost[]): boolean;
  consumeActivityResources(d: IActivityCost[]): void;
}