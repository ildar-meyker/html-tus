let $section = $();
let $sliderMenu = $();
let $btnHeart = $();

function toggleMenuStyle() {
    const scrollTop = $(window).scrollTop();

    const isDarkMode = $section.outerHeight() < scrollTop + $(window).height();

    $btnHeart.toggleClass("btn-heart--dark", isDarkMode);
    $sliderMenu.toggleClass("slider-menu--dark", isDarkMode);

}

$(function () {
    $section = $("#intro-zhk");
    $sliderMenu = $("#intro-zhk__menu .slider-menu");
    $btnHeart = $("#intro-zhk__menu .btn-heart");

    if ($section.length === 0) return;

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            toggleMenuStyle();
        });
    };

    const options = {
        // root: по умолчанию window, но можно задать любой элемент-контейнер
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(document.querySelector(".l-zhk__filter"));
});
