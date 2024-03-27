import { debounce } from "throttle-debounce";
import { getRandomInt } from "./utils";

let $grids = $();

function addEmptyCells() {
    $grids.each(function () {
        const $allCells = $(this).find(" > div");
        const $originalCells = $allCells.not(".empty");
        const $emptyCells = $allCells.filter(".empty");

        const rowWidth = $(this).outerWidth();
        const itemWidth = $originalCells.outerWidth();

        const countPerRow = Math.floor(rowWidth / itemWidth);
        const emptyPercent = 0.3;
        const emptyCount = Math.floor(countPerRow * 2 * emptyPercent);

        $emptyCells.remove();

        for (let i = 0, p = 1; i < emptyCount; i++, p += getRandomInt(1, 2)) {
            $('<div class="empty"></div>').insertAfter($originalCells.eq(p));
        }
    });
}

function handleWindowResize() {
    if ($(window).width() < 1000) return;

    addEmptyCells();
}

$(function () {
    $grids = $(".grid-people");

    if ($grids.length === 0) return;

    addEmptyCells();

    $(window).on("resize orientationchange", debounce(200, handleWindowResize));
});
