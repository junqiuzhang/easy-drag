const addVector = (vector1, vector2) => {
  const x = vector1[0] + vector2[0];
  const y = vector1[1] + vector2[1];
  return [x, y];
};
const diffVector = (vector1, vector2) => {
  const x = vector2[0] - vector1[0];
  const y = vector2[1] - vector1[1];
  return [x, y];
};
const formatVector = (vector, range) => {
  let x = vector[0];
  let y = vector[1];
  x = Math.max(x, range[2]);
  x = Math.min(x, range[3]);
  y = Math.max(y, range[0]);
  y = Math.min(y, range[1]);
  return [x, y];
};
const setTranslatePosition = (transform, vector) => {
  return `translate3d(${vector[0]}px, ${vector[1]}px, 0px) ${transform.replace("none", "")}`;
};
const getPosition = (e) => {
  if (e instanceof MouseEvent) {
    return [e.pageX, e.pageY];
  }
  const touch = e.touches[0];
  return [touch.pageX, touch.pageY];
};
const isMobile = () => /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);
const enableDrag = (element, options) => {
  let { outerElement, innerElement, onDragStart, onDrag, onDragEnd } = options != null ? options : {};
  let startTransform = window.getComputedStyle(element).transform;
  let startPosition = null;
  let endPosition = null;
  let draggingMoveVectorRange = null;
  let draggedMoveVector = [0, 0];
  let draggingMoveVector = [0, 0];
  outerElement = outerElement != null ? outerElement : document.body;
  element = element;
  innerElement = innerElement != null ? innerElement : element;
  const onMouseDown = (e) => {
    e.stopPropagation();
    startPosition = getPosition(e);
    if (outerElement && element && innerElement) {
      const outerElementRect = outerElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      draggingMoveVectorRange = [
        outerElementRect.top - elementRect.top,
        outerElementRect.bottom - elementRect.bottom,
        outerElementRect.left - elementRect.left,
        outerElementRect.right - elementRect.right
      ];
    }
    typeof onDragStart === "function" && onDragStart(draggedMoveVector);
  };
  const onMouseMove = (e) => {
    if (startPosition && draggingMoveVectorRange) {
      endPosition = getPosition(e);
      const currentMoveVector = formatVector(diffVector(startPosition, endPosition), draggingMoveVectorRange);
      draggingMoveVector = addVector(draggedMoveVector, currentMoveVector);
      element.style.transform = setTranslatePosition(startTransform, draggingMoveVector);
      typeof onDrag === "function" && onDrag(draggingMoveVector);
    }
  };
  const onMouseUp = (e) => {
    if (startPosition && draggingMoveVectorRange) {
      draggedMoveVector = draggingMoveVector;
      typeof onDragEnd === "function" && onDragEnd(draggedMoveVector);
    }
    startPosition = null;
  };
  const addEventListener = () => {
    if (innerElement) {
      if (isMobile()) {
        innerElement.addEventListener("touchstart", onMouseDown);
        document.addEventListener("touchmove", onMouseMove);
        document.addEventListener("touchend", onMouseUp);
        return;
      }
      innerElement.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };
  const removeEventListener = () => {
    if (innerElement) {
      if (isMobile()) {
        innerElement.removeEventListener("touchstart", onMouseDown);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", onMouseUp);
        return;
      }
      innerElement.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  };
  addEventListener();
  return removeEventListener;
};
export { enableDrag as default };
