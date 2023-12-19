import { v4 } from "uuid";
import { IBoardSelector } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { IPayloadDefinition } from "../commons/effect-payload-collector/effect-payload.interface";
import { EffectName } from "../commons/effect.constants";
import { ISpawnActor, ISpawnDefinition, ISpawnActorDeclaration, ISpawnActorSignature, ISpawnActorResult, ISpawnActorResolvableDeclaration, ISpawnActorContext } from "./spawn-actor.interface";
import { SourceActorCollectableDataDefinition } from "../commons/effect-payload-collector/collectable-data-types/source-actor-collectable-data";
import { RotationCollectableDataDefinition } from "../commons/effect-payload-collector/collectable-data-types/rotation-collectable-data";
import { FieldCollectableDataDefinition } from "../commons/effect-payload-collector/collectable-data-types/field-collectable-data";
import { IEffectCaster } from "../commons/effect.interface";
import { EffectBase } from "../commons/effect-base";
import { BoardHelper } from "../../board/board.helper";

export class SpawnActorEffect extends EffectBase implements ISpawnActorDeclaration {

  public effectName: EffectName.SpawnActor;

  constructor(
    public readonly effect: ISpawnActor & IBoardSelector, 
    public readonly caster: IEffectCaster & { sight: number; },
    private readonly _context: ISpawnActorContext,
  ) {
    super(_context);
  }
  

  public resolve(declaration: ISpawnActorResolvableDeclaration): ISpawnActorSignature {
    if (declaration.effect.effectName !== EffectName.SpawnActor) {
      throw new Error("Provided payload is not suitable for spawnActor effect resolver");
    }
  
    if (!('selectorType' in declaration.effect)) {
      throw new Error("Spawn actor: Board selector not provided");
    }
  
    const results = declaration.payload.map(p => this._spawnActor(this.effect, p));
    
    return {
      effectId: this.effect.id,
      effectName: this.effectName,
      data: {
        casterId: this.caster.id,
        targets: results
      }
    }
  }

  private _spawnActor(
    effect: ISpawnActor & IBoardSelector,
    declaration: ISpawnDefinition
  ): ISpawnActorResult {
    const fields = this._context.getFieldsBySelector(effect);
    
    if (fields.length <= 0) {
      throw new Error('There are no actors for given board selector');
    }
  
    if (!fields.some(f => CoordsHelper.isCoordsEqual(declaration.field.position, f.position))) {
      throw new Error('There is no matching fields for given declaration');
    }
  
    const actor = Object.assign({ ...declaration.sourceActor }, { id: v4() })
    this._context.board.assignObject(actor, declaration.field, declaration.rotation);
    
    return {
      rotation: declaration.rotation,
      fieldCoords: declaration.field.position,
      targetId: actor.id
    }
  }

  public getPayloadDefinition(): IPayloadDefinition {
    const definition = {
      effect: this.effect,
      caster: this.caster,
      amountOfTargets: this.calculateAmountOfTargets(),
      gatheringSteps: []
    };

    definition.gatheringSteps.push(
      new SourceActorCollectableDataDefinition({
        requireUniqueness: false,
        possibleSourceActorIds: [this.effect.enemyId]
      })
    );

    if (BoardHelper.validateSelector(this.effect)) {
      definition.gatheringSteps = definition.gatheringSteps.concat([
        new FieldCollectableDataDefinition({
          requireUniqueness: true,
          possibleFieldsResolver: () => this._getFieldsAllowedToSpawn()
        }),
        new RotationCollectableDataDefinition({
          requireUniqueness: false,
        })
      ]);
    }

    return definition;
  }


  private _getFieldsAllowedToSpawn() {
    const origins = this._context.getHeroes();
    const sourceFields = this._context.board.getNonOccupiedFieldsBySelector(this.effect);
    const fieldsToSubstract = this._context.board.getFieldsBySelector({
      selectorType: "radius",
      selectorOrigin: origin,
      selectorRange: this._getAllowedSpawnDiameter(origin.sight)
    })
    return sourceFields.filter(sf => !fieldsToSubstract.find(fs => fs.id === sf.id))
  }


  private _getAllowedSpawnDiameter(sight: number): number {
    const possibleDistanceIncrease = Math.abs(this.effect.minSpawnDistanceFromHero - sight);
    return this.effect.minSpawnDistanceFromHero + Math.round(possibleDistanceIncrease / 2);
  }
  
}