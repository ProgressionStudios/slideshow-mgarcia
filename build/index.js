(()=>{var e,a={840:(e,a,t)=>{"use strict";const l=window.wp.blocks,r=window.React,s=window.wp.i18n,o=window.wp.blockEditor,n=window.wp.element,i=window.wp.components;var c=t(184),d=t.n(c);const m=JSON.parse('{"u2":"create-block/slideshow-mgarcia"}');(0,l.registerBlockType)(m.u2,{edit:function({attributes:e,setAttributes:a}){const{featuredImage:t,postExcerpt:l,postMeta:c,feedCount:m,jsonFeed:p,bulletNav:h,arrowNav:u,feedFrontEnd:g,autoplaySlider:w,autoplayDuration:v}=e,b=(0,r.createElement)(o.InspectorControls,{key:"inspector"},(0,r.createElement)(i.PanelBody,{title:(0,s.__)("Layout","slideshow-mgarcia"),initialOpen:!0},(0,r.createElement)(i.SelectControl,{label:(0,s.__)("Posts Feed","slideshow-mgarcia"),value:p,options:[{label:"WPTavern.com Feed",value:"https://wptavern.com/wp-json/wp/v2/posts/?_embed"},{label:"WPDeveloper.com Feed",value:"https://wpdeveloper.com/wp-json/wp/v2/posts/?_embed"},{label:"CSS-Tricks.com Feed",value:"https://css-tricks.com/wp-json/wp/v2/posts/?_embed"},{label:"GutenbergTimes.com Feed",value:"https://gutenbergtimes.com/wp-json/wp/v2/posts/?_embed"},{label:"GutenbergHub.com Feed",value:"https://gutenberghub.com/wp-json/wp/v2/posts/?_embed"},{label:(0,s.__)("Local Feed","slideshow-mgarcia"),value:"/wp-json/wp/v2/posts/?_embed"}],onChange:e=>a({jsonFeed:e})}),(0,r.createElement)(i.ToggleControl,{label:(0,s.__)("Display featured image","slideshow-mgarcia"),checked:t,onChange:e=>a({featuredImage:e})}),(0,r.createElement)(i.ToggleControl,{label:(0,s.__)("Display post meta","slideshow-mgarcia"),checked:c,onChange:e=>a({postMeta:e})}),(0,r.createElement)(i.ToggleControl,{label:(0,s.__)("Display post excerpt","slideshow-mgarcia"),checked:l,onChange:e=>a({postExcerpt:e})}),(0,r.createElement)(i.ToggleControl,{label:(0,s.__)("Display feed address","slideshow-mgarcia"),checked:g,onChange:e=>a({feedFrontEnd:e})})),(0,r.createElement)(i.PanelBody,{title:(0,s.__)("Slideshow Options","slideshow-mgarcia"),initialOpen:!0},(0,r.createElement)(i.ToggleControl,{label:(0,s.__)("Autoplay","slideshow-mgarcia"),checked:w,onChange:e=>a({autoplaySlider:e})}),1==w&&(0,r.createElement)(i.RangeControl,{label:(0,s.__)("Autoplay Duration (milliseconds)","slideshow-mgarcia"),value:v,onChange:e=>{a({autoplayDuration:e})},min:1e3,max:1e4}),(0,r.createElement)(i.RangeControl,{label:(0,s.__)("Post Count","slideshow-mgarcia"),value:m,onChange:e=>{a({feedCount:e})},min:1,max:10}),(0,r.createElement)(i.ToggleControl,{label:(0,s.__)("Display bullet navigation","slideshow-mgarcia"),checked:h,onChange:e=>a({bulletNav:e})}),(0,r.createElement)(i.ToggleControl,{label:(0,s.__)("Display arrow navigation","slideshow-mgarcia"),checked:u,onChange:e=>a({arrowNav:e})}))),[f,_]=(0,n.useState)([]),[E,y]=(0,n.useState)(!0);(0,n.useEffect)((()=>{!async function(){y(!0);const e=await fetch(p);if(!e.ok)return;const a=await e.json();_(a),y(!1)}()}),[e.jsonFeed]);const k=d()("slideshow-mgarcia-container",{"has-featured":t,"has-meta":c,"has-excerpt":l,"has-bullet-nav":h,"has-arrow-nav":u,"has-feed-front-end":g});return(0,r.createElement)("div",{...(0,o.useBlockProps)()},b,(0,r.createElement)("div",{className:k},(0,r.createElement)("div",{className:"slideshow-mgarcia-feed-title"},(0,r.createElement)("h5",null,(0,s.__)("Feed address:","slideshow-mgarcia")," ",(0,r.createElement)("span",null,p))),E?(0,r.createElement)(i.Spinner,null):(0,r.createElement)("div",{className:"slideshow-mgarcia-edit-container"},(0,r.createElement)("ul",{className:"slideshow-mgarcia-list"},f.slice(0,m).map((e=>{const a=e.title.rendered.trim(),t=e.excerpt.rendered;return(0,r.createElement)("li",{className:"slideshow-mgarcia-list-item",id:"mg-slide-"+e.id},(0,r.createElement)("div",{className:"slideshow-mgarcia-list-container"},e._embedded["wp:featuredmedia"]?(0,r.createElement)("div",{className:"wp-block-post-featured-image"},(0,r.createElement)("a",{href:"#!"},(0,r.createElement)("img",{src:e._embedded["wp:featuredmedia"][0].source_url}))):null,(0,r.createElement)("h2",{className:"wp-block-post-title has-large-font-size"},(0,r.createElement)("a",{href:"#!",dangerouslySetInnerHTML:{__html:a}})),(0,r.createElement)("div",{className:"slideshow-mgarcia-meta-list has-small-font-size"},(0,r.createElement)("span",{className:"slideshow-mgarcia-date"},moment(e.date).format("MMMM Do, YYYY")),(0,r.createElement)("span",{className:"slideshow-mgarcia-date-dash"}," – "),(0,r.createElement)("span",{className:"slideshow-mgarcia-author"}," ",(0,s.__)("By","slideshow-mgarcia")," ",(0,r.createElement)("a",{href:e._embedded.author[0].link,target:"_blank"},e._embedded.author[0].name)),(0,r.createElement)("span",{className:"slideshow-mgarcia-cat"}," ",(0,s.__)("in","slideshow-mgarcia")," ",(0,r.createElement)("a",{href:e._embedded["wp:term"][0][0].link,target:"_blank"},e._embedded["wp:term"][0][0].name))),(0,r.createElement)("div",{className:"slideshow-mgarcia-meta-excerpt",dangerouslySetInnerHTML:{__html:t}})))}))),(0,r.createElement)("ol",{className:"slideshow-mgarcia-bullets"},f.slice(0,m).map((e=>(0,r.createElement)("li",null,(0,r.createElement)("a",{href:"#mg-slide-"+e.id})))))),(0,r.createElement)("div",{className:"slideshow-mgarcia-prev"},"‹"),(0,r.createElement)("div",{className:"slideshow-mgarcia-next"},"›")))},save:function(){return(0,r.createElement)("p",{...o.useBlockProps.save()},"Slideshow tada Mgarcia – hello from the saved content!")}})},184:(e,a)=>{var t;!function(){"use strict";var l={}.hasOwnProperty;function r(){for(var e=[],a=0;a<arguments.length;a++){var t=arguments[a];if(t){var s=typeof t;if("string"===s||"number"===s)e.push(t);else if(Array.isArray(t)){if(t.length){var o=r.apply(null,t);o&&e.push(o)}}else if("object"===s){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){e.push(t.toString());continue}for(var n in t)l.call(t,n)&&t[n]&&e.push(n)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(t=function(){return r}.apply(a,[]))||(e.exports=t)}()}},t={};function l(e){var r=t[e];if(void 0!==r)return r.exports;var s=t[e]={exports:{}};return a[e](s,s.exports,l),s.exports}l.m=a,e=[],l.O=(a,t,r,s)=>{if(!t){var o=1/0;for(d=0;d<e.length;d++){for(var[t,r,s]=e[d],n=!0,i=0;i<t.length;i++)(!1&s||o>=s)&&Object.keys(l.O).every((e=>l.O[e](t[i])))?t.splice(i--,1):(n=!1,s<o&&(o=s));if(n){e.splice(d--,1);var c=r();void 0!==c&&(a=c)}}return a}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[t,r,s]},l.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return l.d(a,{a}),a},l.d=(e,a)=>{for(var t in a)l.o(a,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})},l.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),(()=>{var e={826:0,431:0};l.O.j=a=>0===e[a];var a=(a,t)=>{var r,s,[o,n,i]=t,c=0;if(o.some((a=>0!==e[a]))){for(r in n)l.o(n,r)&&(l.m[r]=n[r]);if(i)var d=i(l)}for(a&&a(t);c<o.length;c++)s=o[c],l.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return l.O(d)},t=globalThis.webpackChunkslideshow_mgarcia=globalThis.webpackChunkslideshow_mgarcia||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))})();var r=l.O(void 0,[431],(()=>l(840)));r=l.O(r)})();