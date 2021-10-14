# easy-drag

[中文文档](https://github.com/junqiuzhang/easy-drag/blob/master/README_zh-CN.md)

Easy to realize drag and drop effect

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
new EasyDrag(document.querySelector(".draggable"));
```

Or

```ts
new EasyDrag(document.querySelector(".draggable"), {
  outerElement: document.body,
  innerElement: document.querySelector(".drag-icon"),
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
});
```

Description:

- outerElement: drag range
- innerElement: drag icon
- onDragStart: start callback
- onDrag: start callback
- onDragEnd: end callback
