/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/helpers/isDesktop.js":
/*!*************************************!*\
  !*** ./src/js/helpers/isDesktop.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isDesktop; }
/* harmony export */ });
function isDesktop() {
  return $(window).width() >= 1000;
}

/***/ }),

/***/ "./src/js/helpers/loadScript.js":
/*!**************************************!*\
  !*** ./src/js/helpers/loadScript.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ loadScript; }
/* harmony export */ });
function loadScript(src, callback) {
  var script = document.createElement("script");
  script.src = src;

  script.onload = function () {
    return callback(null, script);
  };

  script.onerror = function () {
    return callback(new Error("Script load error for ".concat(src)));
  };

  document.head.append(script);
}

/***/ }),

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ (function() {

$(function () {
  $(".js-accordion").each(function () {
    $(this).accordionjs({
      closeAble: true,
      activeIndex: false
    });
  });
});

/***/ }),

/***/ "./src/js/modules/api.js":
/*!*******************************!*\
  !*** ./src/js/modules/api.js ***!
  \*******************************/
/***/ (function() {



/***/ }),

/***/ "./src/js/modules/bottom-menu.js":
/*!***************************************!*\
  !*** ./src/js/modules/bottom-menu.js ***!
  \***************************************/
/***/ (function() {

var $section = $();
var $sliderMenu = $();
var $btnHeart = $();

function toggleMenuStyle() {
  var scrollTop = $(window).scrollTop();
  var isDarkMode = $section.outerHeight() < scrollTop + $(window).height();
  $btnHeart.toggleClass("btn-heart--dark", isDarkMode);
  $sliderMenu.toggleClass("slider-menu--dark", isDarkMode);
}

$(function () {
  $section = $("#intro-zhk");
  $sliderMenu = $("#intro-zhk__menu .slider-menu");
  $btnHeart = $("#intro-zhk__menu .btn-heart");
  if ($section.length === 0) return;

  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      toggleMenuStyle();
    });
  };

  var options = {
    // root: по умолчанию window, но можно задать любой элемент-контейнер
    rootMargin: "0px 0px 0px 0px",
    threshold: 0
  };
  var observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector(".l-zhk__filter"));
});

/***/ }),

/***/ "./src/js/modules/defaults.js":
/*!************************************!*\
  !*** ./src/js/modules/defaults.js ***!
  \************************************/
/***/ (function() {

window.history.scrollRestoration = "manual";
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
}); // $.extend(true, $.magnificPopup.defaults, {
//     tClose: "", // Alt text on close button
//     tLoading: "Загрузка...", // Text that is displayed during loading. Can contain %curr% and %total% keys
//     gallery: {
//         tPrev: "", // Alt text on left arrow
//         tNext: "", // Alt text on right arrow
//         tCounter: "%curr% из %total%", // Markup for "1 of 7" counter
//     },
//     image: {
//         tError: 'Не удалось загрузить <a href="%url%">изображение</a>.', // Error message when image could not be loaded
//     },
//     ajax: {
//         tError: 'Не удалось загрузить <a href="%url%">страницу</a>.', // Error message when ajax request failed
//     },
// });
// $.validator.addMethod(
//     "mobileRU",
//     function (phone_number, element) {
//         var ruPhone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
//         return (
//             this.optional(element) ||
//             (ruPhone_number.length > 9 &&
//                 /^((\+7|7|8)+([0-9]){10})$/.test(ruPhone_number))
//         );
//     },
//     "Пожалуйста укажите корректный номер."
// );

/***/ }),

/***/ "./src/js/modules/demo.js":
/*!********************************!*\
  !*** ./src/js/modules/demo.js ***!
  \********************************/
/***/ (function() {



/***/ }),

/***/ "./src/js/modules/developers.js":
/*!**************************************!*\
  !*** ./src/js/modules/developers.js ***!
  \**************************************/
/***/ (function() {

var iconStyles = " font-size:50px;";
var titleStyles = "font-size:12px; font-weight: bold;";
var textStyles = "font-size:12px;";
var pubdate = new Date("2023-09-21");
var log = console.log;

function print() {
  log("%c😼", iconStyles);
  log("%cDeveloped by:", titleStyles);
  log("%cFront-end: ildar.meyker@gmail.com, +79297287297", textStyles);
}

if (pubdate < new Date()) {
  print();
}

/***/ }),

