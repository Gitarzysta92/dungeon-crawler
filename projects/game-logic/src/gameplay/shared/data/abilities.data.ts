import { EntityLifecycle } from "../../../lib/base/entity/entity.constants"
import { AutoGatherMode } from "../../../lib/cross-cutting/gatherer/data-gathering.constants"
import { IInteractionSubject } from "../../../lib/cross-cutting/interaction/interaction.interface"
import { IAbility } from "../../../lib/modules/ability/ability.interface"
import { MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER, MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER } from "../../../lib/modules/board/board.constants"
import { CAST_EFFECT_INTERACTION_IDENTIFIER } from "../../../lib/modules/effect/aspects/interactions/cast-effect.interaction"
import { EffectCastTime, EffectLifetime, CastingStepType } from "../../../lib/modules/effect/effect.constants"
import { IEffectDefinition } from "../../../lib/modules/effect/effect.interface"
import { improvableMajorActionStatistic, dealDamageFormula, healthStatistic, defenceStatistic } from "./statistics.data"





export const basicAttack: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isEntity: true,
  isAbility: true,
  abilityParameters: {
    repetitions: 1,
  },
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  castingSchema: {
    item: {
      stepType: CastingStepType.GatheringData,
      dataType: "item",
      autogather: { mode: AutoGatherMode.AllSelected },
      selectors: [
        { delegateId: "selector:item", payload: { inventoryBearer: "{{$.caster}}", isEquiped: true, tags: ["weapon"] } },
      ]
    },
    castEffect: {
      predecessorRef: "{{$.castingSchema.item}}",
      stepType: CastingStepType.CastingEffect,
      effectRef: "{{$.castingSchema.item}}",
      repetitions: 2,
    }
  }
}


export const move: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "A3ED3076-47E7-479B-86B4-147E07DA584C",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  abilityParameters: {
    steps: 1,
    speed: 1
  },
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "path",
      payload: "{{$.caster}}"
    },
    path: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.GatheringData,
      dataType: "path",
      gathererParams: { length: "{{$.abilityParameters.steps}}" },
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: "{{$.abilityParameters.speed}}" } }
      ],
    },
    rotation: {
      predecessorRef: "{{$.castingSchema.path}}",
      stepType: CastingStepType.GatheringData,
      dataType: "rotation",
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.rotation}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER,
      payload: {
        path: "{{$.castingSchema.path}}",
        rotation: "{{$.castingSchema.rotation}}",
        target: "{{$.castingSchema.actor}}"  
      }
    }
  }
}


export const fireball: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {
    range: 1,
    baseDamage: 10
  },
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: "{{$.abilityParameters.range}}" } }
      ],
      amount: 1
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "actions:modify-statistic-by-formula",
      payload: {
        value: "{{$.abilityParameters.baseDamage}}",
        caster: "{{$.caster}}",
        target: "{{$.castingSteps.actor}}",
        formula: dealDamageFormula
      }
    }
  }
}


export const teleport: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      payload: "{{$.caster}}",
    },
    field: {
      stepType: CastingStepType.GatheringData,
      dataType: "field",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 2 } }
      ],
    },
    rotation: {
      stepType: CastingStepType.GatheringData,
      dataType: "rotation",
    },
    makeAction: {
      stepType: CastingStepType.MakeAction,
      delegateId: "modify-position",
      payload: {
        field: "{{$.castingSteps[:1].value}}",
        rotation: "{{$.castingSteps[:2].value}}",
        target: "{{$.caster}}"  
      }
    }
  },
}


export const healing: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "4A75B866-3878-4D23-954E-9DC4E6663DAE",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 2 } }
      ],
      amount: 1
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "restore-statistic",
      payload: {
        statisticId: healthStatistic.key,
        target: "{{$.castingSchema.actor}}",
        value: 10,
      }
    }
  }
}


export const vision: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: "selector:cards-deck", payload: { isCardsDeck: true } }
      ],
      amount: 1
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "reaveal-dungeon-card",
      payload: {
        dungeonDeck: "{{$.castingSchema.actor}}",
        amount: 1
      }
    }
  }
}

export const weakness: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Lasting,
  duration: 2,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 2 } }
      ],
      amount: 1
    },
    exposeModifier: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.ExposeModifier,
      exposer: "{{$.castingSchema.actor}}",
      delegateId: "statistic-modifier",
      payload: {
        statisticId: healthStatistic.key,
        target: "{{$.castingSchema.actor}}",
        value: 10,
        operator: "substract"
      }
    }
  }
}


export const curse: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "636642BE-EA42-4482-B81C-48D8398D3BC5",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Lasting,
  duration: 2,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key}] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "radius", range: 2 } }
      ],
      amount: 3
    },
    exposeModifier: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.ExposeModifier,
      exposer: "{{$.castingSchema.actor}}",
      delegateId: "statistic-modifier",
      payload: {
        statisticId: healthStatistic.key,
        target: "{{$.castingSchema.actor}}",
        value: 5,
        operator: "substract"
      }
    }
  }
}


export const meteorShower: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {
    baseDamage: 10
  },
  castingSchema: {
    field: {
      stepType: CastingStepType.GatheringData,
      dataType: "field",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "radius", range: 2 } }
      ],
      amount: 1
    },
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      autogather: { mode: AutoGatherMode.AllSelected },
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.castingSchema.field}}", shape: "radius", range: 2 } }
      ],
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "actions:modify-statistic-by-formula", payload: {
        value: "{{$.abilityParameters.baseDamage}}",
        caster: "{{$.caster}}",
        target: "{{$.castingSchema.acotr}}",
        formula: dealDamageFormula
      }
    }
  }
}


