import isDesktop from "../helpers/isDesktop";

let currentIndex = 0;
let trackingTimer = null;
let isTrackingAllowed = false;
let isAnimating = false;
let $section = $();
let $center = $();
let $circle = $();

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

    const mobileMixin = isDesktop() ? {} : { duration: 0 };

    if (direction === 1) {
        gsap.fromTo(
            $nextSlide.get(0),
            { ...rightState, ...comingZIndex, ...mobileMixin },
            { ...middleState, ...comingZIndex, ...mobileMixin }
        );

        gsap.fromTo(
            $currentSlide.get(0),
            { ...middleState, ...leavingZIndex, ...mobileMixin },
            { ...leftState, ...leavingZIndex, ...mobileMixin }
        );
    } else {
        gsap.fromTo(
            $nextSlide.get(0),
            { ...leftState, ...comingZIndex, ...mobileMixin },
            { ...middleState, ...comingZIndex, ...mobileMixin }
        );

        gsap.fromTo(
            $currentSlide.get(0),
            { ...middleState, ...leavingZIndex, ...mobileMixin },
            { ...rightState, ...leavingZIndex, ...mobileMixin }
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

function handleMouseMove(e) {
    if (!isTrackingAllowed) return;

    const { pageX, pageY } = e;

    gsap.to($circle.get(0), {
        top: pageY - $section.offset().top,
        left: pageX - $center.offset().left,
    });
}

$(function () {
    if ($("#section-tour").length === 0) return;

    $section = $("#section-tour");
    $center = $section.find(".section-tour__center");
    $circle = $section.find(".section-tour__circle");

    $(document).on("click", "#section-tour .js-slider-prev", handlePrevBtn);
    $(document).on("click", "#section-tour .js-slider-next", handleNextBtn);
    $(document).on("click", "#section-tour .nav-tour a ", handleNamesItem);
    $(document).on(
        "click",
        "#section-tour .section-tour__tabs button ",
        handleButtonItem
    );

    $(document).on("mousemove", "#section-tour", handleMouseMove);
});

$(window).on("load", () => {
    gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: "#section-tour",
            start: "top center",
            end: "bottom top",
            onEnter: () => {
                trackingTimer = setTimeout(() => {
                    isTrackingAllowed = true;
                }, 1000);
            },
            onLeaveBack: () => {
                clearTimeout(trackingTimer);

                isTrackingAllowed = false;

                $circle.get(0).style = "";
            },
        },
    });

    gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".section-tour__circle__text",
            start: "top bottom",
            end: "bottom+=200 top",
            scrub: 0.5,
            markers: true,
        },
    })
        .addLabel("rotate")
        .from(
            ".section-tour__circle__text",
            {
                scale: 0.8,
                duration: 1,
                delay: 1,
            },
            "rotate"
        )
        .to(
            ".section-tour__circle__text",
            {
                rotate: 360,
                duration: 5,
            },
            "rotate"
        );
});
