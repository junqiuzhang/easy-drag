/**
 * 向量类型
 */
declare type TVector = [number, number];
interface IOptions {
    /** 拖拽范围元素 */
    outerElement?: HTMLElement;
    /** 拖拽图标元素 */
    innerElement?: HTMLElement;
    /** 拖拽开始的回调 */
    onDragStart?: (v: TVector) => void;
    /** 拖拽中的回调 */
    onDrag?: (v: TVector) => void;
    /** 拖拽结束的回调 */
    onDragEnd?: (v: TVector) => void;
}
/**
 * 用transform属性轻松实现拖拽效果
 */
declare const enableDrag: (element: HTMLElement, options?: IOptions | undefined) => () => void;
export default enableDrag;
