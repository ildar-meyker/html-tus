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

const offsetTop = $(".intro-zhk__image").offset().top;

$(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop() + 0.1;

    const fullZoomDistance = offsetTop;
    const distancePercentage =
        scrollTop < fullZoomDistance ? scrollTop / fullZoomDistance : 1;

    $(".intro-zhk__image").css(
        "transform",
        `scale(${0.46 + 0.54 * distancePercentage})`
    );
});