/***/ "./src/js/modules/grid-people.js":
/*!***************************************!*\
  !*** ./src/js/modules/grid-people.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridPeople": function() { return /* binding */ GridPeople; }
/* harmony export */ });
/* harmony import */ var throttle_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! throttle-debounce */ "./node_modules/throttle-debounce/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/modules/utils.js");


var _isInitialized = false;
var $grids = $();

function _addEmptyCells() {
  _isInitialized = true;
  $grids.each(function () {
    var $allCells = $(this).find(" > div");
    var $originalCells = $allCells.not(".empty");
    var $emptyCells = $allCells.filter(".empty");
    var rowWidth = $(this).outerWidth();
    var itemWidth = $originalCells.outerWidth();
    var countPerRow = Math.floor(rowWidth / itemWidth);
    var emptyPercent = 0.3;
    var emptyCount = Math.floor(countPerRow * 2 * emptyPercent);
    $emptyCells.remove();

    for (var i = 0, p = 1; i < emptyCount; i++, p += (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(1, 2)) {
      $('<div class="empty"></div>').insertAfter($originalCells.eq(p));
    }
  });
}

function handleWindowResize() {
  if ($(window).width() < 1000) return;

  _addEmptyCells();
}

$(function () {
  $grids = $(".grid-people");
  if ($grids.length === 0) return;

  _addEmptyCells();

  $(window).on("resize orientationchange", (0,throttle_debounce__WEBPACK_IMPORTED_MODULE_0__.debounce)(200, handleWindowResize));
});
var GridPeople = {
  isInitialized: function isInitialized() {
    return _isInitialized;
  },
  addEmptyCells: function addEmptyCells() {
    _addEmptyCells();
  }
};

/***/ }),

/***/ "./src/js/modules/intro-zhk.js":
/*!*************************************!*\
  !*** ./src/js/modules/intro-zhk.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_isDesktop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/isDesktop */ "./src/js/helpers/isDesktop.js");

var $section = $();
var $image = $();
var $panels = $();
var $btnDown = $();
var $title = $();
var $info = $();
var initialScale;
var fullScale;

function transformScrollTopToStyles() {
  var fullScaleAtScrollTop = $image.offset().top;
  var scrollTop = $(window).scrollTop();
  var restScale = fullScale - initialScale;
  var scrollProgress = scrollTop < fullScaleAtScrollTop ? scrollTop / fullScaleAtScrollTop : 1;
  var initialBorderRadius = 16;
  return {
    newScale: initialScale + restScale * scrollProgress,
    newBorderRadius: initialBorderRadius * (1 - scrollProgress),
    newTitleOpacity: 1 - scrollProgress * 3
  };
}

function updateScrollDeps() {
  var _transformScrollTopTo = transformScrollTopToStyles(),
      newScale = _transformScrollTopTo.newScale,
      newBorderRadius = _transformScrollTopTo.newBorderRadius,
      newTitleOpacity = _transformScrollTopTo.newTitleOpacity;

  $image.css({
    transform: "scale(".concat(newScale, ")")
  });
  $image[0].style.setProperty("--border-radius", newBorderRadius + "px");
  $section.toggleClass("intro-zhk--full-scale", fullScale - newScale < 0.1);
  $btnDown.toggleClass("active", newScale < 0.8 * fullScale);
  $title.css({
    opacity: newTitleOpacity
  });
}

function toggleInactive() {
  var scrollTop = $(window).scrollTop();
  var isInactive = $section.outerHeight() < scrollTop + 700;
  $section.toggleClass("intro-zhk--inactive", isInactive);
}

