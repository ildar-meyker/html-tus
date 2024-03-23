import "./modules/developers";
import "./modules/tabs";
import "./modules/api";
import "./modules/demo";
import "./modules/slider-plans";
import "./modules/slider-news";
import "./modules/slider-docs";
import "./modules/slider-payways";
import "./modules/slider-cameras";

const offsetTop = $(".test__image").offset().top;

$(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop() + 0.1;

    const fullZoomDistance = offsetTop;
    console.log(fullZoomDistance);
    const distancePercentage =
        scrollTop < fullZoomDistance ? scrollTop / fullZoomDistance : 1;

    $(".test__image").css(
        "transform",
        `scale(${0.46 + 0.54 * distancePercentage})`
    );
});
