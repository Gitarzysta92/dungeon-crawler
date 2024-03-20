// export class DungeonDeckAi implements IDungeonDeckInteractionHandler {

//   constructor(
//     private readonly _dungeonStateStore: DungeonStateStore,
//     private readonly _modelService: any
//   ) {}

//   public chooseCardToCast(state: DungeonGameplay): ICard<IEffect> {
//     return {} as ICard<IEffect>
//   };
  
//   public async collectFieldTypeData(
//     dataType: IFieldCollectableDataDefinition & IFieldCollectableDataStep,
//     effectDefinition: IEffectDefinition
//   ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>> {
//     return {} as IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>;
//   }

//   public async collectEffectTypeData(
//     dataType: IEffectCollectableDataDefinition & IEffectCollectableDataStep,
//     effectDefinition: IEffectDefinition
//   ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>> {
//     return {} as IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>;
//   }

//   public async collectRotationTypeData(
//     dataType: IRotationCollectableDataDefinition & IRotationCollectableDataStep,
//     effectDefinition: IEffectDefinition
//   ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableDataDefinition>> {
//     return {} as IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableDataDefinition>
//   }

//   public async collectActorTypeData(
//     dataType: IActorCollectableDataDefinition & IActorCollectableDataStep,
//     effectDefinition: IEffectDefinition
//   ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>> {
//     return {} as IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>
//   }

//   public async collectOriginTypeData(
//     dataType: IOriginCollectableDataDefinition & IOriginCollectableDataStep,
//     effectDefinition: IEffectDefinition
//   ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>> {
//     return {} as IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>
//   }

//   public async collectSourceActorTypeData(
//     dataType: ISourceActorCollectableDataDefinition & ISourceActorCollectableDataStep,
//     effectDefinition: IEffectDefinition
//   ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>> {
//     return {} as IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>;
//   }

// }