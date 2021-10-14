import {
  TVector,
  addVector,
  diffVector,
  formatVector,
  setTranslatePosition,
} from "./utils";
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
class EasyDrag {
  constructor({ outerElement, element, innerElement }: IProps) {
    this.outerElement = outerElement ?? document.body;
    this.element = element;
    this.innerElement = innerElement ?? element;
    this.startPosition = null;
    this.startTransform = "";
    this.startVectorRange = [];
    this.onDragStart = () => {};
    this.onDrag = () => {};
    this.onDragEnd = () => {};
  }
  outerElement: HTMLElement;
  element: HTMLElement;
  innerElement: HTMLElement;
  startPosition: TVector | null;
  startVectorRange: number[];
  startTransform: string;
  onDragStart: () => void;
  onDrag: (v: TVector) => void;
  onDragEnd: () => void;
  translate = (v: TVector) => {
    this.element.style.transform = setTranslatePosition(this.startTransform, v);
  };
  onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    // 记录当前鼠标位置
    this.startPosition = [e.pageX, e.pageY];
    if (this.outerElement && this.element) {
      // 记录可拖拽范围
      const outerElementRect = this.outerElement.getBoundingClientRect();
      const elementRect = this.element.getBoundingClientRect();
      this.startVectorRange = [
        outerElementRect.top - elementRect.top,
        outerElementRect.bottom - elementRect.bottom,
        outerElementRect.left - elementRect.left,
        outerElementRect.right - elementRect.right,
      ];
      // 记录当前元素transform
      this.startTransform = window.getComputedStyle(this.element).transform;
    }
    this.onDragStart();
  };
  onMouseMove = (e: MouseEvent) => {
    if (this.startPosition) {
      // 当前鼠标位置
      const currentPosition: TVector = [e.pageX, e.pageY];
      // 位移向量
      const moveVector = diffVector(this.startPosition, currentPosition);
      // 可移动范围内的位移向量
      const formattedVector = formatVector(moveVector, this.startVectorRange);
      this.translate(formattedVector);
      this.onDrag(formattedVector);
    }
  };
  onMouseUp = (e: MouseEvent) => {
    if (this.startPosition) {
      this.onDragEnd();
    }
    this.startPosition = null;
  };
  addEventListener(listeners?: IAddEventListenerParam) {
    const { onDragStart, onDrag, onDragEnd } = listeners ?? {};
    if (onDragStart) this.onDragStart = onDragStart;
    if (onDrag) this.onDrag = onDrag;
    if (onDragEnd) this.onDragEnd = onDragEnd;
    this.innerElement.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }
  removeEventListener() {
    this.innerElement.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }
}
export default EasyDrag;