(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{"4IvO":function(e,t,a){"use strict";a.r(t);var n=a("eHn4"),r=a.n(n),s=a("p0pE"),o=a.n(s),u=a("d6i3"),i=a.n(u),c=(a("miYZ"),a("tsqr")),p=(a("ybqd"),a("F/us"),a("wd/R"),a("1l/V")),d=a.n(p),l=a("t3Un");function y(){return h.apply(this,arguments)}function h(){return h=d()(i.a.mark(function e(){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(l["a"])("/api/loco"));case 1:case"end":return e.stop()}},e)})),h.apply(this,arguments)}function f(e){return w.apply(this,arguments)}function w(){return w=d()(i.a.mark(function e(t){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(l["a"])("/api/registration/add",{method:"POST",body:t}));case 1:case"end":return e.stop()}},e)})),w.apply(this,arguments)}t["default"]={namespace:"learning",state:{courseLoading:!0,courses:[],locations:[],modalRegisterVisible:!1,isCourseSelect:null,modalRegisterLoading:!1},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;a.listen(function(e){"/learning"===e.pathname&&t({type:"fetchCourse"})})}},effects:{fetchCourse:i.a.mark(function e(t,a){var n,r,s,o;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,void 0===n?{}:n,r=a.call,s=a.put,e.next=4,s({type:"show",payload:"courseLoading"});case 4:return e.next=6,r(y);case 6:if(o=e.sent,200!=o.status){e.next=14;break}return e.next=10,s({type:"saveState",payload:{courses:o.data.result.courses,locations:o.data.result.locations}});case 10:return e.next=12,s({type:"hide",payload:"courseLoading"});case 12:e.next=17;break;case 14:return c["a"].error(o.statusText),e.next=17,s({type:"hide",payload:"courseLoading"});case 17:case"end":return e.stop()}},e)}),onRegisterCourse:i.a.mark(function e(t,a){var n,r,s,o,u;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=void 0===n?{}:n,s=a.call,o=a.put,e.next=4,o({type:"show",payload:"modalRegisterLoading"});case 4:return e.next=6,s(f,r);case 6:if(u=e.sent,201!=u.status){e.next=17;break}return c["a"].success(u.data.result),e.next=11,o({type:"saveState",payload:{isCourseSelect:null}});case 11:return e.next=13,o({type:"hide",payload:"modalRegisterLoading"});case 13:return e.next=15,o({type:"hide",payload:"modalRegisterVisible"});case 15:e.next=20;break;case 17:return c["a"].error(u.statusText),e.next=20,o({type:"hide",payload:"modalRegisterLoading"});case 20:case"end":return e.stop()}},e)})},reducers:{saveState:function(e,t){return o()({},e,t.payload)},show:function(e,t){return o()({},e,r()({},t.payload,!0))},hide:function(e,t){return o()({},e,r()({},t.payload,!1))}}}}}]);