function updateScaleVariables() {
  initialScale = parseFloat(getComputedStyle($image.get(0)).getPropertyValue("--initial-scale"));
  var windowHeight = $(window).height();

  if ((0,_helpers_isDesktop__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
    fullScale = 1;
    $section.get(0).style = "";
  } else {
    var imageRatio = 0.9339;
    var imageHeight = $(window).width() * imageRatio;
    fullScale = windowHeight / imageHeight;
    $section.outerHeight($image.offset().top + windowHeight);
  }
}

function handleWindowScroll() {
  console.log("handleWindowScroll");
  requestAnimationFrame(function () {
    updateScrollDeps();
    toggleInactive();
  });
}

function handleFloorClick(e) {
  closeActivePanels();
  var target = $(e.target).data("target");
  $(this).addClass("active");
  $(target).addClass("active");
}

function closeActivePanels() {
  $panels.filter(".active").removeClass("active");
  $(".intro-zhk__floors__item.active").removeClass("active");
}

function handleWindowLoad() {
  console.log("handleWindowLoad");
  updateScaleVariables();
  $section.addClass("intro-zhk--loaded");
  setTimeout(function () {
    $image.addClass("intro-zhk__image--no-transition");
    $(".page__locker").removeClass("active");
  }, 1200);
}

function handleWindowResize() {
  updateScaleVariables();
}

function handleScrollDown() {
  window.scroll({
    top: $image.offset().top,
    behavior: "smooth"
  });
}

function handleOutsideClick(e) {
  if ($(e.target).closest(".intro-zhk__floors, .intro-zhk__panel").length) return;
  closeActivePanels();
}

function handlePanelClose(e) {
  e.preventDefault();
  closeActivePanels();
}

$(function () {
  $section = $("#intro-zhk");
  $image = $section.find(".intro-zhk__image");
  $btnDown = $section.find(".intro-zhk__btn-down");
  $panels = $section.find(".intro-zhk__panel");
  $title = $section.find(".intro-zhk__h1");
  $info = $section.find(".intro-zhk__info");
  if ($section.length === 0) return;

  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(window).on("scroll", handleWindowScroll);
      } else {
        $(window).off("scroll", handleWindowScroll);
      }
    });
  };

  var options = {
    // root: по умолчанию window, но можно задать любой элемент-контейнер
    rootMargin: "0px 0px 0px 0px",
    threshold: 0
  };
  var observer = new IntersectionObserver(callback, options);
  observer.observe($section[0]);
  $(document).on("click", ".intro-zhk__floors__item", handleFloorClick);
  $(document).on("click", ".intro-zhk__btn-close", handlePanelClose);
  $(document).on("click", ".intro-zhk__btn-down", handleScrollDown);
  $(document).on("click", ".intro-zhk", handleOutsideClick);
  $(window).on("load", handleWindowLoad);
  $(window).on("resize orientationchange", handleWindowResize);
});

/***/ }),

/***/ "./src/js/modules/map-contacts.js":
/*!****************************************!*\
  !*** ./src/js/modules/map-contacts.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_loadScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/loadScript */ "./src/js/helpers/loadScript.js");

var CLASS_ZOOM_IN = "map-contacts__btn-zoom-in";
var CLASS_ZOOM_OUT = "map-contacts__btn-zoom-out";

function init() {
  $(".map-contacts").each(function () {
    var $root = $(this);

    var _$root$data = $root.data(),
        id = _$root$data.id,
        center = _$root$data.center,
        hint = _$root$data.hint;

    var assetsUrl = $root.data("assets-url");
    var myMap = new ymaps.Map(id, {
      center: center,
      controls: [],
      zoom: 15
    });
    var myPlacemark = new ymaps.Placemark(center, {
      hintContent: hint,
      balloonContent: hint,
      iconContent: ""
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: "default#image",
      // Своё изображение иконки метки.
      iconImageHref: assetsUrl + "img/map-marker.svg",
      // Размеры метки.
      iconImageSize: [80, 92],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-40, -92]
    }); // Создадим пользовательский макет ползунка масштаба.

    var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>\n                <div class='".concat(CLASS_ZOOM_IN, "'>\n                    <svg class=\"icon\">\n                        <use xlink:href=\"").concat(assetsUrl, "img/icons/general/sprite.svg#zoom-in\"></use>\n                    </svg>\n                </div>\n                <div class='").concat(CLASS_ZOOM_OUT, "'>\n                    <svg class=\"icon\">\n                        <use xlink:href=\"").concat(assetsUrl, "img/icons/general/sprite.svg#zoom-out\"></use>\n                    </svg>\n                </div>\n            \"</div>"), {
      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function build() {
        // Вызываем родительский метод build.
        ZoomLayout.superclass.build.call(this); // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.

        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this); // Начинаем слушать клики на кнопках макета.

        $root.find("." + CLASS_ZOOM_IN).on("click", this.zoomInCallback);
        $root.find("." + CLASS_ZOOM_OUT).on("click", this.zoomOutCallback);
      },
      clear: function clear() {
        // Снимаем обработчики кликов.
        $root.find("." + CLASS_ZOOM_IN).off("click", this.zoomInCallback);
        $root.find("." + CLASS_ZOOM_OUT).off("click", this.zoomOutCallback); // Вызываем родительский метод clear.

        ZoomLayout.superclass.clear.call(this);
      },
      zoomIn: function zoomIn() {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() + 1, {
          checkZoomRange: true
        });
      },
      zoomOut: function zoomOut() {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() - 1, {
          checkZoomRange: true
        });
      }
    });
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        layout: ZoomLayout
      }
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable("scrollZoom");
    myMap.controls.add(zoomControl);
  });
}

var observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      if (typeof ymaps === "undefined") {
        (0,_helpers_loadScript__WEBPACK_IMPORTED_MODULE_0__["default"])("https://api-maps.yandex.ru/2.1/?apikey=4ee83d51-9c82-4832-ae32-283ef606144b&lang=ru_RU", function (error, script) {
          if (error) {
            console.error(error);
          } else {
            ymaps.ready(init);
          }
        });
      } else {
        ymaps.ready(init);
      }

      observer.disconnect();
    }
  });
}, {
  rootMargin: "0px 0px 2000px 0px",
  threshold: 0
});
$(function () {
  document.querySelectorAll(".map-contacts").forEach(function (element) {
    observer.observe(element);
  });
});

/***/ }),

/***/ "./src/js/modules/map-location.js":
/*!****************************************!*\
  !*** ./src/js/modules/map-location.js ***!
  \****************************************/
/***/ (function() {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function initMap(mapEl) {
  var imageSize = [4096, 2371];
  var maxZoom = 4;
  var sizeForZoom1 = imageSize.map(function (value) {
    return value / maxZoom;
  });
  var bounds = [[0, 0], sizeForZoom1.reverse()];
  var map = L.map(mapEl, {
    zoomControl: false,
    scrollWheelZoom: false,
    zoom: 1,
    minZoom: 1,
    maxZoom: maxZoom,
    center: [357.29526544748063, 460],
    maxBoundsViscosity: 1,
    // do not allow drag outside bounds
    crs: L.CRS.Simple
  });
  map.setMaxBounds(new L.LatLngBounds(bounds));
  map.on("click", showClickCoords);
  addCustomZoom(map);
  addImage(map, bounds);
  addMarkers(map);
  addLogo(map);
}

function showClickCoords(e) {
  var _e$latlng = e.latlng,
      lat = _e$latlng.lat,
      lng = _e$latlng.lng;
  console.log([lat, lng]);
}

function addCustomZoom(map) {
  L.control.zoom({
    zoomInTitle: "",
    zoomOutTitle: ""
  }).addTo(map);
}

function addImage(map, bounds) {
  L.imageOverlay("img/map-location/1.jpeg", [[0, 0], bounds]).addTo(map);
}

function addLogo(map) {
  var divIcon = L.divIcon({
    className: "map-location__logo",
    iconAnchor: [60, 60]
  });
  L.marker([356.79938336782527, 607], {
    icon: divIcon
  }).addTo(map);
}

function addMarkers(map) {
  var points = [{
    coords: [241.3476105503231, 534.375],
    type: "park",
    title: "ПКиО им. В.И. Ленина",
    description: "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина"
  }, {
    coords: [371.7971026734806, 354.5],
    type: "school",
    title: "ПКиО им. В.И. Ленина",
    description: "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина"
  }, {
    coords: [437.2972293787219, 530.5],
    type: "park",
    title: "ПКиО им. В.И. Ленина",
    description: "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина"
  }, {
    coords: [500.29152764286016, 489.5],
    type: "pharmacy",
    title: "ПКиО им. В.И. Ленина",
    description: "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина"
  }];
  var types = Object.keys(points.reduce(function (obj, point) {
    obj[point.type] = true;
    return obj;
  }, {}));
  types.forEach(function (type) {
    map.createPane(type + "Markers");
  });
  points.forEach(function (point) {
    var divIcon = L.divIcon({
      className: "map-location__icon",
      html: "<svg class=\"icon\">\n                    <use\n                        xlink:href=\"img/icons/categories/sprite.svg#".concat(point.type, "\"\n                    ></use>\n                </svg>"),
      iconAnchor: [24, 48],
      popupAnchor: [0, -48]
    });
    L.marker(point.coords, {
      icon: divIcon,
      pane: point.type + "Markers"
    }).bindPopup("<aside class=\"panel-location\">\n                <div class=\"panel-location__header\">\n                    <h2 class=\"panel-location__h1\">\n                        ".concat(point.title, "\n                    </h2>\n                </div>\n                <div class=\"panel-location__desc\">\n                    ").concat(point.description, "\n                </div>\n            </aside>")).addTo(map);
  });
  $(document).on("click", ".nav-category a", function (e) {
    e.preventDefault();
    $(this).closest("li").addClass("active").siblings().removeClass("active");
    var filterBy = $(this).data("filter");
    var panes = map.getPanes();

    for (var _i = 0, _Object$entries = Object.entries(panes); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          pane = _Object$entries$_i[1];

      if (!key.match(/Markers$/)) continue;
      pane.style.display = filterBy === "all" || key === filterBy + "Markers" ? "block" : "none";
    }

    map.closePopup();
  });
}

$(function () {
  $(".map-location").each(function () {
    var mapEl = $(this).find(".map-location__box").get(0);
    initMap(mapEl);
  });
});

/***/ }),

