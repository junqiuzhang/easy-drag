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
const enableDrag = (element: HTMLElement, options?: IOptions) => {
  let { outerElement, innerElement, onDragStart, onDrag, onDragEnd } =
    options ?? {};
  // 拖拽开始时的鼠标位置
  let startPosition: TVector | null = null;
  // 拖拽开始时的鼠标移动范围
  let startVectorRange: TVectorRange | null = null;
  // 拖拽开始时的元素位移
  let startTransform = "";
  // 拖拽范围元素
  outerElement = outerElement ?? document.body;
  // 拖拽的元素
  element = element;
  // 拖拽图标元素
  innerElement = innerElement ?? element;

  const translate = (v: TVector) => {
    element.style.transform = setTranslatePosition(startTransform, v);
  };
  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    // 记录当前鼠标位置
    startPosition = [e.pageX, e.pageY];

    if (outerElement && element && innerElement) {
      // 记录可拖拽范围
      const outerElementRect = outerElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      startVectorRange = [
        outerElementRect.top - elementRect.top,
        outerElementRect.bottom - elementRect.bottom,
        outerElementRect.left - elementRect.left,
        outerElementRect.right - elementRect.right,
      ];
      // 记录当前元素transform，getComputedStyle返回值为matrix3d形式
      startTransform = window.getComputedStyle(element).transform;
    }
    typeof onDragStart === "function" && onDragStart();
  };
  const onMouseMove = (e: MouseEvent) => {
    if (startPosition && startVectorRange) {
      // 当前鼠标位置
      const currentPosition: TVector = [e.pageX, e.pageY];
      // 位移向量
      const moveVector = diffVector(startPosition, currentPosition);
      // 可移动范围内的位移向量
      const formattedVector = formatVector(moveVector, startVectorRange);
      translate(formattedVector);
      typeof onDrag === "function" && onDrag(formattedVector);
    }
  };
  const onMouseUp = (e: MouseEvent) => {
    if (startPosition && startVectorRange) {
      typeof onDragEnd === "function" && onDragEnd();
    }
    startPosition = null;
  };
  const addEventListener = () => {
    if (innerElement) {
      innerElement.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };
  const removeEventListener = () => {
    if (innerElement) {
      innerElement.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  };
  addEventListener();
  return removeEventListener;
};
export default enableDrag;
