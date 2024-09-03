import { IParameterDeclaration } from "@game-logic/lib/cross-cutting/parameter/parameter.interface"
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface"
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface"
import { IDamageParameterDeclaration } from "@game-logic/lib/modules/combat/aspects/parameters/damage.parameter"

export const damageParameter: Omit<IDamageParameterDeclaration, 'value'> & INarrativeMedium & IUiMedium = {
  id: 1,
  isMixin: true,
  isParameter: true,
  isNarrationMedium: true,
  isModificable: true,
  isUiMedium: true,
  isDamageParameter: true,
  narrative: { name: "", description: "" },
  uiData: { }
}


export const rangeParameter: Omit<IParameterDeclaration, 'value'> & INarrativeMedium & IUiMedium  = {
  id: 2,
  isMixin: true,
  isParameter: true,
  isNarrationMedium: true,
  isModificable: true,
  isUiMedium: true,
  narrative: { name: "", description: "" },
  uiData: { }
}


export const drawAmount: Omit<IParameterDeclaration, 'value'> & INarrativeMedium & IUiMedium  = {
  id: 3,
  isMixin: true,
  isParameter: true,
  isNarrationMedium: true,
  isModificable: true,
  isUiMedium: true,
  narrative: { name: "", description: "" },
  uiData: { }
}