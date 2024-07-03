import { IGatherableDataProvider } from './data-gatherer.interface';


export class DataGatheringService {

  private _providers: IGatherableDataProvider[]

  public getGatherableDataProvider(dataType: string): any {
    throw new Error("Method not implemented.");
  }

}