//`useCreation` 是 `useMemo` 或 `useRef` 的替代品。

import type { DependencyList } from 'react';
import { useRef } from 'react';
//判断是否相同
import depsAreSame from '../utils/depsAreSame';

export default function useCreation<T>(factory: () => T, deps: DependencyList) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });
  //初始以及依赖变化时
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj as T;
}
