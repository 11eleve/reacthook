//常见表单控件(通过 e.target.value 获取表单值) 的 onChange 跟 value 逻辑封装，支持自定义值转换和重置功能。

import { useCallback, useState } from 'react';
import useLatest from '../useLatest';
import { isFunction } from '../utils';

interface EventTarget<U> {
  target: {
    value: U;
  };
}

export interface Options<T, U> {
  initialValue?: T;
  transformer?: (value: U) => T;
}

function useEventTarget<T, U = T>(options?: Options<T, U>) {
  const { initialValue, transformer } = options || {};
  const [value, setValue] = useState(initialValue);

  const transformerRef = useLatest(transformer);

  //重置
  const reset = useCallback(() => setValue(initialValue), []);

  const onChange = useCallback((e: EventTarget<U>) => {
    //获取到value
    const _value = e.target.value;
    //转换值
    if (isFunction(transformerRef.current)) {
      return setValue(transformerRef.current(_value));
    }
    // U转成T类型
    return setValue(_value as unknown as T);
  }, []);

  return [
    value,
    {
      onChange,
      reset,
    },
  ] as const;
}

export default useEventTarget;
