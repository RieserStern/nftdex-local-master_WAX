(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{IGtV:function(e,t,a){e.exports={fixedHeader:"antd-pro-layouts-header-fixedHeader"}},JwhZ:function(e,t,a){e.exports={head:"antd-pro-components-top-nav-header-index-head",light:"antd-pro-components-top-nav-header-index-light",main:"antd-pro-components-top-nav-header-index-main",wide:"antd-pro-components-top-nav-header-index-wide",left:"antd-pro-components-top-nav-header-index-left",right:"antd-pro-components-top-nav-header-index-right",logo:"antd-pro-components-top-nav-header-index-logo",menu:"antd-pro-components-top-nav-header-index-menu"}},W660:function(e,t,a){e.exports={content:"antd-pro-layouts-basic-layout-content"}},m8Tn:function(e,t,a){"use strict";a.r(t);var n=a("p0pE"),o=a.n(n),i=a("jehZ"),r=a.n(i),l=a("2Taf"),c=a.n(l),s=a("vZ4D"),u=a.n(s),d=a("l4Ni"),h=a.n(d),m=a("ujKo"),p=a.n(m),g=a("MhPg"),f=a.n(g),v=(a("B9cy"),a("Ol7k")),b=a("q1tI"),y=a.n(b),x=a("ZFw/"),E=a.n(x),M=a("Y+p1"),N=a.n(M),C=a("Wwog"),k=a("MuoO"),w=a("E6Dt"),W=a("TSYQ"),P=a.n(W),S=a("bALw"),D=a.n(S),H=a("lU33"),T=a("LLXN"),O=a("HZnN"),j=a("mxmt"),F=a.n(j),L=a("gJ0l"),A=(a("miYZ"),a("tsqr")),V=a("MFj2"),Z=a("usdK"),q=a("NtFa"),I=a("mOP9"),J=a("X5mu"),K=a("oFg3"),U=a("pMM0"),z=a("JwhZ"),R=a.n(z),X=a("T+dw"),Y=function(e){function t(){var e,a;c()(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return a=h()(this,(e=p()(t)).call.apply(e,[this].concat(o))),a.state={maxWidth:void 0},a}return f()(t,e),u()(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.theme,n=t.contentWidth,o=t.menuData,i=t.logo,l=this.state.maxWidth,c=Object(U["b"])(o);return y.a.createElement("div",{className:"".concat(R.a.head," ").concat("light"===a?R.a.light:"")},y.a.createElement("div",{ref:function(t){e.maim=t},className:"".concat(R.a.main," ").concat("Fixed"===n?R.a.wide:"")},y.a.createElement("div",{className:R.a.left},y.a.createElement("div",{className:R.a.logo,key:"logo",id:"logo"},y.a.createElement(I["a"],{to:"/"},y.a.createElement("img",{src:i,alt:"logo"}),y.a.createElement("h1",null,X["title"]))),y.a.createElement("div",{style:{maxWidth:l}},y.a.createElement(K["default"],r()({},this.props,{flatMenuKeys:c,className:R.a.menu})))),y.a.createElement(J["a"],this.props)))}}],[{key:"getDerivedStateFromProps",value:function(e){return{maxWidth:("Fixed"===e.contentWidth?1200:window.innerWidth)-280-165-40}}}]),t}(b["PureComponent"]),G=a("IGtV"),Q=a.n(G),B=v["a"].Header,$=function(e){function t(){var e,a;c()(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return a=h()(this,(e=p()(t)).call.apply(e,[this].concat(o))),a.state={visible:!0},a.getHeadWidth=function(){var e=a.props,t=e.isMobile,n=e.collapsed,o=e.setting,i=o.fixedHeader,r=o.layout;return t||!i||"topmenu"===r?"100%":n?"calc(100% - 80px)":"calc(100% - 256px)"},a.handleNoticeClear=function(e){A["a"].success("".concat(Object(T["formatMessage"])({id:"component.noticeIcon.cleared"})," ").concat(Object(T["formatMessage"])({id:"component.globalHeader.".concat(e)})));var t=a.props.dispatch;t({type:"global/clearNotices",payload:e})},a.handleMenuClick=function(e){var t=e.key,n=a.props.dispatch;"userCenter"!==t?"triggerError"!==t?"userinfo"!==t?"logout"===t&&n({type:"login/logout"}):Z["a"].push("/account/settings/base"):Z["a"].push("/exception/trigger"):Z["a"].push("/account/center")},a.handleNoticeVisibleChange=function(e){if(e){var t=a.props.dispatch;t({type:"global/fetchNotices"})}},a.handScroll=function(){var e=a.props.autoHideHeader,t=a.state.visible;if(e){var n=document.body.scrollTop+document.documentElement.scrollTop;a.ticking||(a.ticking=!0,requestAnimationFrame(function(){a.oldScrollTop>n?a.setState({visible:!0}):n>300&&t?a.setState({visible:!1}):n<300&&!t&&a.setState({visible:!0}),a.oldScrollTop=n,a.ticking=!1}))}},a}return f()(t,e),u()(t,[{key:"componentDidMount",value:function(){document.addEventListener("scroll",this.handScroll,{passive:!0})}},{key:"componentWillUnmount",value:function(){document.removeEventListener("scroll",this.handScroll)}},{key:"render",value:function(){var e=this.props,t=e.isMobile,a=e.handleMenuCollapse,n=e.setting,o=n.navTheme,i=n.layout,l=n.fixedHeader,c=this.state.visible,s="topmenu"===i,u=this.getHeadWidth(),d=c?y.a.createElement(B,{style:{padding:0,width:u},className:l?Q.a.fixedHeader:""},s&&!t?y.a.createElement(Y,r()({theme:o,mode:"horizontal",onCollapse:a,onNoticeClear:this.handleNoticeClear,onMenuClick:this.handleMenuClick,onNoticeVisibleChange:this.handleNoticeVisibleChange},this.props)):y.a.createElement(q["a"],r()({onCollapse:a,onNoticeClear:this.handleNoticeClear,onMenuClick:this.handleMenuClick,onNoticeVisibleChange:this.handleNoticeVisibleChange},this.props))):null;return y.a.createElement(V["a"],{component:"",transitionName:"fade"},d)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.autoHideHeader||t.visible?null:{visible:!0}}}]),t}(b["Component"]),_=Object(k["connect"])(function(e){var t=e.user,a=e.global,n=e.setting,o=e.loading;return{currentUser:t.currentUser,collapsed:a.collapsed,fetchingMoreNotices:o.effects["global/fetchMoreNotices"],fetchingNotices:o.effects["global/fetchNotices"],loadedAllNotices:a.loadedAllNotices,notices:a.notices,setting:n}})($),ee=a("R1Dz"),te=a("wOmh"),ae=a("xqX8"),ne=a("IamK"),oe=a("W660"),ie=a.n(oe),re=(y.a.lazy(function(){return Promise.all([a.e(0),a.e(1)]).then(a.bind(null,"PceP"))}),v["a"].Content),le={"screen-xs":{maxWidth:575},"screen-sm":{minWidth:576,maxWidth:767},"screen-md":{minWidth:768,maxWidth:991},"screen-lg":{minWidth:992,maxWidth:1199},"screen-xl":{minWidth:1200,maxWidth:1599},"screen-xxl":{minWidth:1600}},ce=function(e){function t(e){var a;return c()(this,t),a=h()(this,p()(t).call(this,e)),a.matchParamsPath=function(e,t){var a=Object.keys(t).find(function(t){return D()(t).test(e)});return t[a]},a.getRouteAuthority=function(e,t){var a=t.slice(),n=function e(t,a){var n;return t.forEach(function(t){D()("".concat(t.path,"(.*)")).test(a)&&(t.authority&&(n=t.authority),!D()(t.path).test(a)&&t.routes&&(n=e(t.routes,a)))}),n};return n(a,e)},a.getPageTitle=function(e,t){var n=a.matchParamsPath(e,t);if(!n)return X["title"];var o=X["menu"].disableLocal?n.name:Object(T["formatMessage"])({id:n.locale||n.name,defaultMessage:n.name});return"".concat(o," - ").concat(X["title"])},a.getLayoutStyle=function(){var e=a.props,t=e.fixSiderbar,n=e.isMobile,o=e.collapsed,i=e.layout;return t&&"topmenu"!==i&&!n?{paddingLeft:o?"80px":"256px"}:null},a.handleMenuCollapse=function(e){var t=a.props.dispatch;t({type:"global/changeLayoutCollapsed",payload:e})},a.renderSettingDrawer=function(){return null},a.getPageTitle=Object(C["a"])(a.getPageTitle),a.matchParamsPath=Object(C["a"])(a.matchParamsPath,N.a),a}return f()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,a=e.route,n=a.routes,o=a.authority;t({type:"user/fetchCurrent"}),t({type:"setting/getSetting"}),t({type:"menu/getMenuData",payload:{routes:n,authority:o}})}},{key:"getContext",value:function(){var e=this.props,t=e.location,a=e.breadcrumbNameMap;return{location:t,breadcrumbNameMap:a}}},{key:"render",value:function(){var e=this,t=this.props,a=t.navTheme,n=t.layout,i=t.children,l=t.location.pathname,c=t.isMobile,s=t.menuData,u=t.breadcrumbNameMap,d=t.route.routes,h=t.fixedHeader,m="topmenu"===n,p=this.getRouteAuthority(l,d),g=h?{}:{paddingTop:0},f=y.a.createElement(v["a"],null,m&&!c?null:y.a.createElement(ne["a"],r()({logo:F.a,theme:a,onCollapse:this.handleMenuCollapse,menuData:s,isMobile:c},this.props)),y.a.createElement(v["a"],{style:o()({},this.getLayoutStyle(),{minHeight:"100vh"})},y.a.createElement(_,r()({menuData:s,handleMenuCollapse:this.handleMenuCollapse,logo:F.a,isMobile:c},this.props)),y.a.createElement(re,{className:ie.a.content,style:g},y.a.createElement(O["a"],{authority:p,noMatch:y.a.createElement(te["a"],null)},i)),y.a.createElement(L["a"],null)));return y.a.createElement(y.a.Fragment,null,y.a.createElement(E.a,{title:this.getPageTitle(l,u)},y.a.createElement(w["ContainerQuery"],{query:le},function(t){return y.a.createElement(ee["a"].Provider,{value:e.getContext()},y.a.createElement("div",{className:P()(t)},f))})),y.a.createElement(b["Suspense"],{fallback:y.a.createElement(ae["default"],null)},this.renderSettingDrawer()))}}]),t}(y.a.Component);t["default"]=Object(k["connect"])(function(e){var t=e.global,a=e.setting,n=e.menu;return o()({collapsed:t.collapsed,layout:a.layout,menuData:n.menuData,breadcrumbNameMap:n.breadcrumbNameMap},a)})(function(e){return y.a.createElement(H["a"],{query:"(max-width: 599px)"},function(t){return y.a.createElement(ce,r()({},e,{isMobile:t}))})})}}]);