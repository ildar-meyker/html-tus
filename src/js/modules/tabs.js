const ACTIVE_CLASS = "active";

const setActiveTab = ($tabsRoot, index, target) => {
    const isHistory = $tabsRoot.data("history");

    $tabsRoot
        .find("li")
        .removeClass(ACTIVE_CLASS)
        .eq(index)
        .addClass(ACTIVE_CLASS);

    if (isHistory) {
        const url = new URL(location);
        url.searchParams.set("tab", target.replace("#", ""));
        history.pushState({}, "", url);
    }

    showTarget(target);
};

const showTarget = (target) => {
    // show all tabs
    if ($(target).hasClass("tabs-content")) {
        $(target).children().addClass(ACTIVE_CLASS);
        return;
    }
    $(target).siblings().removeClass(ACTIVE_CLASS).end().addClass(ACTIVE_CLASS);
};

function handleTabClick(e) {
    e.preventDefault();

    const index = $(this).parent().index();
    const $tabsRoot = $(this).closest(".js-tabs");
    const target = $(this).attr("href");
    setActiveTab($tabsRoot, index, target);
}

function switchToUrlTab() {
    const tab = new URL(location).searchParams.get("tab");

    if (tab) {
        $(`a[href="#${tab}"]`).trigger("click");
    }
}

$(function () {
    $(document).on("click", ".js-tabs a", handleTabClick);

    switchToUrlTab();
});
