declare type TVector = [number, number];
interface IOptions {
    /** 拖拽范围 */
    outerElement?: HTMLElement;
    /** 监听拖拽事件的元素 */
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
declare class EasyDrag {
    outerElement: HTMLElement;
    element: HTMLElement;
    innerElement: HTMLElement;
    startPosition: TVector | null;
    startVectorRange: number[];
    startTransform: string;
    onDragStart: () => void;
    onDrag: (v: TVector) => void;
    onDragEnd: () => void;
    constructor(element: HTMLElement, options?: IOptions);
    translate: (v: TVector) => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseUp: (e: MouseEvent) => void;
    addEventListener(): void;
    removeEventListener(): void;
}
export default EasyDrag;
