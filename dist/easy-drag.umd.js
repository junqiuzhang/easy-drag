(function(a,h){typeof exports=="object"&&typeof module!="undefined"?module.exports=h():typeof define=="function"&&define.amd?define(h):(a=typeof globalThis!="undefined"?globalThis:a||self,a["easy-drag"]=h())})(this,function(){"use strict";const a=(n,t)=>{const s=n[0]+t[0],e=n[1]+t[1];return[s,e]},h=(n,t)=>{const s=t[0]-n[0],e=t[1]-n[1];return[s,e]},p=(n,t)=>{let s=n[0],e=n[1];return s=Math.max(s,t[2]),s=Math.min(s,t[3]),e=Math.max(e,t[0]),e=Math.min(e,t[1]),[s,e]},l=/translate\((\d+)px,\s*(\d+)px\)/,g=n=>{const t=n.match(l);let s=0,e=0;return t&&(s=Number(t[1]),e=Number(t[2])),[s,e]},E=(n,t)=>{const s=g(n),e=a(s,t),m=n.replace(l,"").replace("none","");return`translate(${e[0]}px, ${e[1]}px) ${m}`};class M{constructor(t,s){this.translate=o=>{this.element.style.transform=E(this.startTransform,o)},this.onMouseDown=o=>{if(o.stopPropagation(),this.startPosition=[o.pageX,o.pageY],this.outerElement&&this.element){const i=this.outerElement.getBoundingClientRect(),r=this.element.getBoundingClientRect();this.startVectorRange=[i.top-r.top,i.bottom-r.bottom,i.left-r.left,i.right-r.right],this.startTransform=window.getComputedStyle(this.element).transform}this.onDragStart()},this.onMouseMove=o=>{if(this.startPosition){const i=[o.pageX,o.pageY],r=h(this.startPosition,i),f=p(r,this.startVectorRange);this.translate(f),this.onDrag(f)}},this.onMouseUp=o=>{this.startPosition&&this.onDragEnd(),this.startPosition=null};const{outerElement:e,innerElement:m,onDragStart:u,onDrag:c,onDragEnd:d}=s!=null?s:{};this.outerElement=e!=null?e:document.body,this.element=t,this.innerElement=m!=null?m:t,this.startPosition=null,this.startVectorRange=[],this.startTransform="",this.onDragStart=u!=null?u:()=>{},this.onDrag=c!=null?c:()=>{},this.onDragEnd=d!=null?d:()=>{},this.addEventListener()}addEventListener(){this.innerElement.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)}removeEventListener(){this.innerElement.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp)}}return M});
