function handleWindowScroll() {
    const initialShift = "-108"; // percent
    const maxShift = "-210"; // percent

    const $section = $(".section-about");
    const scrollTop = $(window).scrollTop();

    const scrollProgress =
        ((scrollTop - $section.offset().top) / $section.outerHeight()) * 2;

    const newShift =
        scrollProgress < 0
            ? initialShift
            : scrollProgress > 1
            ? maxShift
            : initialShift -
              scrollProgress * (Math.abs(maxShift) - Math.abs(initialShift));

    $section[0].style.setProperty("--name-shift", newShift + "%");
}

$(function () {
    $(window).on("scroll", handleWindowScroll);
});
