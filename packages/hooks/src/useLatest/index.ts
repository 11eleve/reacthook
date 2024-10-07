//返回当前最新值的 Hook，可以避免旧值

import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  //每次渲染更新
  ref.current = value;

  return ref;
}

export default useLatest;
