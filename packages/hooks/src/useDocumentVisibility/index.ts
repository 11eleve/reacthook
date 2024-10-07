//监听页面是否可见

import { useState } from 'react';
import useEventListener from '../useEventListener';
import isBrowser from '../utils/isBrowser';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

const getVisibility = () => {
  if (!isBrowser) {
    return 'visible';
  }
  return document.visibilityState;
};

function useDocumentVisibility(): VisibilityState {
  const [documentVisibility, setDocumentVisibility] = useState(() => getVisibility());

  //改变时则获取状态，set进去并返回
  useEventListener(
    'visibilitychange',
    () => {
      setDocumentVisibility(getVisibility());
    },
    {
      target: () => document,
    },
  );

  return documentVisibility;
}

export default useDocumentVisibility;
