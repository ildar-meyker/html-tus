import relativeOffset from "../helpers/relativeOffset";

let lastActiveHouseId;
let closingTimer;

function handlePointEnter() {
    const { houseId, panelUrl } = $(this).data();

    clearTimeout(closingTimer);

    if (houseId === lastActiveHouseId) return;

    closeActivePanel();
    showPanel(houseId, panelUrl);
    lastActiveHouseId = houseId;
}

function handlePanelEnter() {
    clearTimeout(closingTimer);
}

function handlePointLeave() {
    closingTimer = setTimeout(() => {
        closeActivePanel();
        lastActiveHouseId = null;
    }, 200);
}

function closeActivePanel() {
    $("#section-genplan__house-" + lastActiveHouseId).removeClass("active");
    $("#section-genplan__panel-" + lastActiveHouseId).remove();
}

function showPanel(houseId, panelUrl) {
    $.get(panelUrl)
        .done(function (html) {
            $("#section-genplan__house-" + houseId).addClass("active");

            const offset = relativeOffset(
                $("#section-genplan__point-" + houseId),
                $("#section-genplan")
            );

            const $panel = $(html);

            $panel.appendTo("#section-genplan").css({
                top: offset.top,
                left: offset.left,
            });

            setTimeout(() => {
                $panel.addClass("active");
            }, 100);
        })
        .fail(function () {
            `Failed loading ${panelUrl}`;
        });
}

$(function () {
    $(document).on(
        "mouseenter",
        ".section-genplan__point, .section-genplan__house",
        handlePointEnter
    );

    $(document).on("mouseenter", ".section-genplan__panel", handlePanelEnter);

    $(document).on(
        "mouseleave",
        ".section-genplan__point, .section-genplan__house, .section-genplan__panel",
        handlePointLeave
    );
});
