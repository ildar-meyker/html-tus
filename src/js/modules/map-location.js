import loadScript from "../helpers/loadScript";

let scale;

function originalCoordsToScaled(coords) {
    return [coords[0] * scale, coords[1] * scale];
}

function scaledCoordsToOriginal(coords) {
    return [coords[0] / scale, coords[1] / scale];
}

function calculateInitialScale(rootEl, imageSize) {
    const boxSize = [rootEl.offsetWidth, rootEl.offsetHeight];
    return Math.max(boxSize[0] / imageSize[0], boxSize[1] / imageSize[1]);
}

function initMap(rootEl) {
    const mapEl = rootEl.querySelector(".map-location__box");

    const { center, imageSize, logoPosition, pointsUrl } = $(rootEl).data();

    scale = calculateInitialScale(rootEl, imageSize);

    const scaledImageSize = imageSize.map((value) => value * scale);

    const bounds = [[0, 0], scaledImageSize.reverse()];

    const map = L.map(mapEl, {
        zoomControl: false,
        scrollWheelZoom: false,
        zoom: 0,
        center: originalCoordsToScaled(center),
        maxBoundsViscosity: 1, // do not allow drag outside bounds
        crs: L.CRS.Simple,
    });

    map.setMaxBounds(new L.LatLngBounds(bounds));

    map.on("click", showClickCoords);

    addCustomZoom(map);
    addImage(map, bounds);
    addMarkers(map, pointsUrl);
    addLogo(map, logoPosition);

    $(document).on("click", ".nav-category a", function (e) {
        e.preventDefault();

        $(this)
            .closest("li")
            .addClass("active")
            .siblings()
            .removeClass("active");

        const filterBy = $(this).data("filter");

        const panes = map.getPanes();

        for (const [key, pane] of Object.entries(panes)) {
            if (!key.match(/Markers$/)) continue;

            pane.style.display =
                filterBy === "all" || key === filterBy + "Markers"
                    ? "block"
                    : "none";
        }

        map.closePopup();
    });
}

function showClickCoords(e) {
    const { lat, lng } = e.latlng;

    const coords = scaledCoordsToOriginal([lat, lng]);
    const message = `You clicked at [${coords}]. Use this coords to bind points.`;
    console.log(message);
}

function addCustomZoom(map) {
    L.control
        .zoom({
            zoomInTitle: "",
            zoomOutTitle: "",
        })
        .addTo(map);
}

function addImage(map, bounds) {
    L.imageOverlay("img/map-location/1.jpg", [[0, 0], bounds]).addTo(map);
}

function addLogo(map, logoPosition) {
    const divIcon = L.divIcon({
        className: "map-location__logo",
        iconAnchor: [60, 60],
    });

    L.marker(originalCoordsToScaled(logoPosition), {
        icon: divIcon,
    }).addTo(map);
}

function addMarkers(map, pointsUrl) {
    $.getJSON(pointsUrl)
        .done((points) => {
            const types = Object.keys(
                points.reduce((obj, point) => {
                    obj[point.type] = true;
                    return obj;
                }, {})
            );

            types.forEach((type) => {
                map.createPane(type + "Markers");
            });

            points.forEach((point) => {
                const divIcon = L.divIcon({
                    className: "map-location__icon",
                    html: `<svg class="icon">
                        <use
                            xlink:href="img/icons/categories/sprite.svg#${point.type}"
                        ></use>
                    </svg>`,
                    iconAnchor: [24, 48],
                    popupAnchor: [0, -48],
                });

                L.marker(originalCoordsToScaled(point.coords), {
                    icon: divIcon,
                    pane: point.type + "Markers",
                })
                    .bindPopup(
                        `<aside class="panel-location">
                    <div class="panel-location__header">
                        <h2 class="panel-location__h1">
                            ${point.title}
                        </h2>
                    </div>
                    <div class="panel-location__desc">
                        ${point.description}
                    </div>
                </aside>`
                    )
                    .addTo(map);
            });
        })
        .fail(function () {
            `Failing loading ${pointsUrl}`;
        });
}

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log(entry);

                loadScript(
                    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js",
                    function (error, script) {
                        if (error) {
                            console.error(error);
                        } else {
                            $(".map-location").each(function () {
                                initMap(this);
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
