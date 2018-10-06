$(document).ready(handleEvents);

function handleEvents() {
  // Фиксация хедера при скролле
  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      $('body').addClass('head-is-fixed');
      $('.head-is-fixed').css('margin-top', $('.js-head').outerHeight(true));
    } else {
      $('.head-is-fixed').css('margin-top', 0);
      $('body').removeClass('head-is-fixed');
    }
  });

  //Выпадающее меню
  $('.js-menu-bar').on('click', function () {
    $(this).toggleClass('is-active');
  });

  // Проверяем тип устройства
  if (is_touch_device()) $(document.body).addClass('is-touch');
  else $(document.body).addClass('no-touch');


  let $imgWrap = $('.js-img-wrapper');
  // let $pointerContainer = $('.js-pointer-event');
  let minImgHeight;
  let maxImgHeight;
  let imgHeight;
  let curPosX;
  let curPosY;
  let difX;
  let difY;
  let lastTap;
  let zoom = false;
  let $debag = $('.js-debag');
  $(document.body).on('pointerout', '.js-pointer-event', function (e) {
    console.log('pointerout');
  });
  $(document.body).on('pointerleave', '.js-pointer-event', function (e) {
    console.log('pointerleave');
  });
  $(document.body).on('pointerover', '.js-pointer-event', function (e) {
    console.log(e.offsetX);
    console.log('pointerover');
  });
  $(document.body).on('pointerenter', '.js-pointer-event', function (e) {
    console.log(e);
    console.log('pointerenter');
    $debag.html('pointerenter');
    $debag.append(`<p>pointer.id: {e.pointerId}</p>`);


    imgHeight = $($imgWrap, $(this))[0].offsetHeight;
    maxImgHeight = 1.5 * +imgHeight;
    minImgHeight = $imgWrap.parent()[0].offsetHeight;
  });
  $(document.body).on('pointerdown', '.js-pointer-event', function (e) {
    curPosX = e.offsetX;
    curPosY = e.offsetY;

    let now = new Date().getTime();
    let timesince = now - lastTap;
    if ((timesince < 600) && (timesince > 0)) {
      if (zoom) {
        zoom = !zoom;
      }
      else {
        // $($imgWrap, $(this)).height(maxImgHeight);
        console.log('double');
        zoom = !zoom;
      }


    } else {
      console.log('none');
    }

    lastTap = new Date().getTime();
    console.log('pointerdown');
  });
  $(document.body).on('pointerup', '.js-pointer-event', function (e) {
    console.log(imgHeight);
    console.log(maxImgHeight);
    console.log(minImgHeight);
    // console.log(e.offsetX);
    // console.log('pointerup');
    // console.log($($imgWrap, $(this))[0].offsetHeight);
  });
  $(document.body).on('pointermove', '.js-pointer-event', function (e) {
    console.log(e);
    console.log('pointermove');
    difX = curPosX - e.offsetX;
    console.log(difX);
    difX = curPosX - e.clientX;
    console.log(difX);
    difY = curPosY - e.clientY;
    // $(this).css('transform', 'translateX('+ difX +'px)');
    $('img', $imgWrap).css({
      'margin-left': difX,
      'margin-top': difY
    });
    console.log('difX: ' + difX);
  });
}

function is_touch_device() {
  return !!('ontouchstart' in window);
}

$.getJSON("assets/json/events.json").done(function (data) {
  $.each(data.events, function (i, item) {
    template(item);
  })
});

function template(event) {
  let card = `<div class="b-card mod-${event.size}  ${event.type === 'critical' ? `mod-attention` : ''} ">
      <div class="b-card__head">
        <header>
          <i class="b-card__ico icon i-${event.icon}"></i>
          <h3 class="b-card__title">${event.title}</h3>
        </header>
        <div class="b-card__info">
          <span class="b-card__name">${event.source}</span>
          <span class="b-card__time">${event.time}</span>
        </div>
      </div>
      ${event.description || event.data ? dataMain(event) : ''}
      <button class="b-card__close"><i class="b-card__ico icon i-close"></i>
      </button>
      <a href="#" class="b-card__link">
        <i class="b-card__ico icon i-arrow-r"></i>
      </a>
    </div>`;
  insertHtml($('#js-card-list'), $(card));
}

function dataMain(data) {
  return `<div class="b-card__main">
      ${data.description ? `<p class='b-card__text'>${data.description}</p>` : ''}
      ${data.data ? dataTemplate(data.data) : ''}
      </div>`;
}

function dataTemplate(data) {
  return `${data.albumcover ? dataMusic(data) : ''}
  ${data.temperature ? dataWeather(data) : ''}
  ${data.buttons ? dataButtons(data) : ''}
  ${data.image ? dataImage(data) : ''}
  ${data.type === 'graph' ? dataGraph(data) : ''}`;
}

function dataGraph(data) {
  return `<div class="b-card__data">
           <picture>
            <source srcset="assets/img/Richdata.svg" type="image/svg+xml">
            <img src="assets/img/Richdata@2x.png" alt="yandex">
          </picture>
          </div>`
}

function dataImage(data) {
  return `<div class="b-card__data js-pointer-event">
          <div class="b-cam">
            <div class="b-cam__img">
            <div class="b-cam__wrapper js-img-wrapper">
            <img src="assets/img/card-1.png" alt="yandex"
               srcset="assets/img/card-1@x2.png 800w, assets/img/card-1@x3.png 1200w">
               </div>
               </div>
            <div class="b-cam__stat mod-only-touch">
              <span>Приближение: 78%</span>
              <span>Яркость: 50%</span>
            </div>
            </div>
           </div>`
}

function dataButtons(data) {
  return `<div class="b-card__data">
            <div class="b-card__btns">
                ${data.buttons.map(btn => ` <button class="b-btn ${btn === 'Да' ? `mod-yellow` : '' }">${btn}</button>`).join('')}
            </div>
          </div>`;
}

function dataWeather(data) {
  return `<div class="b-card__data">
            <div class="b-data-set">
              <div class="b-data-set__item">
                <p class="b-data-set__name">
                  Температура: <span class="b-data-set__val">${data.temperature} C</span>
                </p>
              </div>
              <div class="b-data-set__item">
                <p class="b-data-set__name">
                  Влажность: <span class="b-data-set__val">${data.humidity}%</span>
                </p>
              </div>
            </div>
          </div>`;
}

function dataMusic(data) {
  return `<div class="b-card__data"> 
           <div class="b-music">
            <div class="b-music__section">
              <div class="b-music__logo">
                <img src="${data.albumcover}" alt="${data.artist}">
              </div>
              <div class="b-music__info">
                <p class="b-music__name">
                 ${data.artist} - ${data.track.name}
                </p>
                <div class="b-music__duration">
                  <input id='range-1' type="range" name="volume"
                         min="0" max="100"/>
                  <label for="range-1">${data.track.length}</label>
                </div>
              </div>
            </div>
            <div class="b-music__section">
              <div class="b-music__controls">
                <button class="b-music__prev icon i-prev"></button>
                <button class="b-music__next icon i-next"></button>
                <div class="b-music__val">
                  <input id='range-2' type="range" name="volume"
                         min="0" max="100" value="${data.volume}"/>
                  <label for="range-2">${data.volume}%</label>
                </div>
              </div>
            </div>
          </div>
        </div>`;
}

function insertHtml($parent, $content) {
  $parent.append($content);
}
