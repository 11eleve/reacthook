//保存上一次状态的 Hook

import { useRef } from 'react';

//泛型类型
export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean;

const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b);

function usePrevious<T>(
  state: T,
  //自定义更新，默认为defaultShouldUpdate
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
): T | undefined {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}

export default usePrevious;
