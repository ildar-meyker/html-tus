import loadScript from "../helpers/loadScript";

function initMap(mapEl) {
    const imageSize = [4096, 2371];
    const maxZoom = 4;

    const sizeForZoom1 = imageSize.map((value) => {
        return value / maxZoom;
    });

    const bounds = [[0, 0], sizeForZoom1.reverse()];

    const map = L.map(mapEl, {
        zoomControl: false,
        scrollWheelZoom: false,
        zoom: 1,
        minZoom: 1,
        maxZoom,
        center: [357.29526544748063, 460],
        maxBoundsViscosity: 1, // do not allow drag outside bounds
        crs: L.CRS.Simple,
    });

    map.setMaxBounds(new L.LatLngBounds(bounds));

    map.on("click", showClickCoords);

    addCustomZoom(map);
    addImage(map, bounds);
    addMarkers(map);
    addLogo(map);
}

function showClickCoords(e) {
    const { lat, lng } = e.latlng;
    console.log([lat, lng]);
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

function addLogo(map) {
    const divIcon = L.divIcon({
        className: "map-location__logo",
        iconAnchor: [60, 60],
    });

    L.marker([356.79938336782527, 607], { icon: divIcon }).addTo(map);
}

function addMarkers(map) {
    const points = [
        {
            coords: [241.3476105503231, 534.375],
            type: "park",
            title: "ПКиО им. В.И. Ленина",
            description:
                "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина",
        },
        {
            coords: [371.7971026734806, 354.5],
            type: "school",
            title: "ПКиО им. В.И. Ленина",
            description:
                "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина",
        },
        {
            coords: [437.2972293787219, 530.5],
            type: "park",
            title: "ПКиО им. В.И. Ленина",
            description:
                "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина",
        },
        {
            coords: [500.29152764286016, 489.5],
            type: "pharmacy",
            title: "ПКиО им. В.И. Ленина",
            description:
                "Белгород, Белгородский городской парк культуры и отдыха им. В.И. Ленина",
        },
    ];

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

        L.marker(point.coords, { icon: divIcon, pane: point.type + "Markers" })
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
                                const mapEl = $(this)
                                    .find(".map-location__box")
                                    .get(0);
                                initMap(mapEl);
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
