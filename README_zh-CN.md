# easy-drag

轻松实现拖拽效果

## 原理

监听 mousedown、mousemove、mouseup 事件，根据鼠标位移，设置元素的 transform 属性来实现拖拽效果

## 特性

1. JavaScript 实现，支持任何框架
2. transform 实现，支持任何定位方式的元素
3. 轻量，仅 2KB
4. 性能，硬件加速带来丝滑的拖拽体验
5. 支持PC和移动端

## 安装

```
# Yarn
yarn add easy-drag

# NPM
npm install --save easy-drag

```

## 使用

```ts
import enableDrag from "easy-drag";
const disableDrag = enableDrag(document.querySelector(".draggable"));
if ("what to disable drag") {
  disableDrag();
}
```

或

```ts
import enableDrag from "easy-drag";
const disableDrag = enableDrag(document.querySelector(".draggable"), {
  outerElement: document.body,
  innerElement: document.querySelector(".drag-icon"),
  onDragStart: (v) => {},
  onDrag: (v) => {},
  onDragEnd: (v) => {},
});
if ("what to disable drag") {
  disableDrag();
}
```

说明：

- outerElement: 控制拖拽范围的元素, 默认为`document.body`
- innerElement: 拖拽图标，例如：拖拽图标移动弹窗
- onDragStart: 拖拽开始的回调，参数 v 为元素拖拽位移向量（相对于初始位置）
- onDrag: 拖拽中的回调，参数 v 为元素拖拽位移向量（相对于初始位置）
- onDragEnd: 拖拽结束的回调，参数 v 为元素拖拽位移向量（相对于初始位置）

### 接口声明

```ts
import { TVector } from "./utils";
interface IOptions {
  /** 控制拖拽范围的元素 */
  outerElement?: HTMLElement;
  /** 拖拽图标 */
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
declare const enableDrag: (
  element: HTMLElement,
  options?: IOptions | undefined
) => () => void;
export default enableDrag;
```

## 开源协议

MIT
