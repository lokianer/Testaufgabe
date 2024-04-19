import { CRS, extend, LatLng, Projection, Transformation } from "leaflet";

const center_x = 117.6;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

// https://leafletjs.com/examples/crs-simple/crs-simple.html

const customCrs = extend({}, CRS.Simple, {
    projection: Projection.LonLat,
    scale: function (zoom: number) {
        return Math.pow(2, zoom);
    },
    zoom: function (sc: number) {
        return Math.log(sc) / 0.6931471805599453;
    },
    distance: function (pos1: LatLng, pos2: LatLng) {
        const x_difference = pos2.lng - pos1.lng;
        const y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(
            x_difference * x_difference + y_difference * y_difference
        );
    },
    transformation: new Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true,
});

export default customCrs;
