

export const equipItem = (payload: { item: Item & IPossesedItem & IEquipable, slots?: IInventorySlot[] }): IDispatcherDirective =>
  async (
    state: AdventureGameplay | DungeonGameplayLogicState,
    context: IActivityContext<IAdventureGameplayFeed | IDungeonGameplayFeed>
  ) => {

    const actor = state.actorsService.getActor<Actor & Partial<InventoryBearer>>(context.getControlledActorId());
    if (!actor.isInGroup(context.authority.groupId)) {
      throw new Error();
    }

    if (!actor.isInventoryBearer) {
      throw new Error("Actor has no inventory");
    }

    if (actor.possessItem(payload.item, 1)) {
      throw new Error("Actor do not posses given item in the inventory");
    }

    state.interactionService.resolveInteraction(EQUIP_INTERACTION_IDENTIFIER, payload.item, actor);

    actor.equipItem(payload.item, payload.slots);
    
    return {
      name: AdventureActivityName.EquipItem,
      payload: payload,
    }
  }