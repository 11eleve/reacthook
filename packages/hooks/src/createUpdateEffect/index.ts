import { useRef } from 'react';
import type { useEffect, useLayoutEffect } from 'react';


//对useEffect与useLayoutEffect进行封装

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: EffectHookType) => EffectHookType =
  (hook) => (effect, deps) => {
    const isMounted = useRef(false);

    //挂载和卸载时触发
    hook(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    //只在更新时触发副作用
    hook(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return effect();
      }
    }, deps);
  };

export default createUpdateEffect;
