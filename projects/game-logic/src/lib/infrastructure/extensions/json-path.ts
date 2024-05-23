import jsonPath from "jsonpath";
import { JsonPath } from "./types";

export class JsonPathResolver {

  static query(obj: any, expression: JsonPath) {
    return jsonPath.query(obj, expression);
  }

  static resolve<T extends object>(obj: any, ctx: unknown): T {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        JsonPathResolver.resolve(obj[key], ctx);
      } else if (typeof obj[key] === 'string' && obj[key].match(/\{\{([^{}]+)\}\}/g).length > 0) {
        
        obj[key]
          .match(/\{\{([^{}]+)\}\}/g)
          .map(m => m.replace("{{", "").replace("}}"))
          .forEach(m => {
            obj[key] = JsonPathResolver.query(ctx, m);
          });
      }
    }
    return obj;
  }
}