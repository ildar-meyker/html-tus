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







}();
/******/ })()
;