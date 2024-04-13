function handleFilterClick(e) {
    e.preventDefault();

    $(this).closest("li").addClass("active").siblings().removeClass("active");

    const filterBy = $(this).data("filter");

    const imageMap = $("#section-location .map-location").data("image-map");

    imageMap.filterPoints(filterBy);
}

$(function () {
    if ($("#section-location").length === 0) return;

    $(document).on(
        "click",
        "#section-location .nav-category a",
        handleFilterClick
    );
});
