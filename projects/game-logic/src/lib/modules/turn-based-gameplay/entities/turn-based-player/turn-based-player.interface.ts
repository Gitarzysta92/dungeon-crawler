
export interface IPlayerController {
  waitForActivity(): (s: unknown) => Promise<void>;
  isAnyActivityAvailable(): boolean;
}