/***/ "./src/js/modules/scroll-jquery.js":
/*!*****************************************!*\
  !*** ./src/js/modules/scroll-jquery.js ***!
  \*****************************************/
/***/ (function() {

$(function () {
  $(".scroll-jquery").scrollbar();
});

/***/ }),

/***/ "./src/js/modules/section-about.js":
/*!*****************************************!*\
  !*** ./src/js/modules/section-about.js ***!
  \*****************************************/
/***/ (function() {

var $section = $();
var $inner = $();
var $name = $();

function updateScrollDeps() {
  var initialShift = 0;
  var maxShift = $name.offset().left - $inner.offset().left;
  var scrollReactionShift = 500;
  var scrollTop = $(window).scrollTop();
  var scrollProgress = (scrollTop - $section.offset().top + scrollReactionShift) / $section.outerHeight();
  var newShift = scrollProgress < 0 ? initialShift : scrollProgress > 1 ? maxShift : initialShift + scrollProgress * (Math.abs(maxShift) - Math.abs(initialShift));
  $section[0].style.setProperty("--name-shift", -newShift + "px");
}

function handleWindowScroll() {
  requestAnimationFrame(function () {
    updateScrollDeps();
  });
}

$(function () {
  $section = $("#section-about");
  $inner = $section.find(".section-about__inner");
  $name = $section.find(".section-about__name");
  if ($section.length === 0) return;

  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(window).on("scroll", handleWindowScroll);
      } else {
        $(window).off("scroll", handleWindowScroll);
      }
    });
  };

  var options = {
    // root: по умолчанию window, но можно задать любой элемент-контейнер
    rootMargin: "0px 0px 0px 0px",
    threshold: 0
  };
  var observer = new IntersectionObserver(callback, options);
  observer.observe($section[0]);
});

/***/ }),

/***/ "./src/js/modules/section-people.js":
/*!******************************************!*\
  !*** ./src/js/modules/section-people.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_shuffle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/shuffle */ "./node_modules/lodash/shuffle.js");
/* harmony import */ var lodash_shuffle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_shuffle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grid_people__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid-people */ "./src/js/modules/grid-people.js");


var $section = $();

function markFlippedCards() {
  // create empty cells first
  if (!_grid_people__WEBPACK_IMPORTED_MODULE_1__.GridPeople.isInitialized()) {
    _grid_people__WEBPACK_IMPORTED_MODULE_1__.GridPeople.addEmptyCells();
  }

  var rowWidth = $section.find(".grid-people").outerWidth();
  var itemWidth = $section.find(".grid-people > div").outerWidth();
  var countPerRow = Math.floor(rowWidth / itemWidth);
  var visibleRows = 2;
  var visibleCells = $section.find(".grid-people > div").toArray().slice(0, countPerRow * visibleRows);
  var randomCells = lodash_shuffle__WEBPACK_IMPORTED_MODULE_0___default()(visibleCells).slice(0, 4);
  randomCells.forEach(function (elem, index) {
    $(elem).find(".card-person").addClass("flipped").addClass("delay-" + (index + 1));
  });
}

$(function () {
  $section = $("#section-people");
  if ($section.length === 0) return;
  markFlippedCards();
  var $clippedCards = $(".card-person.flipped");
  ScrollTrigger.create({
    trigger: "#section-people",
    start: "top bottom",
    end: "bottom top",
    onEnter: function onEnter() {
      $clippedCards.addClass("active");
    },
    onLeaveBack: function onLeaveBack() {
      $clippedCards.removeClass("active");
    },
    markers: false
  });
});

/***/ }),

