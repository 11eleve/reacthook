//用来处理防抖值的 Hook

import { useEffect, useState } from 'react';
import useDebounceFn from '../useDebounceFn';
import type { DebounceOptions } from './debounceOptions';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  //监听变化，根据options执行
  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}

export default useDebounce;
