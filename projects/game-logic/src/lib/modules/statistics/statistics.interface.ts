import { Guid } from "../../extensions/types";
import { IFormulaDefinition } from "./formula/formula.interface";


export interface IStatisticDataFeed {
  getFormulas: (ids?: Guid[]) => Promise<IFormulaDefinition[]>;
  getFormula: (id: Guid) => Promise<IFormulaDefinition>;
}
