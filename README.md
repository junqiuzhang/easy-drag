# easy-drag

[中文文档](https://github.com/junqiuzhang/easy-drag/blob/master/README_zh-CN.md)

Easy to realize drag effect

## Principle

Listen to `mousedown`, `mousemove`, and `mouseup` events, and set the element's transform property to drag and drop according to the mouse position

## Feature

1. Use JavaScript implementation, support any framework
2. Use `transform` property implementation that supports elements in any positioning mode
3. Lightweight, only 2KB
4. Performance, hardware acceleration for a silky drag experience

## Install

```
# Yarn
yarn add easy-drag

# NPM
npm install --save easy-drag

```

## Usage

```ts
import enableDrag from "easy-drag";
const disableDrag = enableDrag(document.querySelector(".draggable"));
if ("what to disable drag") {
  disableDrag();
}
```

Or

```ts
import enableDrag from "easy-drag";
const disableDrag = enableDrag(document.querySelector(".draggable"), {
  outerElement: document.body,
  innerElement: document.querySelector(".drag-icon"),
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
});
if ("what to disable drag") {
  disableDrag();
}
```

Description:

- outerElement: drag range element, default document.body
- innerElement: drag icon element, application scenario: Pop-ups need to be draggable, but only the title area can be dragged
- onDragStart: callback on drag start, parameter v is element drag translate vector (relative to initial position)
- onDrag: callback in dragging, parameter v is element drag translate vector (relative to initial position)
- onDragEnd: callback on drag end, parameter v is element drag translate vector (relative to initial position)

### 接口声明

```ts
import { TVector } from "./utils";
interface IOptions {
  /** element that control drag range */
  outerElement?: HTMLElement;
  /** element that to drag */
  innerElement?: HTMLElement;
  /** callback on drag start */
  onDragStart?: (v: TVector) => void;
  /** callback in dragging */
  onDrag?: (v: TVector) => void;
  /** callback on drag end */
  onDragEnd?: (v: TVector) => void;
}
/**
 * use transform easy to realize drag effect
 */
declare const enableDrag: (
  element: HTMLElement,
  options?: IOptions | undefined
) => () => void;
export default enableDrag;
```

## License

MIT
