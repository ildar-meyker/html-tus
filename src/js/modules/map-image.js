// var point = xy(640, 360);
// L.marker(point).addTo(map);

function initMap(mapEl) {
    const imageMaxSize = [4096, 2371];

    const bounds = [
        [0, 0],
        [Math.floor(imageMaxSize[1] / 4), Math.floor(imageMaxSize[0] / 4)],
    ];

    const map = L.map(mapEl, {
        minZoom: 1,
        maxZoom: 4,
        center: [0, 0],
        zoom: 1,
        maxBoundsViscosity: 1,
        crs: L.CRS.Simple,
        zoomControl: false,
    });

    L.control
        .zoom({
            zoomInTitle: "", // Задаем текст для кнопки увеличения масштаба
            zoomOutTitle: "", // Текст для кнопки уменьшения масштаба
        })
        .addTo(map);

    // Добавляем изображение на карту
    L.imageOverlay("img/map-image/1.jpeg", [[0, 0], bounds]).addTo(map);

    map.setMaxBounds(new L.LatLngBounds(bounds));

    var myIcon = L.divIcon({
        className: "map-image__icon",
        html: `<svg class="icon">
                <use
                    xlink:href="img/icons/categories/sprite.svg#1"
                ></use>
            </svg>`,
    });

    L.marker([50.505, 30.57], { icon: myIcon })
        .bindPopup(
            `<aside class="panel-location">
                <div class="panel-location__header">
                    <h2 class="panel-location__h1">
                        ПКиО им. В.И. Ленина
                    </h2>
                    <div class="panel-location__btn-close">
                        <button class="btn-close">
                            <svg class="icon">
                                <use
                                    xlink:href="img/icons/general/sprite.svg#plus"
                                ></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="panel-location__desc">
                    Белгород, Белгородский городской парк культуры
                    и отдыха им. В.И. Ленина
                </div>
            </aside>`
        )
        .addTo(map);
}

$(function () {
    $(".map-image").each(function () {
        const mapEl = $(this).find(".map-image__box").get(0);
        initMap(mapEl);
    });
});
