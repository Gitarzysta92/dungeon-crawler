export function getPaylodDefinitions(effect: IEffect, o: Outlet[] = []): IPayloadDefinition[] {
  if (effect.effectName === EffectName.DealDamageByWeapon && 'selectorType' in effect) {
    return getDealDamageByWeaponPayloadDefinitions(effect, this._state.heroInventory, this._state.board, o)
  }

  if (effect.effectName === EffectName.DealDamage && 'selectorType' in effect) {
    return getDealDamagePayloadDefinitions(effect, this._state.board, o);
  }

  if (effect.effectName === EffectName.SpawnActor  && 'selectorType' in effect) {
    return getSpawnActorPayloadDefinitions(effect, this._state.board, this._state.hero.sight);
  }

  if (effect.effectName === EffectName.ModifyPosition  && 'selectorType' in effect) {
    return getModifyPositionPayloadDefinitions(effect, this._state.board, this._state.hero)
  }

  if (effect.effectName === EffectName.ModifyStats  && 'selectorType' in effect) {
    return getModifyStatsPayloadDefinitions(effect, this._state.board);
  }

  if (effect.effectName === EffectName.TriggerEffect) {
    return getTriggerEffectPayloadDefinitions(effect, this._state.getAllEffects(), getPaylodDefinitions())
  }
  
  return [];
}