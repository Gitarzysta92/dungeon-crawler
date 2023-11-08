import { gatherItemQuest } from "./quests.data"
import { vendorCharacter } from "./characters.data"
import { IArea } from "../lib/features/adventure/area.interface";
import { firstArea, firstAreaTavern, secondArea } from "./areas.data";

export const areas: IArea[] = [firstArea, firstAreaTavern, secondArea];

export const characters = [vendorCharacter]

export const quests = [Object.assign({ ...gatherItemQuest }, { originId: vendorCharacter.id })]