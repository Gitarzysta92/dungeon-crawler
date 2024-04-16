import { IActivity } from '@game-logic/lib/base/activity/activity.interface';
import { Store } from '@utils/store/store';


export interface IStateStoreTransaction<T> {
  store: Store<T>;
  dispatch: (activity: IActivity) => Promise<void>;
  abandonTransaction: () => void;
}
