function filterPointsOnMap(filterBy) {
    const mapInstance = $("#section-location .map-location").data("image-map");

    mapInstance.filterPoints(filterBy);
}

function handleFilterClick(e) {
    e.preventDefault();

    $(this).closest("li").addClass("active").siblings().removeClass("active");

    const filterBy = $(this).data("filter");

    filterPointsOnMap(filterBy);
}

function handleSelectItem(e) {
    const filterBy = $(this).data("value");

    filterPointsOnMap(filterBy);
}

$(function () {
    if ($("#section-location").length === 0) return;

    $(document).on(
        "click",
        "#section-location .nav-category a",
        handleFilterClick
    );

    $(document).on(
        "click",
        "#section-location .select__option",
        handleSelectItem
    );
});
