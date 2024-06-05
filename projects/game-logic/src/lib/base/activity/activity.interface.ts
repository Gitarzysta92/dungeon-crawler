import { IMixin } from "../../infrastructure/mixin/mixin.interface";


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
  canBePerformed(...args: Array<IActivityResourceProvider | unknown>): Promise<boolean> | boolean;
  perform(...args: Array<IActivityResourceProvider | unknown>): Promise<void> | void | AsyncGenerator;
  perform2?(...args: Array<IActivityResourceProvider | unknown>): AsyncGenerator;
}

export interface IActivityDeclaration extends IMixin {
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
  isResource: true;
}

export interface IActivitySignature {
  
}


export interface IActivityResourceProvider {
  validateActivityResources(d: IActivityCost[]): boolean;
  consumeActivityResources(d: IActivityCost[]): void;
}