/***/ "./src/js/modules/slider-cameras.js":
/*!******************************************!*\
  !*** ./src/js/modules/slider-cameras.js ***!
  \******************************************/
/***/ (function() {

$(function () {
  $(".slider-cameras").each(function () {
    var $root = $(this).closest(".js-slider-root");
    var swiper = new Swiper($(this).find(".swiper")[0], {
      slidesPerView: "auto",
      navigation: {
        nextEl: $root.find(".js-slider-next")[0],
        prevEl: $root.find(".js-slider-prev")[0]
      }
    });
  });
});

/***/ }),

/***/ "./src/js/modules/slider-docs.js":
/*!***************************************!*\
  !*** ./src/js/modules/slider-docs.js ***!
  \***************************************/
/***/ (function() {

$(function () {
  $(".slider-docs").each(function () {
    var $root = $(this).closest(".js-slider-root");
    var swiper = new Swiper($(this).find(".swiper")[0], {
      slidesPerView: "auto",
      navigation: {
        nextEl: $root.find(".js-slider-next")[0],
        prevEl: $root.find(".js-slider-prev")[0]
      }
    });
  });
});

/***/ }),

/***/ "./src/js/modules/slider-menu.js":
/*!***************************************!*\
  !*** ./src/js/modules/slider-menu.js ***!
  \***************************************/
/***/ (function() {

$(function () {
  $(".slider-menu").each(function () {
    var $root = $(this).closest(".js-slider-root");
    var swiper = new Swiper($(this).find(".swiper")[0], {
      freeMode: true,
      slidesPerView: "auto",
      navigation: {
        nextEl: $root.find(".js-slider-next")[0],
        prevEl: $root.find(".js-slider-prev")[0]
      }
    });
  });
});

/***/ }),

/***/ "./src/js/modules/slider-news.js":
/*!***************************************!*\
  !*** ./src/js/modules/slider-news.js ***!
  \***************************************/
/***/ (function() {

$(function () {
  $(".slider-news").each(function () {
    var $root = $(this).closest(".js-slider-root");
    var swiper = new Swiper($(this).find(".swiper")[0], {
      slidesPerView: "auto",
      navigation: {
        nextEl: $root.find(".js-slider-next")[0],
        prevEl: $root.find(".js-slider-prev")[0]
      }
    });
  });
});

/***/ }),

/***/ "./src/js/modules/slider-payways.js":
/*!******************************************!*\
  !*** ./src/js/modules/slider-payways.js ***!
  \******************************************/
/***/ (function() {

$(function () {
  $(".slider-payways").each(function () {
    var $root = $(this).closest(".js-slider-root");
    var swiper = new Swiper($(this).find(".swiper")[0], {
      slidesPerView: "auto",
      navigation: {
        nextEl: $root.find(".js-slider-next")[0],
        prevEl: $root.find(".js-slider-prev")[0]
      }
    });
  });
});

/***/ }),

/***/ "./src/js/modules/slider-people.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider-people.js ***!
  \*****************************************/
/***/ (function() {

$(function () {
  $(".slider-people").each(function () {
    var _this = this;

    var $root = $(this).closest(".js-slider-root");
    var swiper = null;
    var mediaQueryMobile = window.matchMedia("(max-width: 999.98px)");

    var handleMediaChange = function handleMediaChange(event) {
      if (!event.matches) {
        swiper = new Swiper($(_this).find(".swiper")[0], {
          slidesPerView: "auto",
          navigation: {
            nextEl: $root.find(".js-slider-next")[0],
            prevEl: $root.find(".js-slider-prev")[0]
          },
          speed: 800
        });
      } else {
        if (swiper) {
          swiper.destroy();
        }
      }
    };

    mediaQueryMobile.addEventListener("change", handleMediaChange);
    handleMediaChange(mediaQueryMobile);
  });
});

/***/ }),

/***/ "./src/js/modules/slider-plans.js":
/*!****************************************!*\
  !*** ./src/js/modules/slider-plans.js ***!
  \****************************************/
