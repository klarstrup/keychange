import { forEachObjIndexed, pick, equals } from 'ramda';

export default (oldProps = {}, newProps = {}, propsHandlersMap = {}) =>
  forEachObjIndexed((handler, keysString) => {
    const keys = keysString.split(',');
    if (!equals(pick(keys)(oldProps), pick(keys)(newProps))) {
      handler(newProps);
    }
  })(propsHandlersMap);
