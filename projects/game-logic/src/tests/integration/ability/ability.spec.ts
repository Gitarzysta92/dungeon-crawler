import { ProcedureExecutionPhase } from "../../../lib/base/procedure/procedure.constants";
import { ProcedureFactory } from "../../../lib/base/procedure/procedure.factory";
import { IProcedure, IProcedureDeclaration } from "../../../lib/base/procedure/procedure.interface";
import { ProcedureService } from "../../../lib/base/procedure/procedure.service";
import { MixinBase } from "../../../lib/infrastructure/mixin/mixin";


describe('ability', () => {
  // const procedureService = new ProcedureService();

  // procedureService.registerStepFactory({ validate: d => !d.procedure, create: d => new ProcedureTestStepMock(d) });
  // procedureService.registerStepFactory({ validate: d => !!d.procedure, create: (d: any) => new ProcedureTestRecursiveStepMock(d) });

  // const procedurePerformer = new ProcedurePerformerMock();
  // const procedureContext = {
  //   activityPerformer: { name: "activity-performer" },
  //   subject: {
  //     abilityParameters: {
  //       repetitions: {
  //         value: 0
  //       }
  //     }
  //   }
  // }
  // const procedureFactory = new ProcedureFactory(procedureService);
  // const Procedure = procedureFactory.create(MixinBase);
  // let procedure: IProcedure;

  // it("it should run basicZeroStepProcedureDeclaration and throw an error", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(basicZeroStepProcedureDeclaration));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   const executionContext = Object.assign({ performer: procedurePerformer }, context)
    
  //   expect(async () => {
  //     const x = await procedure.execute(executionContext)
  //     await x.next()
  //   }).rejects.toThrow()
  //   done()
  // });

  // it("it should run basicSingleStepProcedureDeclaration and return aggregated data", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(basicSingleStepProcedureDeclaration));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   const executionContext = Object.assign({ performer: procedurePerformer }, context)
  //   await performTest(procedure, executionContext, procedureDeclaration);
  //   done()
  // });

  // it("it should run basicTwoStepProcedureDeclaration and return aggregated data", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(basicTwoStepProcedureDeclaration));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   const executionContext = Object.assign({ performer: procedurePerformer }, context)
  //   await performTest(procedure, executionContext, procedureDeclaration);
  //   done()
  // });


  // it("it should run basicTwoStepHorizontalProcedureDeclaration and return aggregated data", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(basicTwoStepHorizontalProcedureDeclaration));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   const executionContext = Object.assign({ performer: procedurePerformer }, context);
  //   await performTest(procedure, executionContext, procedureDeclaration);
  //   done()
  // });


  // it("it should run basicRecursiveTwoStepProcedureDeclaration and return aggregated data", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(basicRecursiveTwoStepProcedureDeclaration));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   procedure.procedureSteps.secondStep.procedure = new Procedure(procedure.procedureSteps.secondStep.procedure);
  //   const executionContext = Object.assign({ performer: procedurePerformer }, context);
  //   await performTest(procedure, executionContext, procedureDeclaration);
  //   done()
  // });


  // it("it should run dynamicallyLoadedRecursiveTwoStepProcedureDeclaration and return aggregated data", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(dynamicallyLoadedRecursiveTwoStepProcedureDeclaration));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   const executionContext = Object.assign({
  //     performer: procedurePerformer,
  //     procedureRef: new Procedure(procedureDeclaration.procedureRef)
  //   }, context);
  //   await performTest(procedure, executionContext, procedureDeclaration);
  //   done()
  // });


  // it("it should run dynamicallyLoadedRecursiveFourStepProcedureDeclaration and return aggregated data", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(dynamicallyLoadedRecursiveFourStepProcedureDeclaration));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   const executionContext = Object.assign({
  //     performer: procedurePerformer,
  //     procedureRef: new Procedure(procedureDeclaration.procedureRef),
  //     executions: dynamicallyLoadedRecursiveFourStepProcedureDeclaration.executions
  //   }, context);
  //   await performTest(procedure, executionContext, procedureDeclaration);
  //   done()
  // });


  // it("it should run basicTwoStepProcedureDeclarationWithEarlyResolve and early resolve", async done => {
  //   const context = JSON.parse(JSON.stringify(procedureContext));
  //   const declaration = JSON.parse(JSON.stringify(basicTwoStepProcedureDeclarationWithEarlyResolve));
  //   const procedureDeclaration = Object.assign(declaration, context);
  //   procedure = new Procedure(procedureDeclaration);
  //   const executionContext = Object.assign({ performer: procedurePerformer }, context);
    
  //   const executionOrderProvider = new ExecutionOrderProvider(procedureDeclaration)
  //   for await (let phase of procedure.execute(executionContext)) {
  //     const expectedPhase = executionOrderProvider.next();
  //     expect(phase.executionPhaseType).toEqual(expectedPhase.type);
  //     expect(phase.step?.key ?? phase.step).toEqual(expectedPhase.stepKey);
  //     if (phase.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished) {
  //       compareAggregatedData(expectedPhase.aggregatedData, phase.aggregatedData as any)
  //     }
  //   }
    
  //   for (let stepKey in procedureDeclaration.procedureSteps) {
  //     const step = procedure.procedureSteps[stepKey] as ProcedureTestStepMock;
  //     expect(step.perform.mock.calls).toHaveLength(procedureDeclaration.testMetadata[step.key].numberOfPasses)
  //   }

  //   done()
  // });



});


// async function performTest(
//   procedure: IProcedure,
//   executionContext: any,
//   procedureDeclaration: IProcedureDeclaration & any
// ) {
//   const executionOrderProvider = new ExecutionOrderProvider(procedureDeclaration)
//   for await (let phase of procedure.execute(executionContext)) {
//     const expectedPhase = executionOrderProvider.next();
//     expect(phase.executionPhaseType).toEqual(expectedPhase.type);
//     expect(phase.step?.key ?? phase.step).toEqual(expectedPhase.stepKey);
//     if (phase.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished) {
//       compareAggregatedData(expectedPhase.aggregatedData, phase.aggregatedData as any)
//     }
//   }
  
//   for (let stepKey in procedureDeclaration.procedureSteps) {
//     const step = procedure.procedureSteps[stepKey] as ProcedureTestStepMock;
//     expect(step.perform.mock.calls).toHaveLength(procedureDeclaration.testMetadata[step.key].numberOfPasses)
//   }
// }