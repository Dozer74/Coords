const default_coords = [55.164742, 61.429509];
const default_zoom = 16;


class GoogleMap {
    constructor(rootId) {
        const latLngCoords = GoogleMap.coordsToLatLng(default_coords);

        this.map = new google.maps.Map(document.getElementById(rootId), {
            center: latLngCoords,
            zoom: default_zoom
        });
        this.marker = new google.maps.Marker({map: this.map, position: latLngCoords});
    }

    static coordsToLatLng(coords) {
        return new google.maps.LatLng(...coords);
    };

    moveTo(coords) {
        const latLngCoords = GoogleMap.coordsToLatLng(coords);
        this.marker.setPosition(latLngCoords);
        this.map.panTo(latLngCoords);
    }
}

class YandexMap {
    constructor(rootId) {
        this.map = new ymaps.Map(rootId, {
            center: Object.values(default_coords),
            zoom: default_zoom,
            controls: ['typeSelector', 'fullscreenControl']
        });

        this.map.geoObjects.add(YandexMap.createMarker(default_coords));
    }

    static createMarker(coords) {
        return new ymaps.Placemark(coords, {}, {
            preset: 'islands#dotIcon',
            iconColor: 'red'
        })
    }

    moveTo(coords) {
        this.map.setCenter(coords);
        this.map.geoObjects.removeAll();
        this.map.geoObjects.add(YandexMap.createMarker(coords))
    }
}

class GisMap {
    constructor(rootId) {
        DG.then(() => {
            this.map = DG.map(rootId, {
                'center': default_coords,
                'zoom': default_zoom
            });
            this.marker = DG.marker(Object.values(default_coords)).addTo(this.map);
        });
    }

    moveTo(coords) {
        this.map.panTo(coords);
        this.marker.setLatLng(coords);
    }
}

