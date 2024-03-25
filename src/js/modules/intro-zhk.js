let leaveTimer = null;

let $section = $();
let $image = $();
let $panels = $();

function transformScrollTopToStyles() {
    const fullScaleAtScrollTop = $image.offset().top;
    const scrollTop = $(window).scrollTop();

    const initialScale = 0.46;
    const restScale = 1 - initialScale;
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

    $section.toggleClass("intro-zhk--full-scale", newScale === 1);
}

function handleWindowScroll() {
    updateScrollDeps();
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
    $(target).addClass("active");
}

function handleBuildingLeave(e) {
    leaveTimer = setTimeout(() => {
        closeActivePanels();
    }, 200);
}

function closeActivePanels() {
    $panels.filter(".active").removeClass("active");
}

function handleWindowLoad() {
    $section.addClass("intro-zhk--loaded");

    setTimeout(() => {
        $image.addClass("intro-zhk__image--scalable");
        $(".page__locker").removeClass("active");
    }, 1200);
}

$(function () {
    $section = $("#intro-zhk");
    $image = $(".intro-zhk__image");
    $panels = $(".intro-zhk__panel");

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

    $(document).on("mouseenter", ".intro-zhk__floors__item", handleFloorEnter);
    $(document).on("mouseleave", ".intro-zhk__floors", handleBuildingLeave);
    $(document).on("mouseenter", ".intro-zhk__panel", handlePanelEnter);
    $(document).on("mouseleave", ".intro-zhk__panel", handlePanelLeave);
    $(window).on("load", handleWindowLoad);
});
