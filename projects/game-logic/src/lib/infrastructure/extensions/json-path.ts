import jsonPath from "jsonpath";
import { JsonPath, ResolvableReference } from "./types";

export class JsonPathResolver {

  static query(obj: any, expression: JsonPath) {
    return jsonPath.query(obj, expression, 1)[0];
  }

  static resolve<T extends object>(target: any, ctx: unknown, recursive: boolean = false): void {
    for (let key in target) {
      if (typeof target[key] === 'object' && !Array.isArray(target[key]) && recursive) {
        JsonPathResolver.resolve(target[key], ctx);
      } else if (typeof target[key] === 'string' && target[key].match(/\{\{([^{}]+)\}\}/g)?.length > 0) {
        
        const segments = target[key].match(/\{\{([^{}]+)\}\}/g);
        segments
          .map(m => m.slice(2, m.length - 2))
          .forEach(m => {
            const value = JsonPathResolver.query(ctx, m);
            if (value !== undefined) {
              target[key] = value;
            }
          });
      }
    }
  }

  static resolveInline<T>(ref: ResolvableReference<unknown>, ctx: unknown): T {
    if (typeof ref !== "string") {
      throw new Error("Provided ref is not a string")
    }

    let segment = ref.match(/\{\{([^{}]+)\}\}/g)[0];
    segment = segment.slice(2, segment.length - 2)
    return JsonPathResolver.query(ctx, segment) as T;

  }


  static isResolvableReference(e: ResolvableReference<unknown>): boolean {
    if (typeof e !== 'string') {
      return false;
    }

    return (e as JsonPath).match(/\{\{([^{}]+)\}\}/g).length > 0;
  }

}