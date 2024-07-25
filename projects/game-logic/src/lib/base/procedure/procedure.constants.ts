export enum ProcedureStepTrigger {
  AfterEach,
  AfterAll
}


export enum ProcedureExecutionPhase {
  BeforeStepExecution,
  Executing,
  ExecutionFinished,
  NestedExecutionFinished
}