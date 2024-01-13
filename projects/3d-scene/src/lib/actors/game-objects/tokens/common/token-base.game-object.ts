import { Material, Mesh  } from "three";
import { ActorBase } from "../../../actor-base";
import { IAssignable } from "../../fields/common/field.interface";

export abstract class TokenBase extends ActorBase implements IAssignable {
  public takenFieldId: string | undefined;
  protected abstract get _object(): Mesh & Partial<{ material: Material | Material[]; }>;
}