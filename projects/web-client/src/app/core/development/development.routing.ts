import { RoutesAdapter } from "src/app/aspects/navigation/services/system-routes";

export namespace Development {
  export const ROOT_PATH = 'development';
  export const routes = new RoutesAdapter({
    root: { path: "", pathMatch: "full" }
  });
}