/***/ (function() {

$(function () {
  $(".slider-plans").each(function () {
    var $root = $(this).closest(".js-slider-root");
    var swiper = new Swiper($(this).find(".swiper")[0], {
      slidesPerView: "auto",
      navigation: {
        nextEl: $root.find(".js-slider-next")[0],
        prevEl: $root.find(".js-slider-prev")[0]
      }
    });
  });
});

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function() {

var ACTIVE_CLASS = "active";

var setActiveTab = function setActiveTab($tabsRoot, index, target) {
  var isHistory = $tabsRoot.data("history");
  $tabsRoot.find("li").removeClass(ACTIVE_CLASS).eq(index).addClass(ACTIVE_CLASS);

  if (isHistory) {
    var url = new URL(location);
    url.searchParams.set("tab", target.replace("#", ""));
    history.pushState({}, "", url);
  }

  showTarget(target);
};

var showTarget = function showTarget(target) {
  // show all tabs
  if ($(target).hasClass("tabs-content")) {
    $(target).children().addClass(ACTIVE_CLASS);
    return;
  }

  $(target).siblings().removeClass(ACTIVE_CLASS).end().addClass(ACTIVE_CLASS);
};

function handleTabClick(e) {
  e.preventDefault();
  var index = $(this).parent().index();
  var $tabsRoot = $(this).closest(".js-tabs");
  var target = $(this).attr("href");
  setActiveTab($tabsRoot, index, target);
}

function switchToUrlTab() {
  var tab = new URL(location).searchParams.get("tab");

  if (tab) {
    $("a[href=\"#".concat(tab, "\"]")).trigger("click");
  }
}

$(function () {
  $(document).on("click", ".js-tabs a", handleTabClick);
  switchToUrlTab();
});

/***/ }),

/***/ "./src/js/modules/utils.js":
/*!*********************************!*\
  !*** ./src/js/modules/utils.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isOutsideOf": function() { return /* binding */ isOutsideOf; },
/* harmony export */   "getNoun": function() { return /* binding */ getNoun; },
/* harmony export */   "getISODate": function() { return /* binding */ getISODate; },
/* harmony export */   "sleep": function() { return /* binding */ sleep; },
/* harmony export */   "getRandomInt": function() { return /* binding */ getRandomInt; }
/* harmony export */ });
function isOutsideOf(el, selector) {
  return $(el).closest(selector).length === 0;
}
function getNoun(number, one, two, five) {
  var n = Math.abs(number);
  n %= 100;

  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
}
function getISODate(date) {
  return new Date(date + " UTC").toISOString().substr(0, 10);
}
var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayShuffle.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_arrayShuffle.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    shuffleSelf = __webpack_require__(/*! ./_shuffleSelf */ "./node_modules/lodash/_shuffleSelf.js");

/**
 * A specialized version of `_.shuffle` for arrays.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}

module.exports = arrayShuffle;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseRandom.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseRandom.js ***!
  \********************************************/
/***/ (function(module) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeRandom = Math.random;

/**
 * The base implementation of `_.random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the random number.
 */
function baseRandom(lower, upper) {
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}

module.exports = baseRandom;


/***/ }),

/***/ "./node_modules/lodash/_baseShuffle.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseShuffle.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shuffleSelf = __webpack_require__(/*! ./_shuffleSelf */ "./node_modules/lodash/_shuffleSelf.js"),
    values = __webpack_require__(/*! ./values */ "./node_modules/lodash/values.js");

/**
 * The base implementation of `_.shuffle`.
 *
 * @private
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function baseShuffle(collection) {
  return shuffleSelf(values(collection));
}

module.exports = baseShuffle;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_baseValues.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseValues.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js");

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_shuffleSelf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_shuffleSelf.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseRandom = __webpack_require__(/*! ./_baseRandom */ "./node_modules/lodash/_baseRandom.js");

/**
 * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @param {number} [size=array.length] The size of `array`.
 * @returns {Array} Returns `array`.
 */
function shuffleSelf(array, size) {
  var index = -1,
      length = array.length,
      lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
        value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}

module.exports = shuffleSelf;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "./node_modules/lodash/shuffle.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/shuffle.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayShuffle = __webpack_require__(/*! ./_arrayShuffle */ "./node_modules/lodash/_arrayShuffle.js"),
    baseShuffle = __webpack_require__(/*! ./_baseShuffle */ "./node_modules/lodash/_baseShuffle.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  var func = isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}

module.exports = shuffle;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/values.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/values.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseValues = __webpack_require__(/*! ./_baseValues */ "./node_modules/lodash/_baseValues.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),

/***/ "./node_modules/throttle-debounce/esm/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/throttle-debounce/esm/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": function() { return /* binding */ debounce; },
/* harmony export */   "throttle": function() { return /* binding */ throttle; }
/* harmony export */ });
/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
 *                                            are most useful.
 * @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
 *                                            as-is, to `callback` when the throttled-function is executed.
 * @param {object} [options] -              An object to configure options.
 * @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
 *                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
 *                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
 *                                            `delay` milliseconds, the internal counter is reset).
 * @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
 *                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
 *                                            callback will never executed if both noLeading = true and noTrailing = true.
 * @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
 *                                            false (at end), schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function} A new, throttled, function.
 */
