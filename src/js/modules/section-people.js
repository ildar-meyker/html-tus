import shuffle from "lodash/shuffle";
import { GridPeople } from "./grid-people";

let $section = $();

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

$(function () {
    $section = $("#section-people");

    if ($section.length === 0) return;

    markFlippedCards();

    // // Инициализация контроллера ScrollMagic
    // var controller = new ScrollMagic.Controller();

    // // Создаем сцену ScrollMagic
    // var scene = new ScrollMagic.Scene({
    //     triggerElement: "#section-people",
    //     triggerHook: 0.5,
    //     reverse: true,
    // })
    //     // Добавляем класс при входе в зону видимости
    //     .setClassToggle(".card-person.flipped", "active")
    //     // Добавляем сцену к контроллеру
    //     .addTo(controller);
    // // Для отладки добавляем индикаторы
    // // .addIndicators();
});
