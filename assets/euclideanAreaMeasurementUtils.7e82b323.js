import{lz as B,M as C,aE as R,b5 as E,b6 as d,lA as u,lB as b,lC as k,aB as x,lp as A,lD as m,lE as F,kl as W}from"./vendor.fe24faac.js";import{a as $}from"./quantityUtils.4cba5101.js";import{i as v}from"./measurementUtils.0b0f9c2a.js";function U(o,r=y()){return j(o,r)}function Z(o,r=y()){return j(o,r,!1)}function j(o,r,l=o.hasZ){const s=v(o.spatialReference),i=B(s);if(C(i))return null;const c=(e,n)=>!(n.length<2)&&(E(e,n[0],n[1],l&&n[2]||0),!0);let g=0;for(const e of o.rings){if(e.length<3)continue;const{positionsWorldCoords:n}=r;for(;n.length<e.length;)n.push(R());const f=w;for(let t=0;t<3;t++)if(!c(f,e[t])||!d(f,o.spatialReference,n[t],s))return null;if(u(n[0],n[1])||u(n[0],n[2])||u(n[1],n[2]))continue;const h=b(n[0],n[1],n[2],k()),p=x(A.get(),n[0]);for(let t=0;t<3;t++)m(h,p,n[t],n[t]);for(let t=3;t<e.length;t++){if(!c(f,e[t]))return null;d(f,o.spatialReference,n[t],s),m(h,p,n[t],n[t])}const a=z(n);for(let t=0;t<a.length;t+=3)g+=W(n[a[t]],n[a[t+1]],n[a[t+2]])}return $(g,i)}const w=R();function y(){return{positionsWorldCoords:[]}}function z(o){return F(D(o),[],2)}function D(o){const r=new Float64Array(2*o.length);for(let l=0;l<o.length;++l){const s=o[l],i=2*l;r[i+0]=s[0],r[i+1]=s[1]}return r}export{y as d,U as h,Z as j,z as v};
