let currentIndex = 0;
let isAnimating = false;
let $section = $();

const leftState = { autoAlpha: 0, scale: 0.8, x: -50 };
const middleState = { autoAlpha: 1, scale: 1, x: 0 };
const rightState = { autoAlpha: 0, scale: 1.2, x: 50 };

const comingZIndex = { zIndex: 20 };
const leavingZIndex = { zIndex: 10, duration: 0.4 };

function slideTo(options) {
    let { direction, index } = options;

    if (isAnimating) return;
    if (index === currentIndex) return;

    isAnimating = true;

    const $slides = $section.find(".slider-tour__slide");

    const $currentSlide = $slides.eq(currentIndex);

    const minIndex = 0;
    const maxIndex = $slides.length - 1;

    let nextIndex;

    if (direction) {
        nextIndex = currentIndex + direction;

        if (direction === 1 && nextIndex > maxIndex) {
            nextIndex = 0;
        }

        if (direction === -1 && nextIndex < minIndex) {
            nextIndex = maxIndex;
        }
    } else {
        nextIndex = index;
        direction = index > currentIndex ? 1 : -1;
    }

    updateNav(nextIndex);

    const $nextSlide = $slides.eq(nextIndex);

    if (direction === 1) {
        gsap.fromTo(
            $nextSlide.get(0),
            { ...rightState, ...comingZIndex },
            { ...middleState, ...comingZIndex }
        );

        gsap.fromTo(
            $currentSlide.get(0),
            { ...middleState, ...leavingZIndex },
            { ...leftState, ...leavingZIndex }
        );
    } else {
        gsap.fromTo(
            $nextSlide.get(0),
            { ...leftState, ...comingZIndex },
            { ...middleState, ...comingZIndex }
        );

        gsap.fromTo(
            $currentSlide.get(0),
            { ...middleState, ...leavingZIndex },
            { ...rightState, ...leavingZIndex }
        );
    }

    currentIndex = nextIndex;

    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

function updateNav(activeIndex) {
    $section
        .find(".nav-tour li")
        .eq(activeIndex)
        .addClass("active")
        .siblings()
        .removeClass("active");

    $section
        .find(".section-tour__tabs button")
        .eq(activeIndex)
        .addClass("is-active")
        .siblings()
        .removeClass("is-active");
}

function handlePrevBtn() {
    slideTo({
        direction: -1,
    });
}

function handleNextBtn() {
    slideTo({
        direction: 1,
    });
}

function handleNamesItem(e) {
    e.preventDefault();

    const index = $(this).closest("li").index();

    slideTo({
        index,
    });
}

function handleButtonItem() {
    const index = $(this).index();

    slideTo({
        index,
    });
}

$(function () {
    if ($("#section-tour").length === 0) return;

    $section = $("#section-tour");

    $(document).on("click", "#section-tour .js-slider-prev", handlePrevBtn);
    $(document).on("click", "#section-tour .js-slider-next", handleNextBtn);
    $(document).on("click", "#section-tour .nav-tour a ", handleNamesItem);
    $(document).on(
        "click",
        "#section-tour .section-tour__tabs button ",
        handleButtonItem
    );
});
