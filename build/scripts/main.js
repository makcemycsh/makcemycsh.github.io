"use strict";function handleEvents(){$(window).scroll(function(){150<$(this).scrollTop()?($("body").addClass("head-is-fixed"),$(".head-is-fixed").css("margin-top",$(".js-head").outerHeight(!0))):($(".head-is-fixed").css("margin-top",0),$("body").removeClass("head-is-fixed"))}),$(".js-menu-bar").on("click",function(){$(this).toggleClass("is-active")}),is_touch_device()?$(document.body).addClass("is-touch"):$(document.body).addClass("no-touch");var t=$(".js-img-wrapper"),e=void 0,a=void 0,s=void 0,i=void 0,o=void 0,c=void 0,d=void 0,r=void 0,l=!1,u=$(".js-debag");$(document.body).on("pointerout",".js-pointer-event",function(n){console.log("pointerout")}),$(document.body).on("pointerleave",".js-pointer-event",function(n){console.log("pointerleave")}),$(document.body).on("pointerover",".js-pointer-event",function(n){console.log(n.offsetX),console.log("pointerover")}),$(document.body).on("pointerenter",".js-pointer-event",function(n){console.log(n),console.log("pointerenter"),u.html("pointerenter"),u.append("<p>pointer.id: {e.pointerId}</p>"),s=$(t,$(this))[0].offsetHeight,a=1.5*+s,e=t.parent()[0].offsetHeight}),$(document.body).on("pointerdown",".js-pointer-event",function(n){i=n.offsetX,o=n.offsetY;var t=(new Date).getTime()-r;t<600&&0<t?l=(l||console.log("double"),!l):console.log("none"),r=(new Date).getTime(),console.log("pointerdown")}),$(document.body).on("pointerup",".js-pointer-event",function(n){console.log(s),console.log(a),console.log(e)}),$(document.body).on("pointermove",".js-pointer-event",function(n){console.log(n),console.log("pointermove"),c=i-n.offsetX,console.log(c),c=i-n.clientX,console.log(c),d=o-n.clientY,$("img",t).css({"margin-left":c,"margin-top":d}),console.log("difX: "+c)})}function is_touch_device(){return!!("ontouchstart"in window)}function template(n){var t='<div class="b-card mod-'+n.size+"  "+("critical"===n.type?"mod-attention":"")+' ">\n      <div class="b-card__head">\n        <header>\n          <i class="b-card__ico icon i-'+n.icon+'"></i>\n          <h3 class="b-card__title">'+n.title+'</h3>\n        </header>\n        <div class="b-card__info">\n          <span class="b-card__name">'+n.source+'</span>\n          <span class="b-card__time">'+n.time+"</span>\n        </div>\n      </div>\n      "+(n.description||n.data?dataMain(n):"")+'\n      <button class="b-card__close"><i class="b-card__ico icon i-close"></i>\n      </button>\n      <a href="#" class="b-card__link">\n        <i class="b-card__ico icon i-arrow-r"></i>\n      </a>\n    </div>';insertHtml($("#js-card-list"),$(t))}function dataMain(n){return'<div class="b-card__main">\n      '+(n.description?"<p class='b-card__text'>"+n.description+"</p>":"")+"\n      "+(n.data?dataTemplate(n.data):"")+"\n      </div>"}function dataTemplate(n){return(n.albumcover?dataMusic(n):"")+"\n  "+(n.temperature?dataWeather(n):"")+"\n  "+(n.buttons?dataButtons(n):"")+"\n  "+(n.image?dataImage(n):"")+"\n  "+("graph"===n.type?dataGraph(n):"")}function dataGraph(n){return'<div class="b-card__data">\n           <picture>\n            <source srcset="assets/img/Richdata.svg" type="image/svg+xml">\n            <img src="assets/img/Richdata@2x.png" alt="yandex">\n          </picture>\n          </div>'}function dataImage(n){return'<div class="b-card__data js-pointer-event">\n          <div class="b-cam">\n            <div class="b-cam__img">\n            <div class="b-cam__wrapper js-img-wrapper">\n            <img src="assets/img/card-1.png" alt="yandex"\n               srcset="assets/img/card-1@x2.png 800w, assets/img/card-1@x3.png 1200w">\n               </div>\n               </div>\n            <div class="b-cam__stat mod-only-touch">\n              <span>Приближение: 78%</span>\n              <span>Яркость: 50%</span>\n            </div>\n            </div>\n           </div>'}function dataButtons(n){return'<div class="b-card__data">\n            <div class="b-card__btns">\n                '+n.buttons.map(function(n){return' <button class="b-btn '+("Да"===n?"mod-yellow":"")+'">'+n+"</button>"}).join("")+"\n            </div>\n          </div>"}function dataWeather(n){return'<div class="b-card__data">\n            <div class="b-data-set">\n              <div class="b-data-set__item">\n                <p class="b-data-set__name">\n                  Температура: <span class="b-data-set__val">'+n.temperature+' C</span>\n                </p>\n              </div>\n              <div class="b-data-set__item">\n                <p class="b-data-set__name">\n                  Влажность: <span class="b-data-set__val">'+n.humidity+"%</span>\n                </p>\n              </div>\n            </div>\n          </div>"}function dataMusic(n){return'<div class="b-card__data"> \n           <div class="b-music">\n            <div class="b-music__section">\n              <div class="b-music__logo">\n                <img src="'+n.albumcover+'" alt="'+n.artist+'">\n              </div>\n              <div class="b-music__info">\n                <p class="b-music__name">\n                 '+n.artist+" - "+n.track.name+'\n                </p>\n                <div class="b-music__duration">\n                  <input id=\'range-1\' type="range" name="volume"\n                         min="0" max="100"/>\n                  <label for="range-1">'+n.track.length+'</label>\n                </div>\n              </div>\n            </div>\n            <div class="b-music__section">\n              <div class="b-music__controls">\n                <button class="b-music__prev icon i-prev"></button>\n                <button class="b-music__next icon i-next"></button>\n                <div class="b-music__val">\n                  <input id=\'range-2\' type="range" name="volume"\n                         min="0" max="100" value="'+n.volume+'"/>\n                  <label for="range-2">'+n.volume+"%</label>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>"}function insertHtml(n,t){n.append(t)}$(document).ready(handleEvents),$.getJSON("assets/json/events.json").done(function(n){$.each(n.events,function(n,t){template(t)})});
//# sourceMappingURL=main.js.map
