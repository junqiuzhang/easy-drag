(function(a,h){typeof exports=="object"&&typeof module!="undefined"?module.exports=h():typeof define=="function"&&define.amd?define(h):(a=typeof globalThis!="undefined"?globalThis:a||self,a["easy-drag"]=h())})(this,function(){"use strict";const a=(s,t)=>{const e=s[0]+t[0],o=s[1]+t[1];return[e,o]},h=(s,t)=>{const e=t[0]-s[0],o=t[1]-s[1];return[e,o]},c=(s,t)=>{let e=s[0],o=s[1];return e=Math.max(e,t[2]),e=Math.min(e,t[3]),o=Math.max(o,t[0]),o=Math.min(o,t[1]),[e,o]},u=/translate\((\d+)px,\s*(\d+)px\)/,d=s=>{const t=s.match(u);let e=0,o=0;return t&&(e=Number(t[1]),o=Number(t[2])),[e,o]},f=(s,t)=>{const e=d(s),o=a(e,t),n=s.replace(u,"");return`translate(${o[0]}px, ${o[1]}px) ${n}`};class g{constructor({outerElement:t,element:e,innerElement:o}){this.translate=n=>{this.element.style.transform=f(this.startTransform,n)},this.onMouseDown=n=>{if(n.stopPropagation(),this.startPosition=[n.pageX,n.pageY],this.outerElement&&this.element){const i=this.outerElement.getBoundingClientRect(),r=this.element.getBoundingClientRect();this.startVectorRange=[i.top-r.top,i.bottom-r.bottom,i.left-r.left,i.right-r.right],this.startTransform=window.getComputedStyle(this.element).transform}this.onDragStart()},this.onMouseMove=n=>{if(this.startPosition){const i=[n.pageX,n.pageY],r=h(this.startPosition,i),m=c(r,this.startVectorRange);this.translate(m),this.onDrag(m)}},this.onMouseUp=n=>{this.startPosition&&this.onDragEnd(),this.startPosition=null},this.outerElement=t!=null?t:document.body,this.element=e,this.innerElement=o!=null?o:e,this.startPosition=null,this.startTransform="",this.startVectorRange=[],this.onDragStart=()=>{},this.onDrag=()=>{},this.onDragEnd=()=>{}}addEventListener(t){const{onDragStart:e,onDrag:o,onDragEnd:n}=t!=null?t:{};e&&(this.onDragStart=e),o&&(this.onDrag=o),n&&(this.onDragEnd=n),this.innerElement.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)}removeEventListener(){this.innerElement.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp)}}return g});