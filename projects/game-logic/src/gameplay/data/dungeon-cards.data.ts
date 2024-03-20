import { ACTOR_IDENTIFIER, ACTOR_SELECTOR_IDENTIFIER, SOURCE_ACTOR_IDENTIFIER, SPAWN_ACTOR_ACTION_IDENTIFIER } from "../../lib/modules/actors/actors.constants"
import { PATH_IDENTIFIER, BOARD_SELECTOR_IDENTIFIER, ROTATION_IDENTIFIER, MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER, BOARD_FIELD_IDENTIFIER, PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER } from "../../lib/modules/board/board.constants"
import { ICard } from "../../lib/modules/cards-deck/entities/deck/deck.interface"
import { EFFECT_SELECTOR_IDENTIFIER } from "../../lib/modules/effects/aspects/selectors/effect.selector"
import { EffectCastTime, EffectLifetime, CastingStepType } from "../../lib/modules/effects/entities/effect.constants"
import { IEffectDeclaration } from "../../lib/modules/effects/entities/effect.interface"
import { MODIFY_STATISTIC_ACTION_IDENTIFIER } from "../../lib/modules/statistics/statistics.constants"
import { RAT_ACTOR_ID } from "./common-identifiers.data"

export const emptyCard: ICard = {
  id: "FEA3D848-6D9C-4E7D-A285-D8B41989CE4C",
  isCard: true
}


export const makeAttackCard: ICard & IEffectDeclaration = {
  id: "575B810F-2BC5-4D60-A2BD-0C2C362A468F",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isCard: true,
  isEntity: true,
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: ACTOR_IDENTIFIER,
      requireUniqueness: true,
      selectors: [
        { delegateId: ACTOR_SELECTOR_IDENTIFIER, payload: { inGroup: "{{caster.group}}" } },
        { delegateId: EFFECT_SELECTOR_IDENTIFIER }
      ]
    },
    castingEffect: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.CastingEffect,
      effectRef: "{{$.castingSchema.actor}}"
    }
  }
}


export const increaseEnemyAttackPowerCard: ICard & IEffectDeclaration = {
  id: "023E2534-4B47-49E8-8D2E-DDC5E5255912",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isCard: true,
  isEntity: true,
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: ACTOR_IDENTIFIER,
      requireUniqueness: true,
      selectors: [
        { delegateId: ACTOR_SELECTOR_IDENTIFIER, payload: { inGroup: "{{caster.group}}" } },
      ],
      amount: 1
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MODIFY_STATISTIC_ACTION_IDENTIFIER,
      payload: {
        field: "{{$.castingSteps.actor}}",
        rotation: "{{$.castingSteps[:2].value}}",
        target: "{{$.caster}}"  
      }
    }
  }
}

export const moveEnemyCard: ICard & IEffectDeclaration = {
  id: "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isEffect: true,
  isCard: true,
  isEntity: true,
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: ACTOR_IDENTIFIER,
      selectors: [
        { delegateId: ACTOR_SELECTOR_IDENTIFIER, payload: { inGroup: "{{caster.group}}" } },
      ],
      amount: 1
    },
    path: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.GatheringData,
      dataType: PATH_IDENTIFIER,
      gathererParams: { length: "{{$.abilityParameters.steps}}" },
      selectors: [
        { delegateId: BOARD_SELECTOR_IDENTIFIER, payload: { origin: "{{$.castingSchema.actor}}", shape: "line", range: 1 } }
      ],
    },
    rotation: {
      predecessorRef: "{{$.castingSchema.path}}",
      stepType: CastingStepType.GatheringData,
      dataType: ROTATION_IDENTIFIER,
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


export const spawnCreatureCard: ICard & IEffectDeclaration = {
  id: "B27818D2-1336-4C36-9068-AC667BD656D5",
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  isCard: true,
  isEffect: true,
  isEntity: true,
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: SOURCE_ACTOR_IDENTIFIER,
      payload: RAT_ACTOR_ID,
      amount: 2
    },
    field: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.GatheringData,
      dataType: BOARD_FIELD_IDENTIFIER,
      requireUniqueness: true,
      selectors: [
        { delegateId: BOARD_SELECTOR_IDENTIFIER, payload: { isField: true, isOccupied: false } }
      ]
    },
    rotation: {
      predecessorRef: "{{$.castingSchema.field}}",
      stepType: CastingStepType.GatheringData,
      dataType: ROTATION_IDENTIFIER,
    },
    createActor: {
      predecessorRef: "{{$.castingSchema.rotation}}",
      stepType: CastingStepType.MakeAction,
      delegateId: SPAWN_ACTOR_ACTION_IDENTIFIER,
      payload: {
        sourceActorId: "{{$.castingSchema.actor}}"
      }
    },
    placeOnBoard: {
      predecessorRef: "{{$.castingSchema.rotation}}",
      stepType: CastingStepType.MakeAction,
      delegateId: PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER ,
      payload: {
        actorId: "{{$.castingSchema.createActor.result.id}}",
        field: "{{$.castingSchema.field}}",
        rotation: "{{$.castingSchema.rotation}}"
      }
    }
  }
}