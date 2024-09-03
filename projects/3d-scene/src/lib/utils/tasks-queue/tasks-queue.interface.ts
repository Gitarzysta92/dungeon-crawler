export interface IBasicTask {
  perform: (s: { time: number, deltaT: number }) => void;
  initialize: (t?: IBasicTask) => void;
}

export interface IContinousTask extends IBasicTask {
  continue: boolean;
}

export type ITask = IContinousTask | IBasicTask;
