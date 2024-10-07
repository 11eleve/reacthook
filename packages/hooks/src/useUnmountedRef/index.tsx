//获取当前组件是否已经卸载的 Hook

import { useEffect, useRef } from 'react';

const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  //利用useEffect在依赖[]时只在挂载与卸载执行的特点
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

export default useUnmountedRef;
