//将状态存储在 sessionStorage 中的 Hook

import { createUseStorageState } from '../createUseStorageState';
import isBrowser from '../utils/isBrowser';

const useSessionStorageState = createUseStorageState(() =>
  isBrowser ? sessionStorage : undefined,
);

export default useSessionStorageState;
