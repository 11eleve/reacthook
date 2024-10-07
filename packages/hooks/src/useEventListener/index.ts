//优雅的使用 addEventListener

import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type noop = (...p: any) => void;

export type Target = BasicTarget<HTMLElement | Element | Window | Document>;

type Options<T extends Target = Target> = {
  target?: T;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

//多种情况重载
/*
 * @parma eventName ： 时间名
 * @parma handler : 事件处理函数
 * @parma options: 配置
*/
function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: Options<HTMLElement>,
): void;
function useEventListener<K extends keyof ElementEventMap>(
  eventName: K,
  handler: (ev: ElementEventMap[K]) => void,
  options?: Options<Element>,
): void;
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (ev: DocumentEventMap[K]) => void,
  options?: Options<Document>,
): void;
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: Options<Window>,
): void;
function useEventListener(eventName: string, handler: noop, options: Options): void;

function useEventListener(eventName: string, handler: noop, options: Options = {}) {
  const handlerRef = useLatest(handler);

  useEffectWithTarget(
    () => {
      //获取元素
      const targetElement = getTargetElement(options.target, window);
      if (!targetElement?.addEventListener) {
        return;
      }

      //事件处理
      const eventListener = (event: Event) => {
        return handlerRef.current(event);
      };

      //添加监听
      targetElement.addEventListener(eventName, eventListener, {
        capture: options.capture,
        once: options.once,
        passive: options.passive,
      });

      return () => {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture,
        });
      };
    },
    //依赖
    [eventName, options.capture, options.once, options.passive],
    options.target,
  );
}

export default useEventListener;
