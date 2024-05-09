export interface IBasicTask {
  perform: (t: number) => void;
  initialize: (t?: IBasicTask) => void;
}

export interface IContinousTask extends IBasicTask {
  continue: boolean;
}

export type ITask = IContinousTask | IBasicTask;
