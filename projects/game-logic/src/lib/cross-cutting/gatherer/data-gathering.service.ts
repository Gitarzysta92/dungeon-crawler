import { IGatherableDataProvider } from './data-gatherer.interface';


export class DataGatheringService {

  private _providers: IGatherableDataProvider[] = [];

  public registerProvider(p: IGatherableDataProvider): void {
    this._providers.push(p);
  }

  public getGatherableDataProvider(dataType: string): IGatherableDataProvider | undefined {
    return this._providers.find(p => p.validate(dataType));
  }

}