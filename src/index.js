import { forEachObjIndexed, pick, equals, curry } from "ramda";

export default curry((propsHandlersMap, oldProps, newProps) =>
  forEachObjIndexed((handler, keysString) => {
    const keys = keysString.split(",");
    if (!equals(pick(keys)(oldProps), pick(keys)(newProps))) {
      handler(newProps);
    }
  })(propsHandlersMap)
);
