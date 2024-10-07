//useUpdate 会返回一个函数，调用该函数会强制组件重新渲染

import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState({});

  //setState强制渲染
  return useCallback(() => setState({}), []);
};

export default useUpdate;
