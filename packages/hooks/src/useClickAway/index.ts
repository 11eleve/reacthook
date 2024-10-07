//监听目标元素外的点击事件。

import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import getDocumentOrShadow from '../utils/getDocumentOrShadow';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type DocumentEventKey = keyof DocumentEventMap;

export default function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: DocumentEventKey | DocumentEventKey[] = 'click',
) {
  //保持最新
  const onClickAwayRef = useLatest(onClickAway);

  useEffectWithTarget(
    () => {
      const handler = (event: any) => {
        //转成数组
        const targets = Array.isArray(target) ? target : [target];
        if (
          targets.some((item) => {
            //获取dom引用
            const targetElement = getTargetElement(item);
            // @ts-ignore
            //不存在或者事件在指定元素里面
            return !targetElement || targetElement.contains(event.target);
          })
        ) {
          return;
        }
        onClickAwayRef.current(event);
      };
      //获取事件引用，添加监听器
      const documentOrShadow = getDocumentOrShadow(target);

      const eventNames = Array.isArray(eventName) ? eventName : [eventName];

      eventNames.forEach((event) => documentOrShadow.addEventListener(event, handler));

      return () => {
        eventNames.forEach((event) => documentOrShadow.removeEventListener(event, handler));
      };
    },
    Array.isArray(eventName) ? eventName : [eventName],
    target,
  );
}
