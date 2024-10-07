//在组件卸载（unmount）时执行的 Hook

import { useEffect } from 'react';
import useLatest from '../useLatest';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

const useUnmount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  //第一个箭头函数返回另一个箭头函数，防止在挂载时调用
  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};

export default useUnmount;
