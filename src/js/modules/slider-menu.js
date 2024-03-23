$(function () {
    $(".slider-menu").each(function () {
        const $root = $(this).closest(".js-slider-root");
        const swiper = new Swiper($(this).find(".swiper")[0], {
            freeMode: true,
            slidesPerView: "auto",
            navigation: {
                nextEl: $root.find(".js-slider-next")[0],
                prevEl: $root.find(".js-slider-prev")[0],
            },
        });
    });
});
