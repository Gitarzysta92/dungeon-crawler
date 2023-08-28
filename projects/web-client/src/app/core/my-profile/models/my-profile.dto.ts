import { IProfileDto } from "../../profiles/api";


export interface IMyProfileDto extends IProfileDto {
  selectedArmies: number[];
  languageId: number;
}