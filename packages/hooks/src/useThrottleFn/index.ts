//实现节流

import { throttle } from 'lodash-es';
import { useMemo } from 'react';
import useLatest from '../useLatest';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  //判断环境
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useThrottleFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  //保持最新
  const fnRef = useLatest(fn);

  //默认时长
  const wait = options?.wait ?? 1000;

  //持久化
  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );

  //卸载
  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
