let $section = $();
let $inner = $();
let $name = $();

function updateScrollDeps() {
    const initialShift = 0;
    const maxShift = $name.offset().left - $inner.offset().left;
    const scrollReactionShift = 500;

    const scrollTop = $(window).scrollTop();

    const scrollProgress =
        (scrollTop - $section.offset().top + scrollReactionShift) /
        $section.outerHeight();

    const newShift =
        scrollProgress < 0
            ? initialShift
            : scrollProgress > 1
            ? maxShift
            : initialShift +
              scrollProgress * (Math.abs(maxShift) - Math.abs(initialShift));

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

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(window).on("load scroll", handleWindowScroll);
            } else {
                $(window).off("load scroll", handleWindowScroll);
            }
        });
    };

    const options = {
        // root: по умолчанию window, но можно задать любой элемент-контейнер
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe($section[0]);
});
