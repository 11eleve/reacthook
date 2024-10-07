//只在组件初始化时执行的 Hook

import { useEffect } from 'react';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

const useMount = (fn: () => void) => {
  //判断环境
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
  }

  //依靠[]在初始时调用
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
