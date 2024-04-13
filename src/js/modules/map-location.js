import loadScript from "../helpers/loadScript";
import ImageMap from "./ImageMap";

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadScript(
                    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js",
                    function (error, script) {
                        if (error) {
                            console.error(error);
                        } else {
                            $(".map-location").each(function () {
                                const instance = new ImageMap({
                                    el: this,
                                });

                                $(this).data("image-map", instance);
                            });
                        }
                    }
                );

                observer.disconnect();
            }
        });
    },
    {
        rootMargin: "0px 0px 1000px 0px",
        threshold: 0,
    }
);

$(function () {
    document.querySelectorAll(".map-location").forEach((element) => {
        observer.observe(element);
    });
});
