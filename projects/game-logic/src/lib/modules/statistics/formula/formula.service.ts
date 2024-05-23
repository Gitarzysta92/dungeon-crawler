import { Guid } from "../../../infrastructure/extensions/types";
import { IStatisticDataFeed } from "../statistics.interface";
import { Formula } from "./formula";
import { IFormulaDefinition } from "./formula.interface";

export class FormulaService {
  
  private _formulas: Map<Guid, Formula> = new Map();

  constructor(
    private _dataFeed: IStatisticDataFeed
  ) { }
  
  public async initialize(): Promise<void> {
    const formulas = await this._dataFeed.getFormulas();
    formulas.forEach(f => this.registerFormula(f.id, f));
  }

  public registerFormula(id: Guid, def: IFormulaDefinition) {
    const formula = new Formula(def);
    this._formulas.set(id, formula);
  }

  public getFormula(formulaId: string): Formula {
    const formula = this._formulas.get(formulaId);
    if (!formula) {
      throw new Error(`Cannot find formula ${formula}`);
    }
    return formula;
  }
}