export const cleansingMove: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    target: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      payload: "{{$.caster}}"
    },
    path: {
      predecessorRef: "{{$.castingSchema.target}}",
      stepType: CastingStepType.GatheringData,
      dataType: "path",
      gathererParams: { length: "{{$.abilityParameters.steps}}" },
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: "{{$.abilityParameters.speed}}" } }
      ],
    },
    rotation: {
      predecessorRef: "{{$.castingSchema.path}}",
      stepType: CastingStepType.GatheringData,
      dataType: "rotation",
    },
    removeEffects: {
      predecessorRef: "{{$.castingSchema.rotation}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "remove-effects",
      payload: { lifeTime: EffectLifetime.Lasting, target: "{{$.castingSteps.path}}" }
    },
    moveOverPath: {
      predecessorRef: "{{$.castingSchema.removeEffects}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "move-over-path",
      payload: {
        path: "{{$.castingSteps.path}}",
        rotation: "{{$.castingSteps.rotation}}",
        target: "{{$.castingSteps.target}}"  
      }
    }
  }
}




export const domeOfProtection: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Lasting,
  lifecycle: EntityLifecycle.Reusable,
  duration: 2,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    field: {
      stepType: CastingStepType.GatheringData,
      dataType: "field",
      payload: "{{$.caster.associatedField}}"
    },
    exposeModifier: {
      predecessorRef: "{{$.castingSchema.field}}",
      stepType: CastingStepType.ExposeModifier,
      delegateId: "statistic-modifier",
      exposer: "{{$.castingSchema.field}}",
      payload: {
        statisticId: defenceStatistic.key,
        target: {
          dataType: "actor",
          selectors: [{ delegateId: "selector:board", payload: { origin: "{{$.castingSteps[:1].value}}", shape: "line", range: 1 } }]
        },
        value: 5,
        operator: "add"
      }
    }
  }
}



export const circleOfProtection: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "9CF5DF9C-26BF-400C-9B72-D3D10E206485",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    exposeModifier: {
      stepType: CastingStepType.ExposeModifier,
      delegateId: "statistic-modifier",
      exposer: "$.caster",
      payload: {
        statisticId: defenceStatistic.key,
        target: {
          dataType: "actor",
          selectors: [{ delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "circle", range: 1 } }]
        },
        value: 5,
        operator: "add"
      }
    }
  }
}




export const fear: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "D6454F3A-9770-45E1-A13B-179CD9A099E7",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
      ],
      amount: 3
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER,
      payload: {
        statisticId: defenceStatistic.key,
        target: "{{$.castingSchema.value}}",
        origin: "{{$.caster}}",
        towards: false
      }
    }
  },
}


export const mindControl: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "D6454F3A-9770-45E1-A13B-179CD9A099E7",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
      ],
      amount: 3
    },
    path: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.GatheringData,
      dataType: "path",
      gathererParams: { length: "{{$.abilityParameters.steps}}" },
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 1 } }
      ],
    },
    rotation: {
      predecessorRef: "{{$.castingSchema.path}}",
      stepType: CastingStepType.GatheringData,
      dataType: "rotation",
    },
    moveAction: {
      predecessorRef: "{{$.castingSchema.rotation}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "move-over-path",
      payload: {
        path: "{{$.castingSchema.path}}",
        rotation: "{{$.castingSchema.rotation}}",
        target: "{{$.castingSchema.actor}}"  
      }
    }
  }
}


export const burning: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "0CD9349E-B8F9-4BE1-9A00-6B137AFF817A",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
  ],
  abilityParameters: {},
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      requireUniqueness: true,
      amount: 1,
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
        { delegateId: "selector:actor", payload: { notInGroup: "{{caster.group}}", tags: ["creature"] } }
      ]
    },
    castEffect: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.CastingEffect,
      effectRef: {
        castTime: EffectCastTime.Deffered,
        lifetime: EffectLifetime.Lasting,
        castTriggers: [{ name: "start-turn" }],
        isEffect: true,
        duration: 2,
        castingSchema: {
          makeAction: {
            stepType: CastingStepType.MakeAction,
            delegateId: "actions:modify-statistic-by-formula",
            payload: {
              value: 10,
              caster: "{{$.caster}}",
              target: "{{$.castingSteps.actor}}",
              formula: dealDamageFormula
            }
          }
        },
      }
    }
  }
}


export const trap: IAbility & IEffectDefinition & IInteractionSubject = {
  id: "C4748A03-05FC-47E2-8A9B-86F7E0411C79",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  isEffect: true,
  isAbility: true,
  isEntity: true,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
  ],
  abilityParameters: {},
  castingSchema: {
    field: {
      stepType: CastingStepType.GatheringData,
      dataType: "field",
      amount: 1,
      selectors: [
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "radius", range: 1 } },
      ]
    },
    castingEffect: {
      predecessorRef: "{{$.castingSchema.field}}",
      stepType: CastingStepType.CastingEffect,
      effectRef: {
        castTime: EffectCastTime.Deffered,
        castTriggers: [{ name: "start-turn" }],
        lifetime: EffectLifetime.Lasting,
        isEffect: true,
        duration: 2,
        castingSchema: {
          makeActtion: {
            stepType: CastingStepType.MakeAction,
            delegateId: "actions:modify-statistic-by-formula",
            payload: {
              value: 10,
              caster: "{{$.caster}}",
              target: "{{$.castingSteps[:0]}}",
              formula: dealDamageFormula
            }
          }
        },
      }
    }
  }
}