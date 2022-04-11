import enableDrag from '../src';
import './index.css';

const dragEle = document.querySelector('.draggable') as HTMLElement;
enableDrag(dragEle);