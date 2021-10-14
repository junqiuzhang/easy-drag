/**
 * 向量类型
 */
declare type TVector = [number, number];
/**
 * 向量范围
 */
declare type TVectorRange = [number, number, number, number];
interface IOptions {
  /** 拖拽范围元素 */
  outerElement?: HTMLElement;
  /** 拖拽图标元素 */
  innerElement?: HTMLElement;
  /** 拖拽开始的回调 */
  onDragStart: () => void;
  /** 拖拽中的回调 */
  onDrag: (v: TVector) => void;
  /** 拖拽结束的回调 */
  onDragEnd: () => void;
}
/**
 * 用transform属性轻松实现拖拽效果
 * 可设置拖拽范围、拖拽移动的元素、监听拖拽事件的元素
 */
declare const enableDrag: (
  element: HTMLElement,
  options?: IOptions | undefined
) => () => void;
export default enableDrag;
