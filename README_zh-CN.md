# easy-drag

轻松实现拖拽效果

## 原理

监听 mousedown、mousemove、mouseup 事件，根据鼠标位移，设置元素的 transform 属性来实现拖拽效果

## 特性

1. JavaScript 实现，支持任何框架
2. transform 实现，支持任何定位方式的元素
3. 轻量，仅 2KB
4. 性能，硬件加速带来丝滑的拖拽体验

## 安装

```
# Yarn
yarn add easy-drag

# NPM
npm install --save easy-drag

```

## 例子

```ts
new EasyDrag({
  element: document.querySelector(".draggable"),
}).addEventListener();
```
