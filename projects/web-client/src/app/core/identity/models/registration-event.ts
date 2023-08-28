import { IRegistrationDto } from "./registration.dto";

export interface IRegistrationEvent extends IRegistrationDto {
  resolve: () => void;
  reject: () => void;
}