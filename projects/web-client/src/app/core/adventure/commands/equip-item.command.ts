
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




  export class EquipItemCommand implements IMixinFactory<any> {

    constructor(
      private readonly _routingService: RoutingService
    ) {}
    
    public validate(a: IEnterDungeonActivity): boolean {
      return a.isActivity && a.id === ENTER_DUNGEON_ACTIVITY
    }
  
    public create(e: Constructor<IEnterDungeonActivity>): Constructor<any> {
      const routingService = this._routingService;
      class Command extends e {
        
        constructor(d: unknown) {
          super(d);
        }
  
        public async execute(h: IHero, adventureStateStore: AdventureStateStore): Promise<void> {
          const directive = await this.perform(h);
          await adventureStateStore.dispatch(directive as any);
          routingService.navigateToDungeonInstance(adventureStateStore.currentState.visitedDungeon.id);
        }
  
      }
      return Command;
    }
  }