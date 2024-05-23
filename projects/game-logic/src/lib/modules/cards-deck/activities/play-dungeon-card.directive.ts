

// export const playDungeonCard = (cardPayload: { card: ICard<IEffect>, effectPayload: IEffectPayload }): IDispatcherDirective =>
//   async (state: DungeonGameplayLogicState) => {

//     state.deck.addCardToUtilized(cardPayload.card);

//     const { effect, payload } = cardPayload.effectPayload;

//     if (effect.requiredPayload && !payload) {
//       throw new Error("Cannot find associated params")
//     }
    
//     const effects = state.getAllEffects();
//     const signature = resolveEffect(cardPayload.effectPayload, state.board, state.heroInventory, effects);

//     return [{
//       name: SystemActivityName.PlayDungeonCard,
//       payload: payload,
//       effectSignatures: signature
//     }]
//   }