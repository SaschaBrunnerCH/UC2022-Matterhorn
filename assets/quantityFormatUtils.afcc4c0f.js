import{l3 as l,l4 as b,ay as s,l5 as o,l6 as f,l7 as v,l8 as m,l9 as p,la as $,lb as d,lc as w,ld as h,le as y,lf as x,lg as g}from"./vendor.fe24faac.js";import{v as i}from"./quantityUtils.4cba5101.js";function a(r,u,n,t=2,e="abbr"){return o(r,i(u,n).value,n,t,e)}function c(r,u,n,t=2,e="abbr"){return m(r,i(u,n).value,n,t,e)}function j(r,u,n=2,t="abbr"){return f(r,u.value,u.unit,n,t)}function D(r,u,n=2,t="abbr"){return p(r,u.value,u.unit,n,t)}function F(r,u,n=2,t="abbr"){return d(r,u.value,u.unit,n,t)}function I(r,u,n=2,t="abbr"){return h(r,u.value,u.unit,n,t)}function M(r,u,n=2,t="abbr"){return x(r,u.value,u.unit,n,t)}function T(r,u,n=2,t="abbr"){return v(r,u.value,u.unit,n,t)}function k(r,u,n=2,t="abbr"){return $(r,u.value,u.unit,n,t)}function q(r,u,n=2,t="abbr"){return w(r,u.value,u.unit,n,t)}function z(r,u,n=2,t="abbr"){return y(r,u.value,u.unit,n,t)}function A(r,u,n=2,t="abbr"){return g(r,u.value,u.unit,n,t)}function R(r,u,n){return l(r.value,r.unit,r.rotationType,u,n)}function S(r,u,n){return b(r.value,r.unit,r.rotationType,u,n)}function U(r,u,n,t,e="abbr"){switch(t=s(t,2),n){case"imperial":return T(r,u,t,e);case"metric":return j(r,u,t,e);default:return a(r,u,n,t,e)}}function V(r,u,n,t=2,e="abbr"){switch(n){case"imperial":return k(r,u,t,e);case"metric":return D(r,u,t,e);default:return c(r,u,n,t,e)}}function C(r,u,n,t=2,e="abbr"){switch(n){case"imperial":return q(r,u,t,e);case"metric":return F(r,u,t,e);default:return a(r,u,n,t,e)}}function E(r,u,n,t=2,e="abbr"){switch(n){case"imperial":return z(r,u,t,e);case"metric":return I(r,u,t,e);default:return c(r,u,n,t,e)}}function G(r,u,n,t=2,e="abbr"){switch(n){case"imperial":return A(r,u,t,e);case"metric":return M(r,u,t,e);default:return a(r,u,n,t,e)}}export{V as F,j as M,C as S,R as U,a as g,q as j,E as k,S as q,F as w,U as x,T as y,G as z};