function throttle (delay, callback, options) {
  var _ref = options || {},
      _ref$noTrailing = _ref.noTrailing,
      noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing,
      _ref$noLeading = _ref.noLeading,
      noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading,
      _ref$debounceMode = _ref.debounceMode,
      debounceMode = _ref$debounceMode === void 0 ? undefined : _ref$debounceMode;
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */


  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel(options) {
    var _ref2 = options || {},
        _ref2$upcomingOnly = _ref2.upcomingOnly,
        upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;

    clearExistingTimeout();
    cancelled = !upcomingOnly;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (!noLeading && debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`
       * and noLeading != true.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        /*
         * In throttle mode with noLeading, if `delay` time has
         * been exceeded, update `lastExec` and schedule `callback`
         * to execute after `delay` ms.
         */
        lastExec = Date.now();

        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        /*
         * In throttle mode without noLeading, if `delay` time has been exceeded, execute
         * `callback`.
         */
        exec();
      }
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

/* eslint-disable no-undefined */
/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                        to `callback` when the debounced-function is executed.
 * @param {object} [options] -           An object to configure options.
 * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 *
 * @returns {Function} A new, debounced function.
 */

function debounce (delay, callback, options) {
  var _ref = options || {},
      _ref$atBegin = _ref.atBegin,
      atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;

  return throttle(delay, callback, {
    debounceMode: atBegin !== false
  });
}


//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/defaults */ "./src/js/modules/defaults.js");
/* harmony import */ var _modules_defaults__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_defaults__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/api */ "./src/js/modules/api.js");
/* harmony import */ var _modules_api__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_api__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_developers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/developers */ "./src/js/modules/developers.js");
/* harmony import */ var _modules_developers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_developers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_demo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/demo */ "./src/js/modules/demo.js");
/* harmony import */ var _modules_demo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_demo__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_tabs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_slider_plans__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider-plans */ "./src/js/modules/slider-plans.js");
/* harmony import */ var _modules_slider_plans__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_plans__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_slider_news__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider-news */ "./src/js/modules/slider-news.js");
/* harmony import */ var _modules_slider_news__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_news__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_slider_docs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/slider-docs */ "./src/js/modules/slider-docs.js");
/* harmony import */ var _modules_slider_docs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_docs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_slider_payways__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/slider-payways */ "./src/js/modules/slider-payways.js");
/* harmony import */ var _modules_slider_payways__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_payways__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _modules_slider_cameras__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/slider-cameras */ "./src/js/modules/slider-cameras.js");
/* harmony import */ var _modules_slider_cameras__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_cameras__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _modules_slider_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/slider-menu */ "./src/js/modules/slider-menu.js");
/* harmony import */ var _modules_slider_menu__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_menu__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _modules_slider_people__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/slider-people */ "./src/js/modules/slider-people.js");
/* harmony import */ var _modules_slider_people__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_people__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _modules_intro_zhk__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/intro-zhk */ "./src/js/modules/intro-zhk.js");
/* harmony import */ var _modules_bottom_menu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/bottom-menu */ "./src/js/modules/bottom-menu.js");
/* harmony import */ var _modules_bottom_menu__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_modules_bottom_menu__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _modules_section_about__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/section-about */ "./src/js/modules/section-about.js");
/* harmony import */ var _modules_section_about__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_modules_section_about__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _modules_section_people__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/section-people */ "./src/js/modules/section-people.js");
/* harmony import */ var _modules_grid_people__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/grid-people */ "./src/js/modules/grid-people.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_modules_accordion__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _modules_map_contacts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/map-contacts */ "./src/js/modules/map-contacts.js");
/* harmony import */ var _modules_map_location__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/map-location */ "./src/js/modules/map-location.js");
/* harmony import */ var _modules_map_location__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_modules_map_location__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _modules_scroll_jquery__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/scroll-jquery */ "./src/js/modules/scroll-jquery.js");
/* harmony import */ var _modules_scroll_jquery__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_modules_scroll_jquery__WEBPACK_IMPORTED_MODULE_20__);





















}();
/******/ })()
;