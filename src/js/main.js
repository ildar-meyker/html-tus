import "./modules/developers";
import "./modules/tabs";
import "./modules/api";
import "./modules/demo";
import "./modules/slider-plans";
import "./modules/slider-news";
import "./modules/slider-docs";
import "./modules/slider-payways";
import "./modules/slider-cameras";
import "./modules/slider-menu";
import "./modules/intro-zhk";
import "./modules/bottom-menu";

window.history.scrollRestoration = "manual";

$(window).on("beforeunload", function () {
    $(window).scrollTop(0);
});
