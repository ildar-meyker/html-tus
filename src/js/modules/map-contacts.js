import loadScript from "../helpers/loadScript";

const CLASS_ZOOM_IN = "map-contacts__btn-zoom-in";
const CLASS_ZOOM_OUT = "map-contacts__btn-zoom-out";

function init() {
    $(".map-contacts").each(function () {
        const $root = $(this);

        const { id, center, hint } = $root.data();
        const assetsUrl = $root.data("assets-url");

        const myMap = new ymaps.Map(id, {
            center,
            controls: [],
            zoom: 15,
        });

        const myPlacemark = new ymaps.Placemark(
            center,
            {
                hintContent: hint,
                balloonContent: hint,
                iconContent: "",
            },
            {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: "default#image",
                // Своё изображение иконки метки.
                iconImageHref: assetsUrl + "img/map-marker.svg",
                // Размеры метки.
                iconImageSize: [80, 92],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-40, -92],
            }
        );

        // Создадим пользовательский макет ползунка масштаба.
        const ZoomLayout = ymaps.templateLayoutFactory.createClass(
            `<div>
                <div class='${CLASS_ZOOM_IN}'>
                    <svg class="icon">
                        <use xlink:href="${assetsUrl}img/icons/general/sprite.svg#zoom-in"></use>
                    </svg>
                </div>
                <div class='${CLASS_ZOOM_OUT}'>
                    <svg class="icon">
                        <use xlink:href="${assetsUrl}img/icons/general/sprite.svg#zoom-out"></use>
                    </svg>
                </div>
            "</div>`,
            {
                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    // Начинаем слушать клики на кнопках макета.
                    $root
                        .find("." + CLASS_ZOOM_IN)
                        .on("click", this.zoomInCallback);
                    $root
                        .find("." + CLASS_ZOOM_OUT)
                        .on("click", this.zoomOutCallback);
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    $root
                        .find("." + CLASS_ZOOM_IN)
                        .off("click", this.zoomInCallback);
                    $root
                        .find("." + CLASS_ZOOM_OUT)
                        .off("click", this.zoomOutCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
                },

                zoomOut: function () {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
                },
            }
        );

        const zoomControl = new ymaps.control.ZoomControl({
            options: { layout: ZoomLayout },
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable("scrollZoom");
        myMap.controls.add(zoomControl);
    });
}

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (typeof ymaps === "undefined") {
                    loadScript(
                        "https://api-maps.yandex.ru/2.1/?apikey=4ee83d51-9c82-4832-ae32-283ef606144b&lang=ru_RU",
                        function (error, script) {
                            if (error) {
                                console.error(error);
                            } else {
                                ymaps.ready(init);
                            }
                        }
                    );
                } else {
                    ymaps.ready(init);
                }

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
    document.querySelectorAll(".map-contacts").forEach((element) => {
        observer.observe(element);
    });
});
