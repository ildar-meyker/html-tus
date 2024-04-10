import isDesktop from "../helpers/isDesktop";

let leaveTimer = null;

let $section = $();
let $image = $();
let $panels = $();
let $btnDown = $();

let initialScale;
let fullScale;

function transformScrollTopToStyles() {
    const fullScaleAtScrollTop = $image.offset().top;
    const scrollTop = $(window).scrollTop();

    const restScale = fullScale - initialScale;
    const scrollProgress =
        scrollTop < fullScaleAtScrollTop ? scrollTop / fullScaleAtScrollTop : 1;

    const initialBorderRadius = 16;

    return {
        newScale: initialScale + restScale * scrollProgress,
        newBorderRadius: initialBorderRadius * (1 - scrollProgress),
    };
}

function updateScrollDeps() {
    const { newScale, newBorderRadius } = transformScrollTopToStyles();

    $image.css({
        transform: `scale(${newScale})`,
    });

    $image[0].style.setProperty("--border-radius", newBorderRadius + "px");

    $section.toggleClass("intro-zhk--full-scale", fullScale - newScale < 0.1);

    $btnDown.toggleClass("active", newScale < 0.8 * fullScale);
}

function toggleInactive() {
    const scrollTop = $(window).scrollTop();

    const isInactive = $section.outerHeight() < scrollTop + 700;

    $section.toggleClass("intro-zhk--inactive", isInactive);
}

function updateScaleVariables() {
    initialScale = parseFloat(
        getComputedStyle($image.get(0)).getPropertyValue("--initial-scale")
    );

    const windowHeight = $(window).height();

    if (isDesktop()) {
        fullScale = 1;

        $section.get(0).style = "";
    } else {
        const imageRatio = 0.9339;
        const imageHeight = $(window).width() * imageRatio;

        fullScale = windowHeight / imageHeight;

        $section.outerHeight($image.offset().top + windowHeight);
    }
}

function handleWindowScroll() {
    console.log("handleWindowScroll");

    requestAnimationFrame(() => {
        updateScrollDeps();
        toggleInactive();
    });
}

function handlePanelEnter() {
    clearTimeout(leaveTimer);
}

function handlePanelLeave() {
    closeActivePanels();
}

function handleFloorEnter(e) {
    closeActivePanels();
    const target = $(e.target).data("target");
    $(this).addClass("hover");
    $(target).addClass("active");
}

function handleBuildingLeave(e) {
    leaveTimer = setTimeout(() => {
        closeActivePanels();
    }, 200);
}

function closeActivePanels() {
    $panels.filter(".active").removeClass("active");
    $(".intro-zhk__floors__item.hover").removeClass("hover");
}

function handleWindowLoad() {
    console.log("handleWindowLoad");

    updateScaleVariables();

    $section.addClass("intro-zhk--loaded");

    setTimeout(() => {
        $image.addClass("intro-zhk__image--no-transition");
        $(".page__locker").removeClass("active");
    }, 1200);
}

function handleWindowResize() {
    updateScaleVariables();
}

function handleScrollDown() {
    window.scroll({
        top: $image.offset().top,
        behavior: "smooth",
    });
}

$(function () {
    $section = $("#intro-zhk");
    $image = $section.find(".intro-zhk__image");
    $btnDown = $section.find(".intro-zhk__btn-down");
    $panels = $section.find(".intro-zhk__panel");

    if ($section.length === 0) return;

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(window).on("scroll", handleWindowScroll);
            } else {
                $(window).off("scroll", handleWindowScroll);
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

    $(document).on("mouseenter", ".intro-zhk__floors__item", handleFloorEnter);
    $(document).on("mouseleave", ".intro-zhk__floors", handleBuildingLeave);
    $(document).on("mouseenter", ".intro-zhk__panel", handlePanelEnter);
    $(document).on("mouseleave", ".intro-zhk__panel", handlePanelLeave);
    $(document).on("click", ".intro-zhk__btn-down", handleScrollDown);

    $(window).on("load", handleWindowLoad);
    $(window).on("resize orientationchange", handleWindowResize);
});
