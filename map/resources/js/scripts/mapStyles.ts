import L from "leaflet";

export const SateliteStyle: L.TileLayer = L.tileLayer(
    "mapStyles/styleSatelite/{z}/{x}/{y}.jpg",
    {
        minZoom: 0,
        maxZoom: 8,
        noWrap: true,
        attribution: "Online map GTA V",
        id: "SateliteStyle map",
    }
);

export const AtlasStyle: L.TileLayer = L.tileLayer(
    "mapStyles/styleAtlas/{z}/{x}/{y}.jpg",
    {
        minZoom: 0,
        maxZoom: 5,
        noWrap: true,
        attribution: "Online map GTA V",
        id: "styleAtlas map",
    }
);

export const GridStyle: L.TileLayer = L.tileLayer(
    "mapStyles/styleGrid/{z}/{x}/{y}.png",
    {
        minZoom: 0,
        maxZoom: 5,
        noWrap: true,
        attribution: "Online map GTA V",
        id: "styleGrid map",
    }
);
