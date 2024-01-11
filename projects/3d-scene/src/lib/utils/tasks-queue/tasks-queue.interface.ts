export interface IBasicTask {
  perform: (t: number) => void;
  initialize: () => void;
}

export interface IContinousTask extends IBasicTask {
  continue: boolean;
}

export type ITask = IContinousTask | IBasicTask;
