(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{hljp:function(e,a,t){"use strict";t.r(a);var n=t("eHn4"),s=t.n(n),r=t("p0pE"),c=t.n(r),u=t("d6i3"),o=t.n(u),p=t("ybqd"),i=(t("F/us"),t("wd/R"),t("c5zK"));a["default"]={namespace:"qa",state:{dataQa:[]},subscriptions:{setup:function(e){var a=e.dispatch,t=e.history;t.listen(function(e){"/qa"===e.pathname&&a({type:"fetchQa"})})}},effects:{fetchQa:o.a.mark(function e(a,t){var n,s,r,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,void 0===n?{}:n,s=t.call,r=t.put,e.next=4,s(i.query);case 4:if(c=e.sent,console.log("res QA: ",c),200!==c.status){e.next=11;break}return e.next=9,r({type:"saveState",payload:{dataQa:c.data.result}});case 9:e.next=12;break;case 11:Object(p["message"])(c.data.message);case 12:case"end":return e.stop()}},e)})},reducers:{saveState:function(e,a){return c()({},e,a.payload)},show:function(e,a){return c()({},e,s()({},a.payload,!0))},hide:function(e,a){return c()({},e,s()({},a.payload,!1))}}}}}]);