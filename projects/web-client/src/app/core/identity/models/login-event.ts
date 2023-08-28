import { ICredentialsDto } from "./credentials.dto";

export interface ILoginEvent extends ICredentialsDto {
  resolve: () => void;
  reject: () => void;
}