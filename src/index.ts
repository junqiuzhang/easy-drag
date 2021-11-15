import {
  TVector,
  TVectorRange,
  addVector,
  diffVector,
  formatVector,
  setTranslatePosition,
} from "./utils";
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
const enableDrag = (element: HTMLElement, options?: IOptions) => {
  let { outerElement, innerElement, onDragStart, onDrag, onDragEnd } =
    options ?? {};
  // 元素的transform属性值，getComputedStyle返回值为matrix3d形式
  let startTransform = window.getComputedStyle(element).transform;
  // 拖拽开始时的鼠标位置
  let startPosition: TVector | null = null;
  // 拖拽结束时的鼠标位置
  let endPosition: TVector | null = null;
  // 拖拽位移向量范围
  let draggingMoveVectorRange: TVectorRange | null = null;
  // 元素位移向量（拖拽后修改）
  let draggedMoveVector: TVector = [0, 0];
  // 元素位移向量（拖拽时修改）
  let draggingMoveVector: TVector = [0, 0];
  // 拖拽范围元素
  outerElement = outerElement ?? document.body;
  // 拖拽的元素
  element = element;
  // 拖拽图标元素
  innerElement = innerElement ?? element;
  // 能否支持触摸 
  let canTouch: boolean = "ontouchstart" in window;
  
  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    const target=canTouch?e.targetTouches[0]:e;
    // 记录当前鼠标位置
    startPosition = [target.pageX,target.pageY];

    if (outerElement && element && innerElement) {
      // 记录拖拽位移向量范围
      const outerElementRect = outerElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      draggingMoveVectorRange = [
        outerElementRect.top - elementRect.top,
        outerElementRect.bottom - elementRect.bottom,
        outerElementRect.left - elementRect.left,
        outerElementRect.right - elementRect.right,
      ];
    }
    typeof onDragStart === "function" && onDragStart(draggedMoveVector);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (startPosition && draggingMoveVectorRange) {
      const target=canTouch?e.targetTouches[0]:e;
      // 当前鼠标位置
      endPosition = [target.pageX, target.pageY];
      // 本次的拖拽位移向量
      const currentMoveVector = formatVector(
        diffVector(startPosition, endPosition),
        draggingMoveVectorRange
      );
      // 之前的拖拽位移向量+本次的拖拽位移向量
      draggingMoveVector = addVector(draggedMoveVector, currentMoveVector);
      element.style.transform = setTranslatePosition(
        startTransform,
        draggingMoveVector
      );
      typeof onDrag === "function" && onDrag(draggingMoveVector);
    }
  };
  const onMouseUp = (e: MouseEvent) => {
    if (startPosition && draggingMoveVectorRange) {
      draggedMoveVector = draggingMoveVector;
      typeof onDragEnd === "function" && onDragEnd(draggedMoveVector);
    }
    startPosition = null;
  };
  const addEventListener = () => {
    if (innerElement) {
      if (canTouch) {
        innerElement.addEventListener("touchstart", onMouseDown);
        document.addEventListener("touchmove", onMouseMove);
        document.addEventListener("touchend", onMouseUp);
      }else{
        innerElement.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }

    }
  };
  const removeEventListener = () => {
    if (innerElement) {
      if (canTouch) {
        innerElement.removeEventListener("touchstart", onMouseDown);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", onMouseUp);
      }else{
        innerElement.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
    }
  };
  addEventListener();
  return removeEventListener;
};
export default enableDrag;
