export default class ImageMap {
    constructor(options) {
        this._options = options;

        this._rootEl = options.el;
        this._mapEl = options.el.querySelector(".map-location__box");
        this._data = $(options.el).data();

        console.log(this._data);

        this._scale = this._calculateImageScale();
        this._bounds = this._calculateImageBounds();

        this._map = L.map(this._mapEl, {
            zoomControl: false,
            scrollWheelZoom: false,
            zoom: 0,
            center: this._originalCoordsToScaled(this._data.center),
            maxBoundsViscosity: 1, // do not allow drag outside bounds
            crs: L.CRS.Simple,
        });

        this._map.setMaxBounds(new L.LatLngBounds(this._bounds));

        this._addCustomZoom();
        this._addImage();
        this._addMarkers();
        this._addLogo();

        window.addEventListener("resize", this._handleWindowResize.bind(this));
        screen.orientation.addEventListener(
            "change",
            this._handleWindowResize.bind(this)
        );
        this._map.on("click", this._showClickCoords.bind(this));
    }

    _handleWindowResize() {
        this._scale = this._calculateImageScale();
        this._bounds = this._calculateImageBounds();
        this._map.fitBounds(L.latLngBounds(this._bounds));
    }

    _originalCoordsToScaled(coords) {
        return [coords[0] * this._scale, coords[1] * this._scale];
    }

    _scaledCoordsToOriginal(coords) {
        return [coords[0] / this._scale, coords[1] / this._scale];
    }

    _calculateImageBounds() {
        const scaledImageSize = this._data.imageSize.map(
            (value) => value * this._scale
        );

        return [[0, 0], scaledImageSize.reverse()];
    }

    _calculateImageScale() {
        const containerSize = [
            this._rootEl.offsetWidth,
            this._rootEl.offsetHeight,
        ];

        return Math.max(
            containerSize[0] / this._data.imageSize[0],
            containerSize[1] / this._data.imageSize[1]
        );
    }

    _showClickCoords(e) {
        const { lat, lng } = e.latlng;

        const coords = this._scaledCoordsToOriginal([lat, lng]);
        const message = `You clicked at [${coords}]. Use this coords to bind points.`;
        console.log(message);
    }

    _addLogo() {
        const divIcon = L.divIcon({
            className: "map-location__logo",
            iconAnchor: [60, 60],
        });

        L.marker(this._originalCoordsToScaled(this._data.logoPosition), {
            icon: divIcon,
        }).addTo(this._map);
    }

    _addCustomZoom() {
        L.control
            .zoom({
                zoomInTitle: "",
                zoomOutTitle: "",
            })
            .addTo(this._map);
    }

    _addImage() {
        L.imageOverlay(this._data.imageUrl, [[0, 0], this._bounds]).addTo(
            this._map
        );
    }

    _addMarkers() {
        $.getJSON(this._data.pointsUrl)
            .done((points) => {
                const types = Object.keys(
                    points.reduce((obj, point) => {
                        obj[point.type] = true;
                        return obj;
                    }, {})
                );

                types.forEach((type) => {
                    this._map.createPane(type + "Markers");
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

                    L.marker(this._originalCoordsToScaled(point.coords), {
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
                        .addTo(this._map);
                });
            })
            .fail(function () {
                `Failed loading ${this._data.pointsUrl}`;
            });
    }

    filterPoints(filterBy) {
        const panes = this._map.getPanes();

        for (const [key, pane] of Object.entries(panes)) {
            if (!key.match(/Markers$/)) continue;

            pane.style.display =
                filterBy === "all" || key === filterBy + "Markers"
                    ? "block"
                    : "none";
        }

        this._map.closePopup();
    }
}
