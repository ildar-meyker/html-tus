$(function () {
    $(".slider-quotes").each(function () {
        const $root = $(this).closest(".js-slider-root");

        let swiper = null;

        const mediaQueryMobile = window.matchMedia("(max-width: 999.98px)");

        const handleMediaChange = (event) => {
            if (event.matches) {
                swiper = new Swiper($(this).find(".swiper")[0], {
                    effect: "fade",
                    allowTouchMove: false,
                });

                $(this).data("swiper", swiper);
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
