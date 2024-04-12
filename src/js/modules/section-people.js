import shuffle from "lodash/shuffle";
import { GridPeople } from "./grid-people";
import isDesktop from "../helpers/isDesktop";
import relativeOffset from "../helpers/relativeOffset";

let $section = $();
let $activePanelClone = $();

function markFlippedCards() {
    // create empty cells first
    if (!GridPeople.isInitialized()) {
        GridPeople.addEmptyCells();
    }

    const rowWidth = $section.find(".grid-people").outerWidth();
    const itemWidth = $section.find(".grid-people > div").outerWidth();
    const countPerRow = Math.floor(rowWidth / itemWidth);
    const visibleRows = 2;

    const visibleCells = $section
        .find(".grid-people > div")
        .toArray()
        .slice(0, countPerRow * visibleRows);

    const randomCells = shuffle(visibleCells).slice(0, 4);

    randomCells.forEach((elem, index) => {
        $(elem)
            .find(".card-person")
            .addClass("flipped")
            .addClass("delay-" + (index + 1));
    });
}

function calculateDirection(panelOffset, panelWidth, $container) {
    const panelEndX = panelOffset.left + panelWidth;
    const panelEndY = panelOffset.top + panelWidth;

    let direction = new Array(2);

    if (panelEndX > $container.outerWidth()) {
        direction[1] = "right";
    } else {
        direction[1] = "left";
    }

    if (panelOffset.top > 0) {
        direction[0] = "bottom";
    } else {
        direction[0] = "top";
    }

    return direction.join(" ");
}

function handlePersonClick() {
    if (isDesktop()) return;

    const quoteId = $(this).data("quote-id");

    $section.find(".grid-people > div.active").removeClass("active");
    $(this).closest("div").addClass("active");

    const swiper = $section.find(".slider-quotes").data("swiper");

    swiper.slideTo(quoteId - 1);
}

function handleOutsideClick(e) {
    if (
        $(e.target).closest(".panel-person, .card-person__btn-expand")
            .length === 0
    ) {
        $activePanelClone.remove();
    }
}

function handleCloseClick() {
    $activePanelClone.remove();
}

function handleExpandClick() {
    $activePanelClone.remove();

    const $cardPerson = $(this).closest(".card-person");
    const $container = $cardPerson.closest(".slider-people");

    const quoteId = $cardPerson.data("quote-id");

    const $panelClone = $section
        .find(".slider-quotes .swiper-slide")
        .eq(quoteId - 1)
        .find(".panel-person")
        .clone()
        .addClass("panel-person--expanded");

    $activePanelClone = $panelClone;

    $panelClone.appendTo($container);

    const GAP_BETWEEN_CARDS = 16;
    const cardWidth = $cardPerson.outerWidth();
    const panelWidth = cardWidth * 2 + GAP_BETWEEN_CARDS;
    const offsetShift = cardWidth + GAP_BETWEEN_CARDS;
    const panelOffset = relativeOffset($cardPerson, $container);

    const direction = calculateDirection(panelOffset, panelWidth, $container);

    let position;

    switch (direction) {
        case "top left":
            position = {
                transformOrigin: "0% 0%",
                top: panelOffset.top,
                left: panelOffset.left,
            };
            break;

        case "bottom left":
            position = {
                transformOrigin: "0% 100%",
                top: panelOffset.top - offsetShift,
                left: panelOffset.left,
            };
            break;

        case "top right":
            position = {
                transformOrigin: "100% 0%",
                top: panelOffset.top,
                left: panelOffset.left - offsetShift,
            };
            break;

        case "bottom right":
            position = {
                transformOrigin: "100% 100%",
                top: panelOffset.top - offsetShift,
                left: panelOffset.left - offsetShift,
            };
            break;
    }

    gsap.fromTo(
        $panelClone.get(0),
        {
            position: "absolute",
            zIndex: 100,
            width: panelWidth,
            height: panelWidth,
            scale: 0,
            ...position,
            duration: 0.3,
        },
        {
            scale: 1,
            duration: 0.3,
        }
    );
}

$(function () {
    $section = $("#section-people");

    if ($section.length === 0) return;

    markFlippedCards();

    $(document).on("click", "#section-people .card-person", handlePersonClick);
    $(document).on(
        "click",
        "#section-people .card-person__btn-expand",
        handleExpandClick
    );

    $(document).on("click", ".panel-person__btn-expand", handleCloseClick);

    $(document).on("click", handleOutsideClick);

    window.addEventListener("resize", () => {
        $activePanelClone.remove();
    });

    window.addEventListener("load", () => {
        const $flippedCards = $(".card-person.flipped");

        ScrollTrigger.create({
            trigger: "#section-people",
            start: "top bottom",
            end: "bottom top",
            onEnter: function () {
                $flippedCards.addClass("active");
            },
            onLeaveBack: function () {
                $flippedCards.removeClass("active");
            },
            // markers: true,
        });
    });
});
