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
const TranslateRegExp = /translate\((\d+)px,\s*(\d+)px\)/;
const getTranslatePosition = (transform) => {
  const matchObj = transform.match(TranslateRegExp);
  let x = 0;
  let y = 0;
  if (matchObj) {
    x = Number(matchObj[1]);
    y = Number(matchObj[2]);
  }
  return [x, y];
};
const setTranslatePosition = (transform, vector) => {
  const translatePosition = getTranslatePosition(transform);
  const currentTranslatePosition = addVector(translatePosition, vector);
  const tempTransform = transform.replace(TranslateRegExp, "").replace("none", "");
  return `translate(${currentTranslatePosition[0]}px, ${currentTranslatePosition[1]}px) ${tempTransform}`;
};
class EasyDrag {
  constructor(element, options) {
    this.translate = (v) => {
      this.element.style.transform = setTranslatePosition(this.startTransform, v);
    };
    this.onMouseDown = (e) => {
      e.stopPropagation();
      this.startPosition = [e.pageX, e.pageY];
      if (this.outerElement && this.element) {
        const outerElementRect = this.outerElement.getBoundingClientRect();
        const elementRect = this.element.getBoundingClientRect();
        this.startVectorRange = [
          outerElementRect.top - elementRect.top,
          outerElementRect.bottom - elementRect.bottom,
          outerElementRect.left - elementRect.left,
          outerElementRect.right - elementRect.right
        ];
        this.startTransform = window.getComputedStyle(this.element).transform;
      }
      this.onDragStart();
    };
    this.onMouseMove = (e) => {
      if (this.startPosition) {
        const currentPosition = [e.pageX, e.pageY];
        const moveVector = diffVector(this.startPosition, currentPosition);
        const formattedVector = formatVector(moveVector, this.startVectorRange);
        this.translate(formattedVector);
        this.onDrag(formattedVector);
      }
    };
    this.onMouseUp = (e) => {
      if (this.startPosition) {
        this.onDragEnd();
      }
      this.startPosition = null;
    };
    const { outerElement, innerElement, onDragStart, onDrag, onDragEnd } = options != null ? options : {};
    this.outerElement = outerElement != null ? outerElement : document.body;
    this.element = element;
    this.innerElement = innerElement != null ? innerElement : element;
    this.startPosition = null;
    this.startVectorRange = [];
    this.startTransform = "";
    this.onDragStart = onDragStart != null ? onDragStart : () => {
    };
    this.onDrag = onDrag != null ? onDrag : () => {
    };
    this.onDragEnd = onDragEnd != null ? onDragEnd : () => {
    };
    this.addEventListener();
  }
  addEventListener() {
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
export { EasyDrag as default };
