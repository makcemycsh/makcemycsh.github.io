**ДЗ — «Типизация»**

Файлы скриптов — src/scripts

Сборка проекта: 
- Сборщик 
   - ``npm i``
   - `` gulp``
   -  Сборка скриптов — ``gulp scripts``
   
- Запуск видео-сервера — video-server 
   - ``cd video-server`` 
   - ``npm i`` 
   - ``npm start``


Переписаны на TypeScript:
* ДЗ «Адаптивная вёрстка» — main.ts
* ДЗ «Работа с сенсорным пользовательским вводом» — pointerevents.ts
* ДЗ «Мультимедиа» — camera.ts

 При сборки исользовался gulp-typescript и tslinter
 
 Тип any был использовн для:
  * window, document;
  * конекткста конструктора;
  * обработки событий поинтеревентов;
 
 Не нашел к какому типу их нужно привести.
 
 Пока чувствую себя не очень уверенно с tsc, продолжу работать с js
 
---
**ДЗ — «Мультимедиа»**

Сборка проекта: 
- Сборщик 
   - ``npm i``
   - `` gulp``
   
- Запуск видео-сервера — video-server 
   - ``cd video-server`` 
   - ``npm i`` 
   - ``npm start``
   
   http://localhost:9000/camera.html 
     
- Страница с выводом потокового видео -   
  - src/pages/camera.twig
  - контент и стили - src/blocks/camera
  
- Скрипты - src/scripts/camera.js
  - для каждого элемента с классом js-camera создается экземпляр класса Camera
  - контроллеры вынесены в отдельный объект
  
Сделано:
- На странице 4 карточки с видео
- При клике на карточку видео разворачивается на весь экран
- Анимация происходит с помощью изменение свойств transform rotate и scale ( will-change при ховере )
- Чтобы свернуть видео можно нажать на ESC или на кнопку "Все камеры"
- Фильтры реализованы через css свойство filter contrast / brightness 
- Для управления фильтрами было добавлена 2 контроллера (input type="range")
- Анализ звука происходит при помощи анализа частот window.AudioContext
- Для построения графика была использована библиотека ChartJs (CDN)
- Для часто срабатывающих событий был добавлен дебаунс 
