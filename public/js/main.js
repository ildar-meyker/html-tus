/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/api.js":
/*!*******************************!*\
  !*** ./src/js/modules/api.js ***!
  \*******************************/
/***/ (function() {

// const Popup = {
//     showSuccess() {
//         $.magnificPopup.open({
//             items: {
//                 src: "#popup-success",
//                 type: "inline",
//             },
//         });
//     },
// };
// window.Popup = Popup;

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

/***/ "./src/js/modules/demo.js":
/*!********************************!*\
  !*** ./src/js/modules/demo.js ***!
  \********************************/
/***/ (function() {

// // #demo
// $(function () {
//     $(".btn-load").on("click", function (e) {
//         e.preventDefault();
//         $(this).addClass("loading");
//         setTimeout(() => {
//             $(this).removeClass("loading");
//         }, 1500);
//     });
// });

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
/* harmony import */ var throttle_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! throttle-debounce */ "./node_modules/throttle-debounce/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/modules/utils.js");


var $grids = $();

function addEmptyCells() {
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
  addEmptyCells();
}

$(function () {
  $grids = $(".grid-people");
  if ($grids.length === 0) return;
  addEmptyCells();
  $(window).on("resize orientationchange", (0,throttle_debounce__WEBPACK_IMPORTED_MODULE_0__.debounce)(200, handleWindowResize));
});

/***/ }),

/***/ "./src/js/modules/intro-zhk.js":
/*!*************************************!*\
  !*** ./src/js/modules/intro-zhk.js ***!
  \*************************************/
/***/ (function() {

var leaveTimer = null;
var $section = $();
var $image = $();
var $panels = $();
var $btnDown = $();

function transformScrollTopToStyles() {
  var fullScaleAtScrollTop = $image.offset().top;
  var scrollTop = $(window).scrollTop();
  var initialScale = 0.46;
  var restScale = 1 - initialScale;
  var scrollProgress = scrollTop < fullScaleAtScrollTop ? scrollTop / fullScaleAtScrollTop : 1;
  var initialBorderRadius = 16;
  return {
    newScale: initialScale + restScale * scrollProgress,
    newBorderRadius: initialBorderRadius * (1 - scrollProgress)
  };
}

function updateScrollDeps() {
  var _transformScrollTopTo = transformScrollTopToStyles(),
      newScale = _transformScrollTopTo.newScale,
      newBorderRadius = _transformScrollTopTo.newBorderRadius;

  $image.css({
    transform: "scale(".concat(newScale, ")")
  });
  $image[0].style.setProperty("--border-radius", newBorderRadius + "px");
  $section.toggleClass("intro-zhk--full-scale", newScale === 1);
  $btnDown.toggleClass("active", newScale < 0.8);
}

function toggleInactive() {
  var scrollTop = $(window).scrollTop();
  var isInactive = $section.outerHeight() < scrollTop + 700;
  $section.toggleClass("intro-zhk--inactive", isInactive);
}

function handleWindowScroll() {
  updateScrollDeps();
  toggleInactive();
}

function handlePanelEnter() {
  clearTimeout(leaveTimer);
}

function handlePanelLeave() {
  closeActivePanels();
}

function handleFloorEnter(e) {
  closeActivePanels();
  var target = $(e.target).data("target");
  $(target).addClass("active");
}

function handleBuildingLeave(e) {
  leaveTimer = setTimeout(function () {
    closeActivePanels();
  }, 200);
}

function closeActivePanels() {
  $panels.filter(".active").removeClass("active");
}

function handleWindowLoad() {
  $section.addClass("intro-zhk--loaded");
  setTimeout(function () {
    $image.addClass("intro-zhk__image--scalable");
    $(".page__locker").removeClass("active");
  }, 1200);
}

function handleScrollDown() {
  window.scroll({
    top: $image.offset().top,
    behavior: "smooth"
  });
}

$(function () {
  $section = $("#intro-zhk");
  $image = $(".intro-zhk__image");
  $btnDown = $(".intro-zhk__btn-down");
  $panels = $(".intro-zhk__panel");
  if ($section.length === 0) return;

  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(window).on("load scroll", handleWindowScroll);
      } else {
        $(window).off("load scroll", handleWindowScroll);
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
  $(document).on("mouseenter", ".intro-zhk__floors__item", handleFloorEnter);
  $(document).on("mouseleave", ".intro-zhk__floors", handleBuildingLeave);
  $(document).on("mouseenter", ".intro-zhk__panel", handlePanelEnter);
  $(document).on("mouseleave", ".intro-zhk__panel", handlePanelLeave);
  $(document).on("click", ".intro-zhk__btn-down", handleScrollDown);
  $(window).on("load", handleWindowLoad);
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
  updateScrollDeps();
}

$(function () {
  $section = $("#section-about");
  $inner = $section.find(".section-about__inner");
  $name = $section.find(".section-about__name");
  if ($section.length === 0) return;

  var callback = function callback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(window).on("load scroll", handleWindowScroll);
      } else {
        $(window).off("load scroll", handleWindowScroll);
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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_developers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/developers */ "./src/js/modules/developers.js");
/* harmony import */ var _modules_developers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_developers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_tabs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/api */ "./src/js/modules/api.js");
/* harmony import */ var _modules_api__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_api__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_demo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/demo */ "./src/js/modules/demo.js");
/* harmony import */ var _modules_demo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_demo__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_slider_plans__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider-plans */ "./src/js/modules/slider-plans.js");
/* harmony import */ var _modules_slider_plans__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_plans__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_slider_news__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider-news */ "./src/js/modules/slider-news.js");
/* harmony import */ var _modules_slider_news__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_news__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_slider_docs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider-docs */ "./src/js/modules/slider-docs.js");
/* harmony import */ var _modules_slider_docs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_docs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_slider_payways__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/slider-payways */ "./src/js/modules/slider-payways.js");
/* harmony import */ var _modules_slider_payways__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_payways__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_slider_cameras__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/slider-cameras */ "./src/js/modules/slider-cameras.js");
/* harmony import */ var _modules_slider_cameras__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_cameras__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _modules_slider_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/slider-menu */ "./src/js/modules/slider-menu.js");
/* harmony import */ var _modules_slider_menu__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_menu__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _modules_slider_people__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/slider-people */ "./src/js/modules/slider-people.js");
/* harmony import */ var _modules_slider_people__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_modules_slider_people__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _modules_intro_zhk__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/intro-zhk */ "./src/js/modules/intro-zhk.js");
/* harmony import */ var _modules_intro_zhk__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_modules_intro_zhk__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _modules_bottom_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/bottom-menu */ "./src/js/modules/bottom-menu.js");
/* harmony import */ var _modules_bottom_menu__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_modules_bottom_menu__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _modules_section_about__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/section-about */ "./src/js/modules/section-about.js");
/* harmony import */ var _modules_section_about__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_modules_section_about__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _modules_grid_people__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/grid-people */ "./src/js/modules/grid-people.js");















window.history.scrollRestoration = "manual";
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
}();
/******/ })()
;