document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".slideshow-mgarcia-container").forEach((function(e){const t=e.querySelector("ul.slideshow-mgarcia-list"),l=Math.round(t.offsetWidth/t.querySelector("li:nth-child(1)").offsetWidth),i=e.querySelectorAll("ol li"),c=e.querySelectorAll("ul.slideshow-mgarcia-list li"),r=e.querySelector(".slideshow-mgarcia-next"),n=e.querySelector(".slideshow-mgarcia-prev");r.style.display="block",n.style.display="block",t.scrollLeft=0,i[0].classList.add("selected"),c[0].classList.add("selected"),l>1&&e.querySelectorAll("ol li:nth-last-child(-n + "+(l-1)+")").forEach((function(e){e.remove()}));const s=function(e){e.preventDefault(),t.scrollLeft=t.querySelector(this.getAttribute("href")).offsetLeft},o=function(){t.classList.add("interacted")};t.addEventListener("scroll",function(e){let t;return function(){let l=this,i=arguments;t&&window.cancelAnimationFrame(t),t=window.requestAnimationFrame((function(){e.apply(l,i)}))}}((function(){i.forEach((function(e){e.classList.remove("selected")})),c.forEach((function(e){e.classList.remove("selected")}));const l=e.querySelector("ul.slideshow-mgarcia-list li:nth-child(2)").offsetLeft-e.querySelector("ul.slideshow-mgarcia-list li:nth-child(1)").offsetLeft,r=Math.round(t.scrollLeft/l+1);if(e.querySelector("ol li:nth-child("+r+")").classList.add("selected"),e.querySelector("ul.slideshow-mgarcia-list li:nth-child("+r+")").classList.add("selected"),e.parentElement.parentElement.querySelector(".dynamictitle")){const t=e.querySelector("ul.slideshow-mgarcia-list li:nth-child("+r+") img").getAttribute("title");t&&(e.parentElement.parentElement.querySelector(".dynamictitle").innerHTML=t)}}))),t.addEventListener("touchstart",o),t.addEventListener("keydown",(function(e){"ArrowLeft"==e.key&&t.classList.add("interacted"),"ArrowRight"==e.key&&t.classList.add("interacted")})),r.addEventListener("click",(function(){e.querySelector("ol li:last-child").classList.contains("selected")?e.querySelector("ol li:first-child a").click():e.querySelector("ol li.selected").nextElementSibling.querySelector("a").click()})),r.addEventListener("mousedown",o),r.addEventListener("touchstart",o),n.addEventListener("click",(function(){e.querySelector("ol li:first-child").classList.contains("selected")?e.querySelector("ol li:last-child a").click():e.querySelector("ol li.selected").previousElementSibling.querySelector("a").click()})),n.addEventListener("mousedown",o),n.addEventListener("touchstart",o),i.forEach((function(e){e.querySelector("a").addEventListener("click",s),e.addEventListener("mousedown",o),e.addEventListener("touchstart",o)})),e.getAttribute("duration")&&setInterval((function(){t!=document.querySelector(".slideshow-mgarcia-container:hover ul.slideshow-mgarcia-list")&&0==t.classList.contains("interacted")&&r.click()}),e.getAttribute("duration"))}))}));