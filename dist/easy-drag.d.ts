export declare type TVector = [number, number];
interface IProps {
    /** 拖拽范围 */
    outerElement?: HTMLElement;
    /** 拖拽移动的元素 */
    element: HTMLElement;
    /** 监听拖拽事件的元素 */
    innerElement?: HTMLElement;
}
interface IAddEventListenerParam {
    onDragStart: () => void;
    onDrag: (v: TVector) => void;
    onDragEnd: () => void;
}
/**
 * 用transform属性轻松实现拖拽效果
 * 可设置拖拽范围、拖拽移动的元素、监听拖拽事件的元素
 */
declare class EasyDrag {
    constructor({ outerElement, element, innerElement }: IProps);
    outerElement: HTMLElement;
    element: HTMLElement;
    innerElement: HTMLElement;
    startPosition: TVector | null;
    startVectorRange: number[];
    startTransform: string;
    onDragStart: () => void;
    onDrag: (v: TVector) => void;
    onDragEnd: () => void;
    translate: (v: TVector) => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseUp: (e: MouseEvent) => void;
    addEventListener(listeners?: IAddEventListenerParam): void;
    removeEventListener(): void;
}
export default EasyDrag;
