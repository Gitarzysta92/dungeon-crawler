import { ProcedureExecutionPhase, ProcedureStepTrigger } from "../../../lib/base/procedure/procedure.constants";


export const basicZeroStepProcedureDeclaration = {
  isProcedure: true,
  testMetadata: {},
  procedureSteps: {}
}



export const basicSingleStepProcedureDeclaration = {
  isProcedure: true,
  testMetadata: {
    firstStep: { numberOfPasses: 2 },
    executionOrder: [
      { passId: 1, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 2, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { key: null, phaseType: ProcedureExecutionPhase.ExecutionFinished }
    ]
  },
  procedureSteps: {
    firstStep: {
      isInitialStep: true,
      executionsNumber: 2,
    },
  }
}


export const basicTwoStepProcedureDeclaration = {
  isProcedure: true,
  testMetadata: {
    firstStep: { numberOfPasses: 2 },
    secondStep: { numberOfPasses: 2 },
    executionOrder: [
      { passId: 1, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 1, key: 'secondStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 2, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 2, key: 'secondStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { key: null, phaseType: ProcedureExecutionPhase.ExecutionFinished }
    ]
  },
  procedureSteps: {
    firstStep: {
      isInitialStep: true,
      executionsNumber: 2,
      nextStepTrigger: ProcedureStepTrigger.AfterEach,
      nextStep: "{{$.procedureSteps.secondStep}}"
    },
    secondStep: {
    } 
  }
}


export const basicTwoStepProcedureDeclarationWithEarlyResolve = {
  isProcedure: true,
  testMetadata: {
    firstStep: { numberOfPasses: 2 },
    secondStep: { numberOfPasses: 1 },
    executionOrder: [
      { passId: 1, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 1, key: 'secondStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 1, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { key: null, phaseType: ProcedureExecutionPhase.ExecutionFinished }
    ]
  },
  procedureSteps: {
    firstStep: {
      isInitialStep: true,
      earlyResolveWhenPossible: true,
      executionsNumber: 2,
      nextStepTrigger: ProcedureStepTrigger.AfterEach,
      nextStep: "{{$.procedureSteps.secondStep}}"
    },
    secondStep: {} 
  }
}


export const basicTwoStepHorizontalProcedureDeclaration = {
  isProcedure: true,
  testMetadata: {
    firstStep: { numberOfPasses: 2 },
    secondStep: { numberOfPasses: 2 },
    executionOrder: [
      { passId: 1, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 2, key: 'firstStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 1, key: 'secondStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { passId: 2, key: 'secondStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
      { key: null, phaseType: ProcedureExecutionPhase.ExecutionFinished }
    ]
  },
  procedureSteps: {
    firstStep: {
      isInitialStep: true,
      executionsNumber: 2,
      nextStepTrigger: ProcedureStepTrigger.AfterAll,
      nextStep: "{{$.procedureSteps.secondStep}}"
    },
    secondStep: {
    } 
  }
}


export const basicRecursiveTwoStepProcedureDeclaration = {
  isProcedure: true,
  testMetadata: {
    firstStep: { numberOfPasses: 2 },
    secondStep: { numberOfPasses: 2 },
    thirdStep: { numberOfPasses: 2 },
    fourthStep: { numberOfPasses: 2 },
    executionOrder: [
      {
        passId: 1,
        key: 'firstStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 1,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1,key: 'thirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1,key: 'fourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      {
        passId: 2,
        key: 'firstStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 2,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1, key: 'thirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1, key: 'fourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      { key: null, phaseType: ProcedureExecutionPhase.ExecutionFinished }
    ]
  },
  procedureSteps: {
    firstStep: {
      isInitialStep: true,
      executionsNumber: 2,
      nextStepTrigger: ProcedureStepTrigger.AfterEach,
      nextStep: "{{$.procedureSteps.secondStep}}"
    },
    secondStep: {
      procedure: {
        isProcedure: true,
        procedureSteps: {
          thirdStep: {
            isInitialStep: true,
            executionsNumber: 1,
            nextStepTrigger: ProcedureStepTrigger.AfterEach,
            nextStep: "{{$.procedureSteps.fourthStep}}"
          },
          fourthStep: {} 
        }
      },
    } 
  }
}


export const dynamicallyLoadedRecursiveTwoStepProcedureDeclaration = {
  isProcedure: true,
  procedureRef: {
    isProcedure: true,
    procedureSteps: {
      thirdStep: {
        isInitialStep: true,
        executionsNumber: 1,
        nextStepTrigger: ProcedureStepTrigger.AfterEach,
        nextStep: "{{$.procedureSteps.fourthStep}}"
      },
      fourthStep: {} 
    }
  },
  testMetadata: {
    firstStep: { numberOfPasses: 2 },
    secondStep: { numberOfPasses: 2 },
    thirdStep: { numberOfPasses: 2 },
    fourthStep: { numberOfPasses: 2 },
    executionOrder: [
      {
        passId: 1,
        key: 'firstStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 1,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1,key: 'thirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1,key: 'fourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      {
        passId: 2,
        key: 'firstStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 2,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1, key: 'thirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1, key: 'fourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      { key: null, phaseType: ProcedureExecutionPhase.ExecutionFinished }
    ]
  },
  procedureSteps: {
    firstStep: {
      isInitialStep: true,
      executionsNumber: 2,
      nextStepTrigger: ProcedureStepTrigger.AfterEach,
      nextStep: "{{$.procedureSteps.secondStep}}"
    },
    secondStep: {
      procedure: "{{$.procedureRef}}"
    } 
  }
}



export const dynamicallyLoadedRecursiveFourStepProcedureDeclaration = {
  isProcedure: true,
  executions: 2,
  procedureRef: {
    isProcedure: true,
    procedureSteps: {
      nestedThirdStep: {
        isInitialStep: true,
        executionsNumber: 2,
        nextStepTrigger: ProcedureStepTrigger.AfterEach,
        nextStep: "{{$.procedureSteps.nestedFourthStep}}"
      },
      nestedFourthStep: {} 
    }
  },
  testMetadata: {
    firstStep: { numberOfPasses: 2 },
    secondStep: { numberOfPasses: 4 },
    thirdStep: { numberOfPasses: 4 },
    fourthStep: { numberOfPasses: 4 },
    executionOrder: [
      {
        passId: 1,
        key: 'firstStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 2,
        key: 'firstStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 1,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1, key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      {
        passId: 2,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1, key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      {
        passId: 3,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1, key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      {
        passId: 4,
        key: 'secondStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        childs: [
          { passId: 1,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 1, key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedThirdStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
          { passId: 2,key: 'nestedFourthStep', phaseType: ProcedureExecutionPhase.BeforeStepExecution },
        ]
      },
      { key: null, phaseType: ProcedureExecutionPhase.NestedExecutionFinished },
      {
        passId: 1,
        key: 'thirdStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        expectedPayload: {}
      },
      {
        passId: 1,
        key: 'fourthStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 2,
        key: 'thirdStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        expectedPayload: {}
      },
      {
        passId: 2,
        key: 'fourthStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 3,
        key: 'thirdStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        expectedPayload: {}
      },
      {
        passId: 3,
        key: 'fourthStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      {
        passId: 4,
        key: 'thirdStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution,
        expectedPayload: {}
      },
      {
        passId: 4,
        key: 'fourthStep',
        phaseType: ProcedureExecutionPhase.BeforeStepExecution
      },
      { key: null, phaseType: ProcedureExecutionPhase.ExecutionFinished }
    ]
  },
  procedureSteps: {
    firstStep: {
      isInitialStep: true,
      executionsNumber: 2,
      nextStepTrigger: ProcedureStepTrigger.AfterAll,
      nextStep: "{{$.procedureSteps.secondStep}}"
    },
    secondStep: {
      procedure: "{{$.procedureRef}}",
      executionsNumber: "{{$.executions}}",
      nextStepTrigger: ProcedureStepTrigger.AfterAll,
      nextStep: "{{$.procedureSteps.thirdStep}}"
    },
    thirdStep: {
      payload: "{{$.procedureSteps.secondStep}}",
      nextStepTrigger: ProcedureStepTrigger.AfterEach,
      nextStep: "{{$.procedureSteps.fourthStep}}"
    },
    fourthStep: {}
  }
}